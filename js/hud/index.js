var buttons = require('./buttons')
var sketchpad = require('./sketchpad')

var hud = {
  buttons: buttons,
  sketchpad: sketchpad,
  init: function(env) {
    this.buttons.init(env)
    this.sketchpad.init()
  }
}
module.exports = hud
