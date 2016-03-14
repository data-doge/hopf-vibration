var THREE = require('three')
var mag = require('vectors/mag')(3)
var hexStringFromSphericalCoords = require('./../services/hex-string-from-spherical-coords')

// TODO: give to world
var generateParticle = function (sphericalCoords) {
  var particle = new THREE.DodecahedronGeometry(0.1)

  var material = new THREE.MeshNormalMaterial()
  var particleMesh = new THREE.Mesh(particle, material)

  var eta = sphericalCoords.eta, phi = sphericalCoords.phi

  //get point on unit 3-sphere in 4D space with Cartesian coordinates
  var x1 = Math.cos(phi) * Math.sin(eta/2)
  var x2 = Math.sin(phi) * Math.sin(eta/2)
  var x3 = Math.cos(phi) * Math.cos(eta/2)
  var x4 = Math.sin(phi) * Math.cos(eta/2)

  //stereographically project point on 3-sphere to point in 3D space in Cartesian coordinates
  var m = mag([x1,x2,x3])
  var r = Math.sqrt((1-x4)/(1+x4))

  particleMesh.position.set(
        r * x2 / m,
        r * x1 / m,
        r * x3 / m)



  return particleMesh
}

module.exports = generateParticle
