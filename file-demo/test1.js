const fs = require('fs');
const path = require('path');

const filename = path.resolve(__dirname, 'data.txt');

// 读取文件
// fs.readFile(filename, (err, data) => {
//   if(err) {
//     console.log(err);
//     return ;
//   }
//   // data是二进制 需要转换成字符串
//   console.log(data.toString());
// })

// 写入文件
// const content = '\nthis is one new text';
// const option = {
//   flag: 'a' //追加写入
// }
// fs.writeFile(filename, content, option, (err, res) => {
//   if(err) {
//     console.log(err);
//     return ;
//   }
//   console.log(res);
// })

// 判断文件是否存在
// fs.exists(filename, (exist) => {
//   console.log(exist);
// })