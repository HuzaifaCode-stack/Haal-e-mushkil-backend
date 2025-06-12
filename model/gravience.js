const mongoose = require("mongoose");

const gravienceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    problem: {
      type: String,
      default: "",
    },
    anonymous: {
      type: Boolean,
      default: false,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    photos: {
      type: [String],
      default: [],
    },
    cloudinary_public_id: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

gravienceSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Gravience", gravienceSchema);
