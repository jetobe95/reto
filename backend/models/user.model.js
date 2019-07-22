const mongose = require('mongoose')
const moment = require('moment');
const { Schema, model } = mongose
const userSchema = new Schema({
    email: String,
    password: String,
    lockUntil: { type: Date, default: moment().subtract(1, 'day').toISOString() },
    attempts: { type: Number, default: 0 },
    attemptDate: Date,
})
const userModel = model('user', userSchema, 'users')

module.exports = userModel