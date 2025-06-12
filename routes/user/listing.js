const { Router } = require("express");
const {
  getMembers,
  addComment,
  likeMember,
  dislikeMember,
} = require("../../controller/user/listing");

const route = Router();

route.get("/fullList", getMembers);
route.post("/comment", addComment);
route.post("/like", likeMember);
route.post("/dislike" , dislikeMember)

module.exports = route;
