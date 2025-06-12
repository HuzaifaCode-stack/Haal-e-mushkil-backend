const Gravience = require("../../model/gravience");

//Methods:Get
//Emndpoint: /v1/admin/listing/list
const listGravience = async (req, res) => {
  try {
    const data = await Gravience.find({});

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

module.exports = { listGravience };
