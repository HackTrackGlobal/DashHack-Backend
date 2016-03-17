// Call to mongoose
var mongoose = require('mongoose')

// Mongoose Schema
var Schema = mongoose.Schema

// User schema
var UserSchema = new Schema({


})

// Before saving
UserSchema.pre('save', function(next) {
  var user = this
  next()
})


module.exports = mongoose.model('User', UserSchema)
