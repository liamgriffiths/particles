var Particle = require('./particle');
var {randFloat} = require('./helpers');

var COLORS = ['magenta', 'cyan', 'firebrick', 'mintcream', 'thistle'];

var ParticleController = function(ctx, opts) {
  this.ctx = ctx;
  this.width = opts.width;
  this.height = opts.height;
  this.particles = [];
};

ParticleController.prototype = {
  add(position, color) {
    var p = new Particle(this.ctx, {
      position: position,
      velocity: {x: randFloat(1, 5), y: randFloat(1, 5)},
      direction: {x: randFloat(-1, 1), y: randFloat(-1, 1)},
      color: COLORS[color % COLORS.length]
    });
    this.particles.push(p);
  },

  removeDeadParticles() {
    this.particles = this.particles.filter(p => !p.isDead());
  },

  update() {
    this.removeDeadParticles();
    for (var i = 0; i < this.particles.length; i++) {
      var p = this.particles[i];
      p.update();
    }
  },

  draw() {
    for (var i = 0; i < this.particles.length; i++) {
      var p = this.particles[i];
      p.draw();
    }
  },
};


module.exports = ParticleController;
