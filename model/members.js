const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const MemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    position: {
      type: String,
      default: "",
    },
    area: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    photos: {
      type: String,
      default: "",
    },

    cloudinary_public_id: {
      type: String,
      default: "",
    },
    comments: [commentSchema],
    likes: [{ type: String }],
    dislikes: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", MemberSchema);
