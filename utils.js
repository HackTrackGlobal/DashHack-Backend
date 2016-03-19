// Getting the required packages
var fs = require('fs')
var path = require('path')

module.exports = {
  getVersions: function () { // Returns all available API versions
    return fs.readdirSync('./routes').filter(function(file) {
      return fs.statSync(path.join('./routes', file)).isDirectory()
    })
  }
}