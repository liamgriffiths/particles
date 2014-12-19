var requestAnimationFrame = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  ((cb) => setTimeout(cb, 1000/60));

var randFloat = (min, max) =>
  Math.random() * (max - min) + min;

module.exports = {
  requestAnimationFrame,
  randFloat
};
