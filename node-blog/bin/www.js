const { createSecretKey } = require('crypto');
const http = require('http');
const PORT = 8000;
const serverHandle = require('../app.js');

const server = http.createServer(serverHandle);
server.listen(PORT);
console.log('server is running...');