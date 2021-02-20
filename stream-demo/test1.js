// 拷贝文件
const fs = require('fs');
const path = require('path');

const filename1 = path.resolve(__dirname, 'data.txt');
const filename2 = path.resolve(__dirname, 'data.bak.txt');

const readStream = fs.createReadStream(filename1)
const writeStream = fs.createWriteStream(filename2)

readStream.pipe(writeStream);
// 监听 - 流的读取过程
readStream.on('data', (chunk) => {
  console.log('chunk is: ', chunk.toString());
})
// 监听 - 读取结束
readStream.on('end', () => {
  console.log('ok');
})