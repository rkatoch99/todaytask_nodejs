const express = require('express')

const routes = express.Router()

const AuthController=require('../Controller/AuthRegistration')


routes.post('/Registration',AuthController.AuthRegistration)



module.exports=routes
