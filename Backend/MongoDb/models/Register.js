const mongoose = require("mongoose")


const UserRegister= new mongoose.Schema({
    "firstname":{
        type:String,
        required:true
    },
    "lastname":{
        type:String,
        required:true
    },
    "email":{
        type:String,
        required:true
    },
    "username":{
        type:String,
        required:true
    },
    "password":{
        type:String,
        required:true
    }
})


const Registration= new mongoose.model("users",UserRegister)

module.exports=Registration