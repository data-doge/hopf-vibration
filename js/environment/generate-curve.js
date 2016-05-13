var THREE = require('three')
var mag = require('vectors/mag')(3)


var generateCurve = function(sphericalCoords) {
  var curve = new THREE.Curve()
  curve.getPoint = function (t) {
    var eta = sphericalCoords.eta, phi = sphericalCoords.phi, theta = 2 * Math.PI * t

    //get point on unit 3-sphere in 4D space with Cartesian coordinates
    var x1 = Math.cos(phi+theta) * Math.sin(eta/2)
    var x2 = Math.sin(phi+theta) * Math.sin(eta/2)
    var x3 = Math.cos(phi-theta) * Math.cos(eta/2)
    var x4 = Math.sin(phi-theta) * Math.cos(eta/2)

    //stereographically project point on 3-sphere to point in 3D space in Cartesian coordinates
    var m = mag([x1,x2,x3])
    var r = Math.sqrt((1-x4)/(1+x4))

    //return point in 3D space in Cartesian coordinates
    return new THREE.Vector3(
      r * x2 / m,
      r * x1 / m,
      r * x3 / m
    )
  }
  return curve
}

module.exports = generateCurve
