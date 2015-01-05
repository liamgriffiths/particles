var requestAnimationFrame = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  ((cb) => setTimeout(cb, 1000/60));

var randFloat = (min, max) =>
  Math.random() * (max - min) + min;

var clamp = (val, min, max) =>
  Math.min(max, Math.max(min, val));

var getTime = (() => {
  var start = +(new Date());
  return () => +(new Date()) - start;
})();

var hash = (val) =>
  JSON.stringify(val)
    .split('')
    .map(char => char.charCodeAt(0))
    .reduce((hash, char) => (((hash << 5) - hash) + char) >>> 0, 0);

function HashMap() {
  this.values = {};
}

HashMap.prototype = {
  get(key) {
    return this.values[hash(key)];
  },

  set(key, val) {
    this.values[hash(key)] = val;
  }
}

module.exports = {
  requestAnimationFrame,
  randFloat,
  clamp,
  getTime,
  HashMap
};
