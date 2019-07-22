const authRoute = require('./auth.router')
const express = require('express')
const router = express.Router()
router.use(authRoute)

module.exports = router