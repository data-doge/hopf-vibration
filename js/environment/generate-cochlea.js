var generateCochlea = function (fourierData,numIntervals,t,numCirclesPerInterval){
  //t should be slowly varying, fourierData computed with numIntevals,
  //numCirclesPerInterval is a independent parameter
  var bigAngleInterval = Math.PI/numIntervals
  var smallAngleInterval = bigAngleInterval/numCirclesPerInterval
  var sphericalCoords = []
  for (j=0; j<numIntervals; j++){
    for (k=0; k<numCirclesPerInterval; k++){
      var eta = -Math.PI/2 + bigAngleInterval*j + smallAngleInterval*k
      var phi = Math.asin(Math.tanh(eta+t)*Math.cot(fourierData[j]*2*Math.PI/255))
      sphericalCoords.append({eta:eta, phi:phi})
    }
  }
  return sphericalCoords
}

module.exports = generateCochlea
