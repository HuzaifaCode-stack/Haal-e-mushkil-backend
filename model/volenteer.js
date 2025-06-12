const mongoose = require("mongoose");

const VolenteerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    reason: {
      type: String,
      deafult: "",
    },
    phoneNumber: {
      type: Number,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    city:{
        type:String,
        default:""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Volenteer", VolenteerSchema);
