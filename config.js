var path = require('path')

var config = {
  port: process.env.PORT || 5000, // Server port
  database: 'mongodb://root:root@ds015889.mlab.com:15889/trackboard', // Database connection
  dirs: {
    routes: path.join(__dirname, 'routes')
  },
  chatMax: 150,
  secret: 'Y4rd3n1sg4y' // JWT Secret, Shhhhhh...
}
module.exports = config
