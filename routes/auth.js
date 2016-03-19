var models = require('./models')
var User = models.User

module.exports = {
  login: function (req, res, next) {
    return res.send({
      yes: 'no'
    })
  },
  signup: function (req, res, next) {
    return res.send({
      no: 'yes'
    })
  }
}