var ctrls = require('../controllers')
var utils = require('../utils')
var ks = Object.keys(ctrls)

function setupControllers (app) {
  ks.forEach(function (p) {
    var data = ctrls[p]
    var fn = require('./' + data.file)[data.controller]
    console.log(p, '->', data.controller + '; auth:', data.auth)
    if (data.auth) {
      app.all(p, utils.authMiddleware, function (req, res, next) {
        if (req.method.toLowerCase() === data.method.toLowerCase()) {
          if (data.required.params) {
            var ks = Object.keys(req.data)
            data.required.params.filter(function (p) {
              if (ks.indexOf(p) === -1) {
                var e = new Error(`Parameter ${p} is required to complete this request.`)
                e.code = 400
                return next(e)
              }
            })
            next()
          } else {
            next()
          }
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
          if (data.required.params) {
            var ks = Object.keys(req.data)
            data.required.params.filter(function (p) {
              if (ks.indexOf(p) === -1) {
                var e = new Error(`Parameter ${p} is required to complete this request.`)
                e.code = 400
                return next(e)
              }
            })
            next()
          } else {
            next()
          }
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
