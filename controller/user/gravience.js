const Gravience = require("../../model/gravience");
const cloudinary = require("cloudinary").v2;


//Method:Post
//Endpoint:/v1/gravience/createGravience
const addGravience = async (req, res) => {
  try {
    const { name, problem, lat, lon, anonymous } = req.body;
    const images = req.files;

    const photos = [];
    const cloudinaryIds = [];

    if (images && images.length > 0) {
      for (const file of images) {
        const uploadResult = await cloudinary.uploader.upload(file.path, {
          folder: "gravience_photos",
        });

        photos.push(uploadResult.secure_url);
        cloudinaryIds.push(uploadResult.public_id);
      }
    }

    const grievance = await Gravience.create({
      name,
      problem,
      anonymous: anonymous === "true",
      location: {
        type: "Point",
        coordinates: [parseFloat(lon), parseFloat(lat)],
      },
      photos,
      cloudinary_public_id: cloudinaryIds,
    });

    return res.status(201).send({
      success: 1,
      message: "Grievance submitted successfully",
      data: grievance,
    });
  } catch (error) {
    return res.status(500).send({
      success: 0,
      message: error.message,
    });
  }
};
module.exports = { addGravience };
