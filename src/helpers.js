var {Record} = require('immutable');

var requestAnimationFrame = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  ((cb) => setTimeout(cb, 1000/60));

var randFloat = (min, max) =>
  Math.random() * (max - min) + min;

var Point = new Record({
  x: 0,
  y: 0
});

module.exports = {
  requestAnimationFrame,
  randFloat,
  Point
};
