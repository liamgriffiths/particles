var slice = Array.prototype.slice;

var requestAnimationFrame = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  ((cb) => setTimeout(cb, 1000/60));

var randFloat = (min, max) =>
  Math.random() * (max - min) + min;

var hash = (input) =>
  input.toString().split('')
    .map(char => char.charCodeAt(0))
    .reduce((hash, char) => hash = (((hash << 5) - hash) + char) | 0, 0);

var memoize = (fn) => {
  var cache = {};
  return () => {
    var key = hash(slice.call(arguments));
    if (!cache[key]) {
      cache[key] = fn.apply(this, arguments)
    }
    return cache[key];
  }
};

var createGradient = (ctx, x, y, size, color) => {
  var gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
  gradient.addColorStop(0.0, '#ffffff');
  gradient.addColorStop(0.5, '#ffffff');
  gradient.addColorStop(1.0, color);
  return gradient;
};


module.exports = {
  requestAnimationFrame,
  randFloat,
  createGradient,
  memoize
};
