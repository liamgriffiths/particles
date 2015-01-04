var Particle = require('./particle');
var {randFloat} = require('./helpers');
var chroma = require('chroma-js');

var COLORS = ['magenta', 'cyan', 'lime', 'red', 'yellow']
  .map(c => chroma(c).alpha(0).css());

var ParticleController = function(ctx, {width, height}) {
  this.ctx = ctx;
  this.width = width;
  this.height = height;
  this.particles = [];

  for (var i = 0; i < COLORS.length; i++) {
    Particle.preRender(COLORS[i]);
  }
};

ParticleController.prototype = {
  add(position, n) {
    var p = new Particle(this.ctx, {
      position: {
        x: position.x + randFloat(-20, 20),
        y: position.y + randFloat(-20, 20)
      },
      velocity: {x: randFloat(1, 3), y: randFloat(1, 3)},
      direction: {x: randFloat(-1, 1), y: randFloat(-1, 1)},
      color: COLORS[n % COLORS.length]
    });

    this.particles.push(p);
  },

  removeDeadParticles() {
    this.particles = this.particles.filter(p => !p.isDead());
  },

  update() {
    this.removeDeadParticles();
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
    }
  },

  draw() {
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].draw();
    }
  },
};


module.exports = ParticleController;
