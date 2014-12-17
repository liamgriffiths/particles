var React = require('react');
var Animation = require('./animation');

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
  },

  setTouch(event) {
    var {pageX, pageY} = event.nativeEvent.touches[0];
    this.touchX = pageX;
    this.touchY = pageY;
  },

  getTouch() {
    return {x: this.touchX, y: this.touchY};
  },

  handleTouchStart(event) {
    event.preventDefault();
    this.setTouch(event);
    this.touching = setInterval(_ => {
      this.animation.particleController.add(this.getTouch());
    }, 1);
  },

  handleTouchMove(event) {
    event.preventDefault();
    this.setTouch(event);
    this.animation.particleController.add(this.getTouch());
  },

  handleTouchEnd(event) {
    event.preventDefault();
    clearInterval(this.touching);
  },

  render() {
    return <canvas ref="canvas"
      onTouchStart={this.handleTouchStart}
      onTouchMove={this.handleTouchMove}
      onTouchEnd={this.handleTouchEnd} />;
  }
});

module.exports = Canvas;
