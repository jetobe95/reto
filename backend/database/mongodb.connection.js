const mongose = require('mongoose')
const MONGO_URL = process.env.MONGO_URL
const url = `mongodb://mongo/login-bloqueo`
module.exports = mongose.connect(url, { useNewUrlParser: true })