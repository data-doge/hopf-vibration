var THREE = require('three')
var mag = require('vectors/mag')(3)

var getFlow = function (vect,dt) {
  //the variable names correspond to those in generate-fiber.js
  var r = Math.sqrt(vect.x*vect.x+vect.y*vect.y+vect.z*vect.z)
  var x4 = (1-r*r)/(1+r*r)
  var m = Math.sqrt(1-x4*x4)
  var x2 = m*vect.x/r

  var x1 = m*vect.y/r

  var x3 = m*vect.z/r

  var dmdt = (1/m)*x3*x4

  var drdt = x3/(r*Math.pow(1+x4,2))

  var unscaledFlow = new THREE.Vector3(
    r*x2*drdt+r*x1/m-r*x2*dmdt/Math.pow(m,2),
    r*x1*drdt-r*x2/m-r*x1*dmdt/Math.pow(m,2),
    r*x3*drdt+r*x4/m-r*x3*dmdt/Math.pow(m,2)
)
  return unscaledFlow.multiplyScalar(dt)
}

module.exports = getFlow
