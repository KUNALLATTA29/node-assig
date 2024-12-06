const express = require('express')
const {handleusers, handlesingleuser} = require('../controllers/userController')
const auth = require('../middlewares/auth')

const router = express.Router()

router.get('/allusers',handleusers)
router.get('/:id',handlesingleuser)




module.exports = router