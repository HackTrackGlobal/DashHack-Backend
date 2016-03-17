// Call the Packages
var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var sio = require('socket.io')()
var http = require('http')

// Utils
var utils = require('./utils')

// Config file
var config = require('./config')

// Express instance
var app = express()

// Use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Connect to database
mongoose.connect(config.database)

/*
 * Attaching the socket.io instance
 * to the request object
 */
app.use(function(req, res, next) {
  req.io = sio
  next()
})

/*
 * API Routes
 */
var apiRouter = require('./routes/api')

/*
 * Using the apiRouter
 */
app.use('/api', apiRouter)

/*
 * API Status
 */
app.get('/', function(req, res) {
  res.json({
    status: 'working',
    versions: utils.getVersions()
  })
})

/*
 * Starting the Server
 * Weird way, hah? We do that for
 * socket.io
 */

// Create the server
var server = http.createServer(app)

// Start Server
server.listen(config.port, function() {
  console.log("Magic happens at port " + config.port)
})

// Start socket.io server
sio.listen(server)