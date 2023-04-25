
function forthcircle() {
	'use strict'
  
	var c4 = $('.forth.circle');
  
	c4.circleProgress({
	  startAngle: -Math.PI / 2 * 9,
	  value: 0.5,
	  lineCap: 'round',
	  emptyFill: 'rgba(204, 204, 204,0.2)',
	  fill: { color: myVarVal },
	  lineCap: 'round'
	});
  
  
	setTimeout(function () { c4.circleProgress('value', 0.7); }, 1000);
	setTimeout(function () { c4.circleProgress('value', 1.0); }, 1100);
	setTimeout(function () { c4.circleProgress('value', 0.5); }, 2100);
  
  }