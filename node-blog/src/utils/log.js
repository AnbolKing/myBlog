const fs = require('fs');
const path = require('path');

// 写日志
function writeLog(writeStream, log) {
  writeStream.write(log)
}
// 生成 write stream
function createWriteStream(filename) {
  const fullFileName = path.join(__dirname, '../', '../', 'logs', filename);
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a',
  })
  return writeStream;
}

const acessWriteStream = createWriteStream('access.log');
function access(log) {
  writeLog(acessWriteStream, log)
}

module.exports = {
  access,
}