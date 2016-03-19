var mongoose = require('mongoose')
var Schema = mongoose.Schema

var mentorSchema = new Schema({
  firstName: String,
  lastName: String,
  proffesion: String,
  desc: String,
  imgSrc: String,
  isTaken: { type: Boolean, default: false }
})

module.exports = mongoose.model('Mentor', mentorSchema)