'use strict';

const http = require('http');
const fs = require('fs');

const port = process.env.PORT || 3000;

const serve = (file) => (req, res) =>
  fs.createReadStream(file).pipe(res);

const handlers = {
  '/': serve(__dirname + '/index.html'),
  '/bundle.js': serve(__dirname + '/bundle.js')
};

const server = http.createServer((req, res) => {
  let handler = handlers[req.url];
  if (handler) {
    handler(req, res);
  } else {
    res.end();
  }
});

server.listen(port, () => console.log('listening on', port));
