'use strict';

var fs = require('fs');
var path = require('path');
var execSync = require('child_process').execSync;

var root = path.join(__dirname, '..');
var buildDir = path.join(root, 'build');

if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir);
}

var bundle = execSync(
  './node_modules/.bin/browserify -t [reactify --strip-types --es6] ./src/index.js',
  { cwd: root, maxBuffer: 1024 * 1024 * 50 }
).toString();

var html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
html = html.replace(
  /<script src=['"]\/bundle\.js['"][^>]*><\/script>/,
  function() {
    return '<script>' + bundle + '</script>';
  }
);

fs.writeFileSync(path.join(buildDir, 'index.html'), html);
console.log('Built build/index.html (' + (bundle.length / 1024).toFixed(1) + ' KB inline JS)');
