const { Router } = require("express");
const { userRegister, login } = require("../../controller/admin/register");

const route = Router();

route.post("/register", userRegister);
route.post("/login", login);
module.exports = route;
