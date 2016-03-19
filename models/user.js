var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  isAdmin: { type: Boolean, default: false },
  info: {
    tagNumber: { type: Number, unique: true },
    tagCode: { type: String, unique: true },
    proffesion: String
  },
  group: {
    status: { type: String, default: 'waiting' }
  },
  log: [{
    message: String,
    date: Date
  }]
})

module.exports = mongoose.model('User', userSchema)