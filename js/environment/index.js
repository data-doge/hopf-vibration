var THREE = require('three')
var flyControls = require('three-fly-controls')(THREE)
var generateFiber = require('./generate-fiber')
//var generateParticle = require('./../generate-particle')
var hud = require('./../hud')
// var flow = require('./flow')
// var modebutton = require('./../buttons')

module.exports = {
  scene: new THREE.Scene(),
  camera: new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000),
  renderer: new THREE.WebGLRenderer({alpha: true, canvas: document.getElementById('environment')}),
  fibers: [],
  particles: [],
  mode: "fiber",
  hud: hud,
  init: function () {
    this.initRenderer()
    this.addAxes()
    this.initControls()
    this.hud.init(this)
  },

  startAnimation: function () {
    var self = this
    var lastTimeMsec = null

    requestAnimationFrame(function render (nowMsec) {
      requestAnimationFrame(render)
      self.renderer.render(self.scene, self.camera)
      var coordsArray = self.hud.sketchpad.extractNewSphericalCoords()
      if (self.mode === "fiber"){
        self.fibers = coordsArray.map(generateFiber)
        self.fibers.forEach(function (fiber) { self.scene.add(fiber) })
      }
      // if (self.mode === "particle"){
      //   self.newparticles = coordsArray.map(generateParticle)
      //   self.newparticles.forEach(function (particle) {self.scene.add(particle)})
      // }
      lastTimeMsec  = lastTimeMsec || nowMsec-1000/60
      var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
      lastTimeMsec  = nowMsec
      if (self.controls) { self.controls.update(deltaMsec/1000) }
    })
  },

  removeImage: function () {
    var self = this
    this.fibers.forEach(function (fiber) { self.scene.remove(fiber) })
  },

  // private

  addAxes: function () {
    var axes = new THREE.AxisHelper(5)
    this.scene.add(axes)
  },

  initRenderer: function () {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0xffffff, 0)
    document.body.appendChild(this.renderer.domElement)
  },

  initControls: function () {
    this.camera.position.z = 10
    this.controls = new THREE.FlyControls(this.camera, this.renderer.domElement, { movementSpeed: 0.01 })
  },



}
