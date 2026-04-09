const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3456;
const BASE = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
};

http.createServer((req, res) => {
  let filePath = path.join(BASE, req.url === '/' ? '/threejs-sphere.html' : req.url);
  const ext = path.extname(filePath);
  const contentType = MIME[ext] || 'text/plain';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404); res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}).listen(PORT, () => console.log('Server running at http://localhost:' + PORT));
