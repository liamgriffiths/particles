var randFloat = require('./helpers').randFloat;
var SimplexNoise = require('simplex-noise');
var simplex = new SimplexNoise(Math.random);
var chroma = require('chroma-js');

var Particle = function(ctx, opts) {
  this.ctx = ctx;
  this.position = opts.position
  this.velocity = opts.velocity;
  this.direction = opts.direction;

  this.size = randFloat(10, 25);
  this.age = 1;
  this.lifespan = Math.floor(randFloat(300, 600)) + 300;
  this.decayRate = 0.99;
  this.ageRatio = 1;

  this.color = chroma(opts.color);
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
    this.size *= this.ageRatio;
  },

  draw() {
    var { x, y } = this.position;

    this.ctx.beginPath();
    var gradient = this.ctx.createRadialGradient(x, y, 0, x, y, this.size);
    gradient.addColorStop(0.0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(1.0, this.color.alpha(0).css());
    this.ctx.fillStyle = gradient;
    this.ctx.arc(x, y, this.size, 0, 2 * Math.PI, false);
    this.ctx.fill();
    this.ctx.closePath();
  }
};

module.exports = Particle;
