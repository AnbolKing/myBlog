const fs = require('fs');
const path = require('path');

const filename1 = path.resolve(__dirname, 'data.txt');

const http = require('http');
const server = http.createServer((req, res) => {
  if(req.method === 'GET') {
    const readStream = fs.createReadStream(filename1)
    readStream.pipe(res);
  }
})

server.listen(8003, () => {
  console.log('running...');
})