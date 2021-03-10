"use strict";

var mysql = require('mysql');

var _require = require('../config/db'),
    MYSQL_CONF = _require.MYSQL_CONF; // 创建连接对象


var con = mysql.createConnection(MYSQL_CONF); // 开始连接

con.connect(); // 统一执行sql函数

function exec(sql) {
  var promise = new Promise(function (resolve, reject) {
    con.query(sql, function (err, result) {
      if (err) {
        reject(err);
        return;
      }

      resolve(result);
    });
  });
  return promise;
}

module.exports = {
  exec: exec,
  escape: mysql.escape
};