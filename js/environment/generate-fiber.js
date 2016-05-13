var THREE = require('three')
var hexStringFromSphericalCoords = require('./../services/hex-string-from-spherical-coords')
var generateCurve = require('./generate-curve')

// TODO: give to world
var generateFiber = function (sphericalCoords) {
  //THREE.Curve generated elsewhere
  var fiber = generateCurve(sphericalCoords)



  // returns 'fiber' geometry corresponding to the point on the 2-sphere with spherical coordinates phi, eta
  var tubeGeometry = new THREE.TubeGeometry(
    fiber,  // path
    64,     // segments
    0.01,   // radius
    8,      // radiusSegments
    false   // closed
  )
  // TODO: make color xyz to rgb
  var hexString = hexStringFromSphericalCoords(sphericalCoords).replace('#', '0x')
  var hex = parseInt(hexString)
  var material = new THREE.LineBasicMaterial({color: hex})
  var fiberMesh = new THREE.Mesh(tubeGeometry, material)
  fiberMesh.sphericalCoords = sphericalCoords
  return fiberMesh
}

module.exports = generateFiber
