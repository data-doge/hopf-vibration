var $ = require('jquery')
var mag = require('vectors/mag')(2)
var hexStringFromSphericalCoords = require('./../services/hex-string-from-spherical-coords')

var sketchpad = {
  $sketchpad: $('#sketchpad'),
  $toggleDisplayBtn: $('#toggle-sketchpad-display-btn'),
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

    this.$toggleDisplayBtn.click(function (e) {
      e.preventDefault()
      var $this = $(this)
      self.$sketchpad.toggle()
      console.log(self.$sketchpad.is(':visible'))
      self.$sketchpad.is(':visible') ? $this.html('&minus;') : $this.text('+')
    })
  },

  onClick: function (e) {
    var coords = {x: e.offsetX, y: e.offsetY}
    var sphericalCoords = this.getSphericalCoordsFrom(coords)
    this.sphericalCoordsArray.push(sphericalCoords)
    this.drawPoint(coords, sphericalCoords)
  },

  // private

  drawPoint: function (coords, sphericalCoords) {
    this.context.fillStyle = hexStringFromSphericalCoords(sphericalCoords)
    this.context.fillRect(coords.x, coords.y, 5, 5)
  },

  getSphericalCoordsFrom: function (coords) {
    var scaledX = (coords.x / this.$sketchpad.width() - 0.5) * 4 // -2 -> 2
    var scaledY = (-coords.y / this.$sketchpad.height() + 0.5) * 4 // -2 -> 2
    return {
      phi: Math.atan2(scaledY, scaledX)/2,                       // -PI -> PI
      eta: Math.atan(Math.pow(mag([scaledX, scaledY]), -1)) * 2 // 0 -> PI}
    }
  }
}

module.exports = sketchpad
