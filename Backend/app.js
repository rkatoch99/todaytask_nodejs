require('./MongoDb/db')
require('./MongoDb/models/Register')

const express =require('express')
const app =express()
const {json} = require('express')


const cors = require('cors')



const Router =require('./routes/route')

const PORT = process.env.PORT || 8000



app.use(cors())
app.use(json())
app.use(Router)




app.listen(PORT,()=>{
    console.log(`connection successfully on the ${PORT}`)
})