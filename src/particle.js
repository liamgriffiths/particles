var {randFloat, getTime, clamp, HashMap} = require('./helpers');
var SimplexNoise = require('simplex-noise');
var simplex = new SimplexNoise(Math.random);

var SIZE_PRECISION = 1;
var MAX_SIZE = 25;
var MIN_SIZE = Math.pow(10, -SIZE_PRECISION);
var TWO_PI = 2 * Math.PI;
var WHITE = '#ffffff';

var Particle = function(ctx, opts) {
  this.ctx = ctx;
  this.position = opts.position
  this.velocity = { x: randFloat(1, 5), y: randFloat(1, 5) };
  this.direction = { x: randFloat(-1, 1), y: randFloat(-1, 1) };
  this.color = opts.color;

  this.size = randFloat(MAX_SIZE / 2, MAX_SIZE) | 0;
  this.age = 1;
  this.lifespan = randFloat(600, 900) | 0;
  this.decayRate = 0.99;
  this.ageRatio = 1;
};

Particle.images = new HashMap();

Particle.createRadialGradient = (ctx, x, y, size, color) => {
  var gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
  gradient.addColorStop(0.0, WHITE);
  gradient.addColorStop(0.5, WHITE);
  gradient.addColorStop(1.0, color);
  return gradient;
}

Particle.createTmpCanvas = (size) => {
  var canvas = document.createElement('canvas');
  canvas.width = size * 2;
  canvas.height = size * 2;
  return canvas;
};

Particle.preRender = (color) => {
  for (var i = MIN_SIZE; i <= MAX_SIZE; i += MIN_SIZE) {
    var size = +i.toFixed(SIZE_PRECISION);
    var canvas = Particle.createTmpCanvas(size);
    var ctx = canvas.getContext('2d');

    var [x, y] = [canvas.width / 2, canvas.height / 2];

    ctx.beginPath();
    ctx.fillStyle = Particle.createRadialGradient(ctx, x, y, size, color);
    ctx.arc(x, y, size, 0, TWO_PI, false);
    ctx.fill();
    ctx.closePath();
    Particle.images.set([size, color], canvas);
  }
};

Particle.prototype = {
  isDead() {
    return this.age > this.lifespan || this.size < 1;
  },

  update() {
    this.ageRatio = (1 - (this.age / this.lifespan));

    var noise = simplex.noise3D(this.position.x, this.position.y, getTime());

    this.direction.x = clamp(this.direction.x + noise * randFloat(0.1, 0.3), -1, 1);
    this.direction.y = clamp(this.direction.y + noise * randFloat(0.1, 0.3), -1, 1);

    this.velocity.x = (this.velocity.x * this.ageRatio) + (noise * 0.01);
    this.velocity.y = (this.velocity.y * this.ageRatio) + (noise * 0.01);

    this.position.x += this.direction.x * this.velocity.x;
    this.position.y += this.direction.y * this.velocity.y;

    this.age += 1 * this.decayRate;
    this.size = +(this.size * this.ageRatio).toFixed(SIZE_PRECISION);
  },

  draw() {
    if (this.size) {
      var [x, y] = [this.position.x - this.size, this.position.y - this.size];
      var image = Particle.images.get([this.size, this.color]);
      this.ctx.drawImage(image, x, y);
    }
  }
};

module.exports = Particle;
