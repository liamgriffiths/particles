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

    this.animation = new Animation(ctx, {
      width: canvas.width,
      height: canvas.height,
    });

    this.animation.run();
    this.handleInputs();
  },

  setTouches(event) {
    this._touches = [].slice.apply(event.touches);
  },

  getTouches() {
    return (this._touches || [])
      .map(touch => ({ x: touch.pageX, y: touch.pageY }));
  },

  handleInputs() {
    this.animation.handleInputs({ touches: this.getTouches() });
    return requestAnimationFrame(this.handleInputs);
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
