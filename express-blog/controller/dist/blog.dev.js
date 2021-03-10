"use strict";

var _require = require('../db/mysql'),
    exec = _require.exec;

var xss = require('xss');

var getList = function getList(author, keyword) {
  var sql = "select * from blogs where 1=1 ";

  if (author) {
    sql += "and author='".concat(author, "' ");
  }

  if (keyword) {
    sql += "and title like '%".concat(keyword, "%' ");
  }

  sql += "order by createtime desc;";
  return exec(sql);
};

var getDetail = function getDetail(id) {
  var sql = "select * from blogs where id='".concat(id, "'");
  return exec(sql).then(function (rows) {
    return rows[0];
  });
};

var newBlog = function newBlog() {
  var blogData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var title = xss(blogData.title);
  var content = blogData.content;
  var author = blogData.author;
  var createtime = Date.now();
  var sql = "\n    insert into blogs (title, content, createtime, author)\n    values('".concat(title, "', '").concat(content, "', '").concat(createtime, "', '").concat(author, "');\n  ");
  return exec(sql).then(function (insertData) {
    return {
      id: insertData.insertId
    };
  });
};

var updateBlog = function updateBlog(id) {
  var blogData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var title = blogData.title;
  var content = blogData.content;
  var sql = "\n    update blogs set title='".concat(title, "', content='").concat(content, "' where id=").concat(id, "\n  ");
  return exec(sql).then(function (updateData) {
    if (updateData.affectedRows > 0) {
      return true;
    }

    return false;
  });
};

var deleteBlog = function deleteBlog(id, author) {
  var sql = "\n    delete from blogs where id='".concat(id, "' and author='").concat(author, "'\n  ");
  return exec(sql).then(function (deleteData) {
    if (deleteData.affectedRows > 0) {
      return true;
    }

    return false;
  });
};

module.exports = {
  getList: getList,
  getDetail: getDetail,
  newBlog: newBlog,
  updateBlog: updateBlog,
  deleteBlog: deleteBlog
};