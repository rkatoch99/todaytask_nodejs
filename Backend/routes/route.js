require('../MongoDb/models/userData')
require('../MongoDb/mongo')
const express =require('express')
const { AuthUser } = require('../Controller/User')
const route = express.Router()




route.get('/',(req,res)=>{
    res.send("hello world")
})
route.post('/form',AuthUser)


module.exports=route

