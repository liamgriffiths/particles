var React = require('react');
var Canvas = require('./canvas');

var width = window.innerWidth;
var height = window.innerHeight;
var root = document.querySelector('body');

React.initializeTouchEvents(true);
React.render(<Canvas width={width} height={height} />, root);

window.onerror = function(err) {
  alert(JSON.stringify(err));
};
