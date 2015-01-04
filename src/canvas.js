var React = require('react');
var Animation = require('./animation');
var {requestAnimationFrame} = require('./helpers');

var Canvas = React.createClass({

  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
  },

  componentDidMount() {
    var canvas = this.refs.canvas.getDOMNode();
    var ctx = canvas.getContext('2d');


    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.background = '#000';
    ctx.globalCompositeOperation = 'lighter';

    this.animation = new Animation(ctx, {
      width: canvas.width,
      height: canvas.height,
    }).run();

    this._touches = [];
    this.handleInputs();
  },

  setTouches: function(e) {
    e.preventDefault();
    this._touches = e.touches ? [].slice.call(e.touches) : [];
  },

  getTouches() {
    return this._touches.map(touch => {
      return { x: touch.pageX, y: touch.pageY };
    });
  },

  handleInputs() {
    if (this.animation) {
      var inputs = this.getTouches();
      this.animation.handleInputs(inputs);
    }
    requestAnimationFrame(this.handleInputs);
  },

  render() {
    return <canvas ref="canvas"
      onTouchStart={this.setTouches}
      onTouchMove={this.setTouches}
      onTouchEnd={this.setTouches} />;
  }
});

module.exports = Canvas;
