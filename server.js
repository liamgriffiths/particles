'use strict';

var http = require('http');
var fs = require('fs');

var port = process.env.PORT || 3000;

var serve = function(file) {
  return function(req, res) {
    fs.createReadStream(file).pipe(res);
  }
};

var routes = {
  '/': serve(__dirname + '/index.html'),
  '/bundle.js': serve(__dirname + '/bundle.js')
};

var router = function(routes) {
  return function(req, res) {
    var handler = routes[req.url];
    if (handler) {
      handler(req, res);
    } else {
      res.end();
    }
  }
};

var server = http.createServer(router(routes));
server.listen(port);
