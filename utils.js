// Getting the required packages
var fs = require('fs')
var path = require('path')

module.exports = {

  /**
   * Function to return all the api versions
   */
  getVersions: function() {

    return fs.readdirSync('./routes').filter(function(file) {
      return fs.statSync(path.join('./routes', file)).isDirectory()
    })
  }
}