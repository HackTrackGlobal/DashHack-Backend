// Getting the required packages
var fs = require('fs')
var path = require('path')
var config = require('./config')
var jwt = require('jsonwebtoken')

module.exports = {
  getVersions: function () { // Returns all available API versions
    return fs.readdirSync('./routes').filter(function(file) {
      return fs.statSync(path.join('./routes', file)).isDirectory()
    })
  },
  authMiddleware: function (req, res, next) {
    var token = req.headers['x-access-token'] || req.query.token || req.body.token
    console.log(token)
    if (token) {
      jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
          return res.status(401).send({
            success: false,
            message: 'Failed to authenticate token.'
          })
        }
        req.tokenDecoded = decoded
        next()
      })
    } else {
      return res.status(400).send({
        success: false,
        message: 'A token is required to perform this request.'
      })
    }
  },
}