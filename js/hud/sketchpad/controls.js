var $ = require('jquery')

var controls = {
  $sketchpad: $('#sketchpad'),
  $sketchModeSelector: $('#sketch-mode-selector'),
  $controlsModeSelector: $('#controls-mode-selector'),
  $toggleDisplayBtn: $('#toggle-sketchpad-display-btn'),
  $selectorsContainer: $('#selectors-container'),

  init: function (env) {
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

    this.$toggleDisplayBtn.click(function (e) {
      e.preventDefault()
      var $this = $(this)
      self.$sketchpad.toggle()
      self.$selectorsContainer.toggle()
      self.$sketchpad.is(':visible') ? $this.html('close') : $this.text('open')
    })
  }
}

module.exports = controls
