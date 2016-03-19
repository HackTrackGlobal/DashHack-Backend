var path = require('path')
var jwt = require('jsonwebtoken')

var config = {
  port: process.env.PORT || 5000, // Server port
  database: 'mongodb://root:root@ds015889.mlab.com:15889/trackboard', // Database connection
  dirs: {
    routes: path.join(__dirname, 'routes')
  },
  authMiddleware: function (req, res, next) {
    console.log('abcdefg')
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
  secret: 'Y4rd3n1sg4y' // JWT Secret, Shhhhhh...
}
module.exports = config
