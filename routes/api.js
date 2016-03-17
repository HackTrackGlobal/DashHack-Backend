// Call to express
var express = require('express')

// Create the express apiRouter instance
var apiRouter = express.Router()

/*
 * API Version 1
 */
var v1 = require('./v1/api')
apiRouter.use('/v1', v1)

module.exports = apiRouter