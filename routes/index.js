var ctrls = require('../controllers')
var config = require('../config')
var ks = Object.keys(ctrls)

function setupControllers (app) {
  ks.forEach(function (p) {
    var data = ctrls[p]
    var fn = require('./' + data.file)[data.controller]
    console.log(p, '->', data.controller, 'auth:', data.auth)
    if (data.auth) {
      app.all(p, config.authMiddleware, function (req, res, next) {
        if (req.method.toLowerCase() === data.method.toLowerCase()) {
          next()
        } else {
          return res.status(400).send({
            success: false,
            message: 'Wrong request method. Please use the appropriate method and try again.'
          })
        }
      }, fn)
    } else {
      app.all(p, function (req, res, next) {
        if (req.method.toLowerCase() === data.method.toLowerCase()) {
          next()
        } else {
          return res.status(400).send({
            success: false,
            message: 'Wrong request method. Please use the appropriate method and try again.'
          })
        }
      }, fn)
    }
  })
}

module.exports = {
  setupCtrls: setupControllers
}
