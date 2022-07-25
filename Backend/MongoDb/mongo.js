var mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/user').then(()=>{
    console.log("Connection successfully")
}).catch((err)=>{
    console.log(err)
})

module.exports=mongoose

