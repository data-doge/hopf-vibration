var $ = require('jquery')

var buttons = {
  $sketchModeSelector: $('#sketch-mode-selector'),
  $controlsModeSelector: $('#controls-mode-selector'),

  init: function (env){
    this.env = env
    this.bindEventListeners()
  },

  bindEventListeners: function() {
    var self = this
    this.$sketchModeSelector.change(function (e){
      self.env.sketchMode = $(this).val()
    })

    this.$controlsModeSelector.change(function (e) {
      self.env.setControlsMode($(this).val())
    })
  }
}

module.exports = buttons
