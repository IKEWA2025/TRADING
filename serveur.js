// Petit serveur local pour "Ma formation trading" (accessible uniquement depuis cet ordinateur).
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = __dirname, PORT = 8080;
const TYPES = { '.html': 'text/html; charset=utf-8', '.md': 'text/plain; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css' };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/accueil.html';
  const file = path.join(ROOT, path.normalize(p));
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end('Interdit'); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('Page introuvable'); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(data);
  });
}).listen(PORT, '127.0.0.1', () => console.log('Ma formation trading : http://localhost:' + PORT + '  (ferme cette fenetre pour arreter)'));
