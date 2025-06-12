const { Router } = require("express");
const { listGravience } = require("../../controller/admin/listing");

const route = Router();

route.get("/list", listGravience);

module.exports = route;
