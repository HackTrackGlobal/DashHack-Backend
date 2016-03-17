// Call to the packages
var express = require('express')
var passport = require('passport')
var jwt = require('jsonwebtoken')

// User model
var User = require('../../../models/user')

// Config file
var config = require('../../../config')

// Create the authRouter instance
var authRouter = express.Router()

/*
 * Authenticate resource
 */
authRouter.route('/')

  // The authentication
  .post(function(req, res, next) {

    // DO THE WHOLE AUTHENTICATION LOGIC HERE.
  })

module.exports = authRouter