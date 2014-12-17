var randFloat = require('./helpers').randFloat;
var SimplexNoise = require('simplex-noise');
var simplex = new SimplexNoise(Math.random);

var Particle = function(ctx, opts) {
  this.ctx = ctx;
  this.position = opts.position
  this.velocity = opts.velocity;
  this.direction = opts.direction;

  this.size = randFloat(10, 20);
  this.age = 0;
  this.lifespan = randFloat(250, 550);
  this.decayRate = randFloat(0.95, 0.99);
};

Particle.prototype = {
  isDead() {
    return this.age > this.lifespan;
  },

  update() {
    var ageRatio = (1 - (this.age / this.lifespan));

    var noise = simplex.noise3D(this.position.x, this.position.y, _GET_ELAPSED_TIME());
    var angle = noise * 8.0;

    // this.direction.x = Math.cos(angle);
    // this.direction.y = Math.sin(angle);

    this.velocity.x *= this.decayRate + (noise * 0.01);
    this.velocity.y *= this.decayRate + (noise * 0.01);

    this.position.x += this.direction.x * this.velocity.x;
    this.position.y += this.direction.y * this.velocity.y;

    this.age += 1.0 * this.decayRate;
    this.size = ageRatio * this.size;
  },

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = 'rgba(100, 100, 150, 0.5)';
    this.ctx.fill();
    this.ctx.closePath();
  }
};

module.exports = Particle;
