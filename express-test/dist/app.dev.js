"use strict";

var express = require('express');

var app = express();
app.use(function (req, res, next) {
  console.log('请求开始...', req.method, req.url);
  next();
});
app.use(function (req, res, next) {
  // 假设处理cookie
  req.cookie = {
    userId: 'abc123'
  };
  next();
});
app.use(function (req, res, next) {
  // 假设处理postdata
  setTimeout(function () {
    req.body = {
      a: 100,
      b: 200
    };
    next();
  });
});
app.use('/api', function (req, res, next) {
  console.log('处理api路由');
  next();
});
app.get('/api', function (req, res, next) {
  console.log('get 处理api路由');
  next();
});
app.post('/api', function (req, res, next) {
  console.log('post 处理api路由');
  next();
});

function loginCheck(req, res, next) {
  console.log('login successed');
  setTimeout(function () {
    next();
  });
}

app.get('/api/get-cookie', loginCheck, function (req, res, next) {
  console.log('get /api/get-cookie');
  res.json({
    errno: 0,
    data: req.cookie
  });
});
app.post('/api/get-post-data', function (req, res, next) {
  console.log('post /api/get-post-data');
  res.json({
    errno: 0,
    data: req.body
  });
});
app.use(function (req, res, next) {
  console.log('处理404');
  res.json({
    errno: -1,
    msg: '404 not found'
  });
});
app.listen(3000, function () {
  console.log('server is running...');
});