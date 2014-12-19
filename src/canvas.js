/* @flow */

var React = require('react');
var Animation = require('./animation');
var {requestAnimationFrame} = require('./helpers');

type Point = { x: number; y: number };
type Event = Object; // window.Event
type Touch = { pageX: number; pageY: number };

var _touches : Array<Touch> = [];
var _animation : Animation;

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

    _animation = new Animation(ctx, {
      width: canvas.width,
      height: canvas.height,
    }).run();

    this.handleInputs();
  },

  setTouches: function(e : Event) {
    _touches = e.touches ? [].slice.call(e.touches) : [];
  },

  getTouches() : Array<Point> {
    return _touches.map(touch => {
      return { x: touch.pageX, y: touch.pageY };
    });
  },

  handleInputs() {
    if (_animation) _animation.handleInputs({ touches: this.getTouches() });
    requestAnimationFrame(this.handleInputs);
  },

  handleTouchStart(e : Event) {
    e.preventDefault();
    this.setTouches(e);
  },

  handleTouchMove(e : Event) {
    e.preventDefault();
    this.setTouches(e);
  },

  handleTouchEnd(e : Event) {
    e.preventDefault();
    this.setTouches(e);
  },

  render() : ?ReactElement {
    return <canvas ref="canvas"
      onTouchStart={this.handleTouchStart}
      onTouchMove={this.handleTouchMove}
      onTouchEnd={this.handleTouchEnd} />;
  }
});

module.exports = Canvas;
