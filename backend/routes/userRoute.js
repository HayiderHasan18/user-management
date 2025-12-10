const express = require('express')
const router = express.Router()

//authentication middlewere
const authMiddleware = require('../Middleware/authMiddleware')
//  user controller
const {register,login,checkUser} = require('../Controllers/userController')

// register route
router.post('/register',register
)

// login routes
router.post('/login',login)
// check user 
router.get('/check', authMiddleware , checkUser)
 module.exports = router
