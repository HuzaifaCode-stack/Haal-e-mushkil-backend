const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { Router } = require("express");
const { addMember, deleteMembers } = require("../../controller/admin/member");
const cloudinary = require("../../utils/cloudinary"); 

const route = Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile_image",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage: storage }).single("photos");
route.post("/create", upload, addMember);
route.delete("/remove/:id", deleteMembers);

module.exports = route;
