var Particle = require('./particle');
var {randFloat, Point} = require('./helpers');
var {List} = require('immutable');

var COLORS = ['magenta', 'cyan', 'limegreen', 'lemonchiffon', 'red'];

var ParticleController = function(ctx, opts) {
  this.ctx = ctx;
  this.width = opts.width;
  this.height = opts.height;
  this.particles = new List();
};

ParticleController.prototype = {
  add(position, color) {
    var p = new Particle(this.ctx, {
      position: {x: position.x, y: position.y },
      velocity: {x: randFloat(1, 5), y: randFloat(1, 5)},
      direction: {x: randFloat(-1, 1), y: randFloat(-1, 1)},
      color: COLORS[color % COLORS.length]
    });

    this.particles = this.particles.push(p);
  },

  removeDeadParticles() {
    this.particles = this.particles.filter(p => !p.isDead());
  },

  update() {
    this.removeDeadParticles();
    this.particles.forEach(p => p.update());
  },

  draw() {
    this.particles.forEach(p => p.draw());
  },
};


module.exports = ParticleController;
