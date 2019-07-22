const express = require('express')
const router = express.Router()
const { Login, Register } = require('../controllers/auth.controller')

router.post('/register',Register)
      .post('/login',Login)
module.exports = router