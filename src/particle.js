var {randFloat, createGradient, hash} = require('./helpers');
var SimplexNoise = require('simplex-noise');
var simplex = new SimplexNoise(Math.random);

var PRECISION = 1;
var MAX_SIZE = 25;
var MIN_SIZE = Math.pow(10, -PRECISION);

var Particle = function(ctx, opts) {
  this.ctx = ctx;
  this.position = opts.position
  this.velocity = opts.velocity;
  this.direction = opts.direction;

  this.size = randFloat(MAX_SIZE/2, MAX_SIZE) | 0;
  this.age = 1;
  this.lifespan = Math.floor(randFloat(300, 600)) + 300;
  this.decayRate = 0.99;
  this.ageRatio = 1;

  this.color = opts.color;
};

Particle.images = {};
Particle.preRender = (color) => {
  for (var i = MIN_SIZE; i <= MAX_SIZE; i += Math.pow(10, -PRECISION)) {
    var size = +i.toFixed(PRECISION);
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = size * 2;
    canvas.height = size * 2;

    var x = canvas.width / 2;
    var y = canvas.height / 2;

    context.beginPath();
    context.fillStyle = createGradient(context, x, y, size, color);
    context.arc(x, y, size, 0, 2 * Math.PI, false);
    context.fill();
    context.closePath();

    var key = hash([size, color].join(''));
    Particle.images[key] = canvas;
  }
};

Particle.prototype = {
  isDead() {
    return this.age > this.lifespan || this.size < 1;
  },

  update() {
    this.ageRatio = (1 - (this.age / this.lifespan));

    var noise = simplex.noise3D(this.position.x, this.position.y, _GET_ELAPSED_TIME());

    this.direction.x += noise * randFloat(0.1, 0.5);
    this.direction.y += noise * randFloat(0.1, 0.5);

    this.velocity.x *= this.decayRate + (noise * 0.01);
    this.velocity.y *= this.decayRate + (noise * 0.01);

    this.position.x += this.direction.x * this.velocity.x;
    this.position.y += this.direction.y * this.velocity.y;

    this.age += 1.0 * this.decayRate;
    this.size = +(this.size * this.ageRatio).toFixed(PRECISION);
  },

  draw() {
    if (this.size) {
      var { x, y } = this.position;
      var key = hash([this.size, this.color].join(''));
      this.ctx.drawImage(Particle.images[key], x - this.size, y - this.size);
    }
  }
};

module.exports = Particle;
