var express = require('express')
var s = require('./routes')
var app = express()
var http = require('http')
var server = http.createServer(app)
var config = require('./config')
var logger = require('morgan')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var io = require('socket.io')(server)

app.use(logger('dev'))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  req.io = io
  req.data = req.body || req.query || req.params || req.headers
  next()
})

s.setupCtrls(app)

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.send({
      success: false,
      message: err.message,
      error: err
    })
  })
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.send({
    success: false,
    message: err.message
  })
})

mongoose.connect(config.database)

mongoose.connection.on('connected', function () {
  console.log('Connected to the database! Yay!')
  server.listen(config.port, function () {
    console.log(`Listening on port ${config.port}, yo`)
  })
})
