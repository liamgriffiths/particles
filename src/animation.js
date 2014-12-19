var ParticleController = require('./particle_controller');
var {requestAnimationFrame, randFloat} = require('./helpers');

var Animation = function(ctx, opts) {
  this.ctx = ctx;
  this.width = opts.width;
  this.height = opts.height;

  this.particleController = new ParticleController(this.ctx, {
    width: this.width,
    height: this.height
  });
};

Animation.prototype = {
  handleInputs(inputs) {
    if (inputs.touches) {
      inputs.touches.forEach((touch, i) => {
        this.particleController.add(touch, i)
      });
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
