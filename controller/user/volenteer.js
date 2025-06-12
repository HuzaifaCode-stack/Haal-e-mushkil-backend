const Volenteer = require('../../model/volenteer')

const addUser = async(req,res)=>{
    try {
      const {name , problem , reason , phoneNumber , email , city } = req.body

      await Volenteer.create({
        name,
        problem,
        reason,
        phoneNumber,
        email,
        city
      })

      return res.send({
        success:1,
        message:'Created successfully'
      })
    } catch (error) {
        return res.send({
            success:0,
            message:error.message
        })
    }
}

module.exports = {addUser}