const express = require('express')
const {requireAuth}  = require('../../middlewares/requireAuth.middleware')
const {login, signup, logout} = require('./auth.controller')
 
const router = express.Router()

router.post('/login',requireAuth, login)
router.post('/signup',requireAuth, signup)
router.post('/logout', requireAuth, logout)

module.exports = router