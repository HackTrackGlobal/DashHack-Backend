var models = require('../models')
var utils = require('../utils')
var config = require('../config')
var rs = require('randomstring')
var jwt = require('jsonwebtoken')
var User = models.User

module.exports = {
  login: function (req, res, next) {
    User.findOne({ 'info.tagCode': req.body.tagCode }, function (err, u) {
      if (err) return next(err)
      if (!u) {
        var e = new Error('User was not found.')
        e.code = 404
        return next(e)
      }
      var token = jwt.sign({ isAdmin: u.isAdmin, id: u._id, tagCode: u.tagCode }, config.secret)
      var x = u.toObject()
      var modUser = utils.without(x, ['info', 'log', '__v'])
      modUser.info = { proffesion: u.info.proffesion, tagCode: u.info.tagCode }
      console.log(modUser)
      return res.status(200).send({
        success: true,
        message: 'Login completed successfully',
        token: token,
        user: modUser
      })
    })
  },
  signup: function (req, res, next) {
    if (req.tokenDecoded.isAdmin) {
      var user = req.body.user
      var o = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin || false,
        info: {
          tagNumber: user.tagNumber,
          tagCode: rs.generate({ length: 6, capitalization: 'uppercase' }),
          proffesion: user.proffesion
        },
        group: {
          status: user.isAdmin ? 'admin' : 'waiting'
        },
        log: []
      }
      User.create(o, function (err, u) {
        if (err) return next(err)
        var modUser = utils.without(u.toObject(), ['info', 'log', 'group'])
        modUser.info = { proffesion: u.info.proffesion, tagCode: u.info.tagCode }
        return res.status(200).send({
          success: true,
          message: `${u.firstName} ${u.lastName} was registered to the system!`,
          user: modUser
        })
      })
    } else {
      return res.status(401).send({
        success: false,
        message: 'You need to be an admin to execute this request.'
      })
    }
  }
}