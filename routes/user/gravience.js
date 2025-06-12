const { Router } = require("express");
const { addGravience } = require("../../controller/user/gravience");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../../utils/cloudinary");

const route = Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "gravience_image",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage: storage }).array("photos");

route.post("/createGravience", upload, addGravience);

module.exports = route;
