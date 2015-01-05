var {randFloat, clamp, HashMap} = require('./helpers');
var SimplexNoise = require('simplex-noise');
var simplex = new SimplexNoise(Math.random);

var PRECISION = 1;
var MAX_SIZE = 25;
var MIN_SIZE = Math.pow(10, -PRECISION);
var WHITE = '#ffffff';
var TWO_PI = 2 * Math.PI;

var Particle = function(ctx, {position, velocity, direction, color}) {
  this.ctx = ctx;
  this.position = position
  this.velocity = velocity;
  this.direction = direction;
  this.color = color;

  this.size = +(randFloat(MAX_SIZE / 2, MAX_SIZE)).toFixed(PRECISION);
  this.age = 1;
  this.lifespan = Math.floor(randFloat(300, 600)) + 300;
  this.decayRate = 0.99;
  this.ageRatio = 1;
};

Particle.images = new HashMap(); // store pre-rendered image frames

Particle.createTmpCanvas = (size) => {
  var canvas = document.createElement('canvas');
  canvas.width = size * 2;
  canvas.height = size * 2;
  return canvas;
};

Particle.createRadialGradient = (ctx, x, y, size, color) => {
  var gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
  gradient.addColorStop(0.0, WHITE);
  gradient.addColorStop(0.5, WHITE);
  gradient.addColorStop(1.0, color);
  return gradient;
}

Particle.preRender = (color) => {
  for (var i = MIN_SIZE; i <= MAX_SIZE + MIN_SIZE; i += MIN_SIZE) {
    var size = +i.toFixed(PRECISION);
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
    return this.age > this.lifespan || this.size < MIN_SIZE;
  },

  update() {
    this.ageRatio = (1 - (this.age / this.lifespan));

    var noise = simplex.noise3D(this.position.x, this.position.y, _GET_ELAPSED_TIME());

    this.direction.x += noise * randFloat(0.1, 0.5);
    this.direction.y += noise * randFloat(0.1, 0.5);
    this.direction.x = clamp(this.direction.x, -1, 1);
    this.direction.y = clamp(this.direction.y, -1, 1);

    this.velocity.x = (this.velocity.x * this.ageRatio);
    this.velocity.y = (this.velocity.y * this.ageRatio);

    this.position.x += this.direction.x * this.velocity.x;
    this.position.y += this.direction.y * this.velocity.y;

    this.age += 1 * this.decayRate;
    this.size = +(this.size * this.ageRatio).toFixed(PRECISION);
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
