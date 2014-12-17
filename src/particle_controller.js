var Particle = require('./particle');
var {randFloat} = require('./helpers');

var ParticleController = function(ctx, opts) {
  this.ctx = ctx;
  this.width = opts.width;
  this.height = opts.height;
  this.particles = [];
};

ParticleController.prototype = {
  add(position) {
    var p = new Particle(this.ctx, {
      position: position,
      velocity: {x: randFloat(1, 3), y: randFloat(1, 3)},
      direction: {x: randFloat(-1, 1), y: randFloat(-1, 1)}
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
