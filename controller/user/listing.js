const Member = require("../../model/members");

//Method: Get
//Endpoint:/v1/listing/fullList
const getMembers = async (req, res) => {
  try {
    const data = await Member.find({});

    return res.send({
      success: 1,
      message: "Fetched successfully",
      data,
    });
  } catch (error) {
    return res.send({
      success: 0,
      message: error.message,
    });
  }
};

//Method:Post
//Endpoint:/v1/listing/comment
const addComment = async (req, res) => {
  try {
    const { memberId, text, user } = req.body;

    const member = await Member.findById(memberId);
    if (!member)
      return res.status(404).json({ success: 0, message: "Member not found" });

    member.comments.push({ text, user });
    await member.save();

    return res.send({
      success: 1,
      message: "Commented successfully",
      data: member.comments,
    });
  } catch (error) {
    return res.send({
      success: 0,
      message: error.message,
    });
  }
};

//Method:Post
//Endpoint:/v1/listing/like
const likeMember = async (req, res) => {
  try {
    const { memberId, userId } = req.body;

    const member = await Member.findById(memberId);

    if (!member) {
      return res.send({
        success: 0,
        message: "No member found",
      });
    }

    member.dislikes = member.dislikes.filter((id) => id !== userId);
    if (!member.likes.includes(userId)) member.likes.push(userId);

    await member.save();

    return res.send({
      success: 1,
      message: "Liked",
      totalLikes: member.likes.length,
    });
  } catch (error) {
    return res.send({
      success: 0,
      message: error.message,
    });
  }
};

//Method:Post
//Endpoint:/v1/listing/dislike
const dislikeMember = async (req, res) => {
  try {
    const { memberId, userId } = req.body;

    const member = await Member.findById(memberId);

    if (!member) {
      return res.send({
        success: 0,
        message: error.message,
      });
    }

    member.likes = member.likes.filter((id) => id !== userId);
    if (!member.dislikes.includes(userId)) member.dislikes.push(userId);

    await member.save();

    return res.send({
      success: 1,
      message: "Disliked",
      totalDislikes: member.dislikes.length,
    });
  } catch (error) {
    return res.send({
      success: 0,
      message: error.message,
    });
  }
};

module.exports = { getMembers, addComment, likeMember, dislikeMember };
