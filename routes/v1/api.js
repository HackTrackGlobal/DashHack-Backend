// Call to the packages
var express = require('express')
var jwt = require('jsonwebtoken')

// Config file
var config = require('../../config')

// Routers
var authRouter = require('./routes/auth')

// Create the express authRouter instance
var api = express()

/*
 * Auth-Required Resources
 */
api.use('/auth', authRouter)

/*
 * Setting the JWT middleware
 */
api.use(function(req, res, next) {

  // Get the token from header
  var token = req.headers['x-access-token']

  // Check if there is a token
  if (token) {

    // Verify the token
    jwt.verify(token, config.secret, function(err, decoded) {

      // Check for errors
      if (err) {
        return res.status(401).send({
          success: false,
          message: 'Failed to authenticate token'
        })
      }
      else {

        // If everything is good, save to request for use in other routes
        req.tokenDecoded = decoded
        next()
      }
    })
  }
  else {

    // If there is no token
    return res.status(401).send({
      success: false,
      message: 'No token provided'
    })

  }
})


/*
 * Non Auth-Required Resources goes here
 */
// Example (Remove this comment): api.use('/users', usersRouter)


module.exports = api