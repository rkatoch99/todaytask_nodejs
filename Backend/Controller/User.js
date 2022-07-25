require('../MongoDb/mongo')
require('../MongoDb/models/userData')


const express=require('express')
const app =express()
const bcrypt = require('bcrypt')
const User = require('../MongoDb/models/userData')

exports.AuthUser=async (req,res)=>{
    try{
        const register =new User({
            "firstname":req.body.firstname,
            "email":req.body.email,
            "lastname":req.body.lastname,
            "password":await bcrypt.hash(req.body.password,10)

        })
        
        
        

        

        const save = await register.save()
        if(save){
            res.status(200).json({"message":"data save successfully"})
        }



    }catch(err){
        console.log(err)
    }
}
