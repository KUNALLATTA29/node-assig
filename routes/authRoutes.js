const express = require('express')
const {handleregister,handlelogin,handleforgetpassword, handlereset} = require('../controllers/authController')
const router = express.Router()

router.post('/register',handleregister)
router.post('/login',handlelogin)
router.post('/forgot',handleforgetpassword)
router.post('/reset',handlereset)


module.exports = router