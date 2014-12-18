var React = require('react');
var Animation = require('./animation');
var {requestAnimationFrame} = require('./helpers');

var BLACK = '#000';

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
    canvas.style.background = BLACK;

    this.animation = new Animation(ctx, {
      width: canvas.width,
      height: canvas.height,
    });

    this.animation.run();
    this.handleInputs();
  },

  setTouches(event) {
    var touches = event.touches;
    this.touches = [];
    for (var i = 0; i < touches.length; i++) {
      this.touches.push({
        x: touches[i].pageX,
        y: touches[i].pageY
      });
    }
  },

  getTouches() {
    return this.touches || [];
  },

  handleInputs() {
    var touches = this.getTouches();
    for (var i = 0; i < touches.length; i++) {
      this.animation.particleController.add({
        x: touches[i].x,
        y: touches[i].y
      }, i);
    }
    requestAnimationFrame(this.handleInputs);
  },

  handleTouchStart(event) {
    event.preventDefault();
    this.setTouches(event);
  },

  handleTouchMove(event) {
    event.preventDefault();
    this.setTouches(event);
  },

  handleTouchEnd(event) {
    event.preventDefault();
    this.setTouches(event);
  },

  render() {
    return <canvas ref="canvas"
      onTouchStart={this.handleTouchStart}
      onTouchMove={this.handleTouchMove}
      onTouchEnd={this.handleTouchEnd} />;
  }
});

module.exports = Canvas;
