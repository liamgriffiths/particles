var http = require('http');
var fs = require('fs');

var assets = {
  '/': __dirname + '/index.html',
  '/bundle.js': __dirname + '/bundle.js'
};

var port = process.env.PORT || 3000;

var server = http.createServer(function(req, res) {
  if (req.url in assets) {
    fs.createReadStream(assets[req.url]).pipe(res);
  } else {
    res.end();
  }
});

server.listen(port, function() {
  console.log('listening on', port);
});
