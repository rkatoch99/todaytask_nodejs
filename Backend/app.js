require('./MongoDb/db')
require('./MongoDb/models/Register')
require("dotenv")
  .config();

const express =require('express')
const app =express()
const {json} = require('express')


const cors = require('cors')



const Router =require('./routes/route')

const PORT = process.env.PORT || 8000



app.use(cors())
app.use(json())

app.use(express.urlencoded({
    extended: true
  }));

app.use(Router,verifyToken = require('./Midleware/AuthJWT'))




app.listen(PORT,()=>{
    console.log(`connection successfully on the ${PORT}`)
})