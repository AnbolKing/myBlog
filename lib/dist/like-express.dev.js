"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var http = require('http');

var slice = Array.prototype.slice;

var LikeExpress =
/*#__PURE__*/
function () {
  function LikeExpress() {
    _classCallCheck(this, LikeExpress);

    // 存放中间件列表
    this.routes = {
      all: [],
      get: [],
      post: []
    };
  }

  _createClass(LikeExpress, [{
    key: "register",
    value: function register(path) {
      var info = {};

      if (typeof path === 'string') {
        info.path = path; // 从第二个参数开始，转换为数组，存入stack

        info.stack = slice.call(arguments, 1);
      } else {
        info.path = '/'; // 从第一个参数开始，转换为数组，存入stack

        info.stack = slice.call(arguments, 0);
      }

      return info;
    }
  }, {
    key: "use",
    value: function use() {
      var info = this.register.apply(this, arguments);
      this.routes.all.push(info);
    }
  }, {
    key: "get",
    value: function get() {
      var info = this.register.apply(this, arguments);
      this.routes.get.push(info);
    }
  }, {
    key: "post",
    value: function post() {
      var info = this.register.apply(this, arguments);
      this.routes.post.push(info);
    }
  }, {
    key: "match",
    value: function match(method, url) {
      var stack = [];

      if (url === '/favicon.ico') {
        return;
      } // 获取route


      var curRoutes = [];
      curRoutes = curRoutes.concat(this.routes.all);
      curRoutes = curRoutes.concat(this.routes[method]);
      curRoutes.forEach(function (routeInfo) {
        if (url.indexOf(routeInfo.path) === 0) {
          stack = stack.concat(routeInfo.stack);
        }
      });
      return stack;
    } // 核心next机制

  }, {
    key: "handle",
    value: function handle(req, res, stack) {
      var next = function next() {
        // 拿到第一个匹配的中间件
        var middleware = stack.shift();

        if (middleware) {
          // 执行中间件函数
          middleware(req, res, next);
        }
      };

      next();
    }
  }, {
    key: "callback",
    value: function callback() {
      var _this = this;

      return function (req, res) {
        res.json = function (data) {
          res.setHeader('Content-type', 'application/json');
          res.end(JSON.stringify(data));
        };

        var url = req.url;
        var method = req.method.toLowerCase();

        var resultList = _this.match(method, url);

        _this.handle(req, res, resultList);
      };
    }
  }, {
    key: "listen",
    value: function listen() {
      var server = http.createServer(this.callback());
      server.listen.apply(server, arguments);
    }
  }]);

  return LikeExpress;
}(); // 工厂函数


module.exports = function () {
  return new LikeExpress();
};