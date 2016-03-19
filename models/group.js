var mongoose = require('mongoose')
var Schema = mongoose.Schema

var groupSchema = new Schema({
  name: { type: String, unique: true },
  desc: String,
  isLocked: { type: Boolean, default: false },
  users: [{
    userId: String,
    level: { type: String, default: 'participant' }
  }],
  requests: [{
    userId: String
  }]
})

module.exports = mongoose.model('Group', groupSchema)