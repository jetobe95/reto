const mongose = require('mongoose')
const MONGO_URL = process.env.MONGO_URL
const url = `${MONGO_URL}/login-bloqueo`
module.exports = mongose.connect(url, { useNewUrlParser: true })