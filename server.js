const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;
const root = path.join(__dirname, '..');

http.createServer((req,res)=>{
  let file = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(root, file);
  const ext = path.extname(filePath);
  const types = {'.html':'text/html','.css':'text/css','.js':'text/javascript'};
  fs.readFile(filePath,(err,data)=>{
    if(err){res.writeHead(404);res.end('Not found');return;}
    res.writeHead(200,{'Content-Type':types[ext]||'text/plain'});
    res.end(data);
  });
}).listen(port,()=>console.log(`LSPU Hackathon prototype running at http://localhost:${port}`));
