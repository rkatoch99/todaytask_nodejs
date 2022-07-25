const express =require('express')
const app = express()


require('./MongoDb/mongo')
const cors=require('cors')
const mongoose=require('mongoose')


const {json}= require('express')


//console.log(mongo)
require('./MongoDb/models/userData')

const PORT =  process.env.PORT||8000;

app.use(cors())
app.use(json())
app.use(require('./routes/route'))






console.log('test')
// mongoose.connect('mongodb://localhost:27017/user').then(()=>{
//     console.log("Connection successfully")
    
// }).catch((err)=>{
//     console.log(err)
// })


app.listen(PORT,()=>{
    console.log(`Server is running on the ${PORT}`)
})

