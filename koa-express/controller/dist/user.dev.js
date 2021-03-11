"use strict";

var _require = require('../db/mysql'),
    exec = _require.exec,
    escape = _require.escape;

var _require2 = require('../utils/cryp'),
    genPassword = _require2.genPassword;

var login = function login(username, password) {
  var sql, rows;
  return regeneratorRuntime.async(function login$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          username = escape(username); // password = genPassword(password);

          password = escape(password);
          sql = "\n    select username, realname from users where username=".concat(username, " and password=").concat(password, "\n  ");
          _context.next = 5;
          return regeneratorRuntime.awrap(exec(sql));

        case 5:
          rows = _context.sent;
          return _context.abrupt("return", rows[0] || {});

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  login: login
};