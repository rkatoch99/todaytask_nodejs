const Registration = require('../MongoDb/models/Register')
require('../MongoDb/models/Register')


exports.FetchData= async (req,res)=>{

    try{

        const User = await Registration.find()
        console.log(User)

        const response =[]
        User.forEach(user =>{
            response.push(
                {
                    id:user._id,
                    firstname:user.firstname,
                    lastname:user.lastname,
                    email:user.email,
                    username:user.username

                }
            )

        })

        console.log(response)

        res.status(200).json(
            response 
            )

    }catch(err){
        console.log(err)
    }

}
