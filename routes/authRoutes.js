const express = require('express')
const {handleregister,handlelogin} = require('../controllers/authController')
const router = express.Router()

router.post('/register',handleregister)
router.post('/login',handlelogin)


module.exports = router