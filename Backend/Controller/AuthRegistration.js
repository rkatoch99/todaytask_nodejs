const Registration = require('../MongoDb/models/Register')

require('../MongoDb/models/Register')

const bcrypt=require('bcrypt')


exports.AuthRegistration= async (req,res )=>{

        
    try{   
        const {email} = req.body
        const userEmail = await Registration.findOne({email:email})
        if(userEmail){
          res.status(400).json({message:"Email is already present.."})

        }
        const password = req.body.password
        const Confirmpassword=req.body.Confirmpassword
      
            
            if(password===Confirmpassword){
              const passwordHash=  await bcrypt.hash(password,10)
              const Register = new Registration({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                username:req.body.username,
                password:passwordHash

            })
              
              const save =  await Register.save()
              if(save){
                res.status(201).json({message:"data save successfully..."})
              }

            }else{
              console.log("password incorrect..")
            }
            
              
              
             
            
        }catch(errr){
        console.log(errr)
    }
}