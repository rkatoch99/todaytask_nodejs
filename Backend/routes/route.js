const express = require('express')

const routes = express.Router()

const AuthController=require('../Controller/AuthRegistration')
const verifyToken = require('../Midleware/AuthJWT')

const Data = require('../Controller/Fetchdata')


routes.post('/Registration',AuthController.AuthRegistration)


routes.post('/Login',AuthController.AuthLogin)



routes.get('/Dashboard',verifyToken,Data.FetchData)

routes.put('/user/delete',verifyToken,Data.DeleteData)



routes.get('/user/list/:page',Data.PageNo)



module.exports=routes
