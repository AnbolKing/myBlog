"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controller/blog'),
    getList = _require.getList,
    getDetail = _require.getDetail,
    newBlog = _require.newBlog,
    updateBlog = _require.updateBlog,
    deleteBlog = _require.deleteBlog;

var _require2 = require('../model/resModel'),
    SuccessModel = _require2.SuccessModel,
    ErrorModel = _require2.ErrorModel;

var loginCheck = require('../middleware/loginCheck');

router.get('/list', function (req, res) {
  var author = req.query.author || '';
  var keyword = req.query.keyword || '';

  if (req.query.isadmin) {
    if (req.session.username == null) {
      res.json(new ErrorModel('未登录'));
      return;
    }
  }

  var result = getList(author, keyword);
  return result.then(function (listData) {
    res.json(new SuccessModel(listData));
  });
});
router.get('/detail', function (req, res) {
  var result = getDetail(req.query.id);
  return result.then(function (data) {
    res.json(new SuccessModel(data));
  });
});
router.post('/new', loginCheck, function (req, res, next) {
  req.body.author = req.session.username;
  var result = newBlog(req.body);
  return result.then(function (data) {
    return new SuccessModel(data);
  });
});
router.post('/update', loginCheck, function (req, res, next) {
  var result = updateBlog(id, req.body);
  return result.then(function (val) {
    if (val) {
      res.json(new SuccessModel(val));
    } else {
      res.json(new ErrorModel(val));
    }
  });
});
router.post('/del', loginCheck, function (req, res, next) {
  var author = req.session.username;
  var result = deleteBlog(id, author);
  return result.then(function (val) {
    if (val) {
      res.json(new SuccessModel());
    } else {
      res.json(new ErrorModel('删除博客失败'));
    }
  });
});
module.exports = router;