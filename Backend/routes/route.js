const express = require('express')

const routes = express.Router()

const AuthController=require('../Controller/AuthRegistration')
const verifyToken = require('../Midleware/AuthJWT')

const Data = require('../Controller/Fetchdata')


////////-----------------Get Routes---------------------------------------/////////////////



routes.get('/Dashboard',verifyToken,Data.FetchData)
routes.get('/user/list/:page',Data.PageNo)


////-------------------------Get Routes end here----------------------------------------///



///-----------------------------Post Routes start here---------------------------/////



routes.post('/Registration',AuthController.AuthRegistration)
routes.post('/Login',AuthController.AuthLogin)

routes.post('/user/address',AuthController.AuthUserDetails)

routes.post('/user/Addaddress',AuthController.Addressupdate)

// routes.post('/user/tempname',AuthController.tempUser)
// routes.post('/user/tempnickname',AuthController.nickNames)
// routes.get('/user/temp',AuthController.details);



//////////////-----------------------Post Routes end here---------------------//////////////


/////////---------------------------Put Routes start here-------------------------------//////




routes.put('/user/delete',verifyToken,Data.DeleteData)





///////////////------------------------Put Routes end here---------------------------//////////







module.exports=routes
