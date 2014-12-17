var React = require('react');
var Canvas = require('./canvas');

var width = window.innerWidth;
var height = window.innerHeight;
var root = document.querySelector('body');

// global values
window._START_TIME = +(new Date());
window._GET_ELAPSED_TIME = _ => +(new Date()) - window._START_TIME;

React.initializeTouchEvents(true);
React.render(<Canvas width={width} height={height} />, root);
