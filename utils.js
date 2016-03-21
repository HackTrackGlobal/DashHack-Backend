// Getting the required packages
var fs = require('fs')
var path = require('path')
var config = require('./config')
var jwt = require('jsonwebtoken')

var onlyWith = function (y, arr) {
  // var ks = Object.keys(this)
  var a = y
  var o = {}
  arr.forEach(function (v, i) {
    o[v] = a[v]
  })
  return o
}

var hasKey = function (o, str) {
  var ks = Object.keys(o)
  var c = ks.filter(function (c) {
    return c === str
  })
  if (c.length > 0) return true
  return false
}

var hasVal = function (o, str) {
  var ks = Object.keys(o)
  var a = o
  var c = ks.filter(function (f) {
    return a[f] === str
  })
  if (c.length > 0) return true
  return false
}

var without = function (y, arr) {
  var a = y
  var ks = Object.keys(a)
  var o = {}
  arr.forEach(function (v, i) {
    delete y[v]
  })
  return y
}

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
  onlyWith: onlyWith,
  without: without,
}