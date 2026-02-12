const express = require('express')
const router = express.Router()

const authMiddleware = require('../Middleware/authMiddleware')

const {register,login,checkUser} = require('../Controllers/userController')

router.post('/register',register
)

router.post('/login',login)
router.get('/check', authMiddleware , checkUser)
 module.exports = router
