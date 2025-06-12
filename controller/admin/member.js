const Member = require("../../model/members");
const cloudinary = require("cloudinary").v2;

//Method: Post
//Endpoint: /v1/member/create
const addMember = async (req, res) => {
  try {
    const { name, position, description, area } = req.body;
    const profileImage = req.file;

    let cloudinaryResult = null;
    if (profileImage) {
      cloudinaryResult = await cloudinary.uploader.upload(profileImage.path, {
        folder: "profile_image",
      });
    }

    await Member.create({
      name,
      position,
      description,
      area,
      photos: cloudinaryResult ? cloudinaryResult.secure_url : null,
      cloudinary_public_id: cloudinaryResult
        ? cloudinaryResult.public_id
        : null,
    });

    return res.send({
      success: 1,
      message: "Created successfully",
    });
  } catch (error) {
    return res.send({
      success: 0,
      message: error.message,
    });
  }
};

const deleteMembers = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: 0, message: "Member ID is required" });
    }

    // Step 1: Find the member
    const member = await Member.findById(id);
    if (!member) {
      return res.status(404).json({ success: 0, message: "Member not found" });
    }

    // Step 2: Delete from Cloudinary
    if (member.cloudinary_public_id) {
      await cloudinary.uploader.destroy(member.cloudinary_public_id);
    }

    // Step 3: Delete from MongoDB
    await Member.deleteOne({ _id: id });

    return res.status(200).json({
      success: 1,
      message: "Deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: 0,
      message: error.message,
    });
  }
};

module.exports = { addMember, deleteMembers };
