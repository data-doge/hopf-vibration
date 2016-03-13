var $ = require('jquery')

var buttons = {
  $sketchModeSelector: $('#sketch-mode-selector'),

  init: function (env){
    this.env = env
    this.bindEventListeners()
  },

  bindEventListeners: function() {
    var self = this
    this.$sketchModeSelector.change(function (e){
      e.preventDefault()
      self.env.mode = $(this).val()
    })
  }
}

module.exports = buttons
