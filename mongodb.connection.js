const mongose = require('mongoose')
const url = 'mongodb://mongo:27017/login-bloqueo'
module.exports = mongose.connect(url, { useNewUrlParser: true })