"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controller/user'),
    login = _require.login;

var _require2 = require('../model/resModel'),
    SuccessModel = _require2.SuccessModel,
    ErrorModel = _require2.ErrorModel;
/* GET users listing. */


router.post('/login', function (req, res, next) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password; // const { username, password } = req.query

  var result = login(username, password);
  return result.then(function (data) {
    if (data.username) {
      // 设置 session
      req.session.username = data.username;
      req.session.realname = data.realname;
      res.json(new SuccessModel('登陆成功'));
      return;
    } else {
      res.json(new ErrorModel('登陆失败'));
    }
  });
});
router.get('/login-test', function (req, res, next) {
  if (req.session.username) {
    res.json({
      errno: 0,
      msg: '测试成功'
    });
    return;
  }

  res.json({
    errno: 1,
    msg: '未登录'
  });
});
module.exports = router;