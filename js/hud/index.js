var buttons = require('./buttons')
var sketchpad = require('./sketchpad')
var $ = require('jquery')
var randomDate = require('./../services/random-date')
var apod = require('nasa-apod').Client({
  apiKey: process.env.NASA_API_KEY
})

var hud = {
  buttons: buttons,
  sketchpad: sketchpad,
  init: function(env) {
    this.buttons.init(env)
    this.sketchpad.init()
    setBackgroundImage()
  }
}

var setBackgroundImage = function () {
  var date = randomDate(new Date(2012, 0, 1),new Date())
  apod(date).then(function(data) {
      $('body').css("background-image","url("+data.hdurl+")")
      $('body').css("background-position","center")
      $('body').css("background-size","cover")
      $('body').css("background-repeat","no-repeat")
    })
}

module.exports = hud
