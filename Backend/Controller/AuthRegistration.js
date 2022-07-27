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




exports.AuthLogin= async(req,res, next)=>{
  const {username , password} = req.body  
  if(!username|| !password){
    return next("password and username both are required...")
  }
      
  try{

    
    const user = await Registration.findOne({username:req.body.username})
 
    if(!user)
      return res.status(400).json({error:"Username is not match...."})
      

    
      const comparePassword = await bcrypt.compare(req.body.password,user.password);
      console.log(comparePassword)
      if(!comparePassword){

        return res.status(400).json({error:"password did't match..."})
        
      }
    
      return res.status(200).json({message:"Login sucessfully"});


  }catch(err){
    console.log(err)
    alert(err.message)
    return next("error : ", err)
  }


}