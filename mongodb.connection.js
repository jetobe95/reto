const mongose = require('mongoose')
const url = 'mongodb://localhost/login-bloqueo'
module.exports = mongose.connect(url, { useNewUrlParser: true })