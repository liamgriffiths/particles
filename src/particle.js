var randFloat = require('./helpers').randFloat;
var SimplexNoise = require('simplex-noise');
var simplex = new SimplexNoise(Math.random);
var chroma = require('chroma-js');

var Particle = function(ctx, opts) {
  this.ctx = ctx;
  this.position = opts.position
  this.velocity = opts.velocity;
  this.direction = opts.direction;

  this.size = randFloat(5, 20);
  this.age = 1;
  this.lifespan = Math.floor(randFloat(250, 650));
  this.decayRate = randFloat(0.95, 0.99);
  this.ageRatio = 1;
  this.colors = chroma.scale(['white', 'magenta'])
    .domain([this.age, this.lifespan], 15, 'log');
};

Particle.prototype = {
  isDead() {
    return this.age > this.lifespan;
  },

  update() {
    this.ageRatio = (1 - (this.age / this.lifespan));

    var noise = simplex.noise3D(this.position.x, this.position.y, _GET_ELAPSED_TIME());
    var angle = noise * 8.0;

    // this.direction.x = Math.cos(angle);
    // this.direction.y = Math.sin(angle);

    this.velocity.x *= this.decayRate + (noise * 0.01);
    this.velocity.y *= this.decayRate + (noise * 0.01);

    this.position.x += this.direction.x * this.velocity.x;
    this.position.y += this.direction.y * this.velocity.y;

    this.age += 1.0 * this.decayRate;
    this.size = this.ageRatio * this.size;
  },

  draw() {
    var color = this.colors(Math.floor(this.age))
      .alpha(this.ageRatio * 0.9)
      .css();

    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.closePath();
  }
};

module.exports = Particle;
