const {Router} = require('express')
const { addUser } = require('../../controller/user/volenteer')

const route = Router()

route.post('/create', addUser)

module.exports =  route