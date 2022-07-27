const express = require('express')

const routes = express.Router()

const AuthController=require('../Controller/AuthRegistration')

const Data = require('../Controller/Fetchdata')


routes.post('/Registration',AuthController.AuthRegistration)


routes.post('/Login',AuthController.AuthLogin)



routes.get('/Dashboard',Data.FetchData)



module.exports=routes
