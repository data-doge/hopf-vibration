var sketchpad = require('./sketchpad')
var $ = require('jquery')
var apod = require('apod')
apod.apiKey = process.env.NASA_API_KEY

var hud = {
  sketchpad: sketchpad,

  init: function(env) {
    this.sketchpad.init(env)
    this.setBackgroundImage()
  },

  setBackgroundImage: function () {
    apod.random(function (err, res) {
      $('body').css('background-image', 'url(' + res.hdurl + ')')
    })
  }
}


module.exports = hud
