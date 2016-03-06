var $ = require('jquery')
var mag = require('vectors/mag')(2)
var Color = require("color")

var sketchpad = {
  $sketchpad: $('#sketchpad'),
  context: $('#sketchpad')[0].getContext('2d'),
  paint: false,
  sphericalCoordsArray: [],

  init: function () {
    this.context.fillStyle = '#FFFFFF'
    this.bindEventListeners()
  },

  extractNewSphericalCoords: function () {
    var newCoordsArray = this.sphericalCoordsArray
    this.sphericalCoordsArray = []
    return newCoordsArray
  },

  bindEventListeners: function () {
    var self = this

    this.$sketchpad.mousedown(function (e) {
      self.paint = true
      self.onClick(e)
    })

    this.$sketchpad.mousemove(function (e) {
      if (self.paint) { self.onClick(e) }
    })

    this.$sketchpad.mouseup(function (e) { self.paint = false })
    this.$sketchpad.mouseleave(function(e){ self.paint = false })
  },

  onClick: function (e) {
    var coords = {x: e.offsetX, y: e.offsetY}
    var sphericalCoords = this.getSphericalCoordsFrom(coords)
    console.log('eta: ', sphericalCoords.eta, ', phi: ', sphericalCoords.phi)
    this.sphericalCoordsArray.push(sphericalCoords)
    this.drawPoint(coords, sphericalCoords)
  },

  // private

  drawPoint: function (coords, sphericalCoords) {
    this.context.fillStyle = this.getColorFrom(sphericalCoords)
    this.context.fillRect(coords.x, coords.y, 5, 5)
  },

  getSphericalCoordsFrom: function (coords) {
    console.log('coords.x: ', coords.x, ', coords.y: ', coords.y)
    var scaledX = (coords.x / this.$sketchpad.width() - 0.5) * 4 // -2 -> 2
    var scaledY = (-coords.y / this.$sketchpad.height() + 0.5) * 4 // -2 -> 2
    console.log('scaledX: ', scaledX, ', scaledY: ', scaledY)

    return {
      phi: Math.atan2(scaledY, scaledX),                       // -PI -> PI
      eta: Math.atan(Math.pow(mag([scaledX, scaledY]), -5)) * 2 // 0 -> PI}
    }
  },

  getColorFrom: function (sphericalCoords) {
    var hue = parseInt(sphericalCoords.phi * 360 / (2 * Math.PI) + 180)
    var saturation = parseInt(sphericalCoords.eta / Math.PI * 100)
    var hsv = Color().hsv(hue, saturation, 100)
    return hsv.hexString()
  }

}

module.exports = sketchpad
