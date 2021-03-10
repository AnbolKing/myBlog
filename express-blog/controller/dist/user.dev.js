"use strict";

var _require = require('../db/mysql'),
    exec = _require.exec,
    escape = _require.escape;

var _require2 = require('../utils/cryp'),
    genPassword = _require2.genPassword;

var login = function login(username, password) {
  username = escape(username); // password = genPassword(password);

  password = escape(password);
  var sql = "\n    select username, realname from users where username=".concat(username, " and password=").concat(password, "\n  ");
  return exec(sql).then(function (rows) {
    return rows[0] || {};
  });
};

module.exports = {
  login: login
};