"use strict";

var router = require('koa-router')();

var _require = require('../controller/user'),
    login = _require.login;

var _require2 = require('../model/resModel'),
    SuccessModel = _require2.SuccessModel,
    ErrorModel = _require2.ErrorModel;

router.prefix('/api/users');
router.post('/login', function _callee(ctx, next) {
  var _ctx$request$body, username, password, data;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ctx$request$body = ctx.request.body, username = _ctx$request$body.username, password = _ctx$request$body.password; // const { username, password } = req.query

          data = login(username, password);

          if (!data.username) {
            _context.next = 9;
            break;
          }

          // 设置 session
          ctx.session.username = data.username;
          ctx.session.realname = data.realname;
          ctx.body = new SuccessModel('登陆成功');
          return _context.abrupt("return");

        case 9:
          ctx.body = new ErrorModel('登陆失败');

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get('/session-test', function _callee2(ctx, next) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (ctx.session.viewCount == null) {
            console.log(ctx.session);
            ctx.session.viewCount = 0;
          }

          ctx.session.viewCount++;
          ctx.body = {
            errno: 0,
            viewCount: ctx.session.viewCount
          };

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = router;