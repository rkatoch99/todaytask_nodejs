var mongoose=require("mongoose")

const UserData=new mongoose.Schema({

    "firstname":{
        type:String,
        required:true
    },
    "email":{
        type:String,
        required:true
    },
    "lastname":{
        type:String,
        required:true
    },
    "password":{
        type:String,
        required:true
    }
})



const User= new mongoose.model("User",UserData)

module.exports=User