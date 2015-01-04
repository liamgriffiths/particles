var ParticleController = require('./particle_controller');
var {requestAnimationFrame, randFloat} = require('./helpers');

var Animation = function(ctx, {width, height}) {
  this.ctx = ctx;
  this.width = width;
  this.height = height;

  this.particleController = new ParticleController(this.ctx, {width, height});
};

Animation.prototype = {
  handleInputs(inputs) {
    for (var i = 0; i < inputs.length; i++) {
      this.particleController.add(inputs[i], i);
    }
  },

  update() {
    this.particleController.update();
  },

  draw() {
    // clear canvas && re-draw
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.particleController.draw();
  },

  run() {
    this.update();
    this.draw();
    requestAnimationFrame(this.run.bind(this));
    return this;
  }
};


module.exports = Animation;
