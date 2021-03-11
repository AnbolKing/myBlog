const router = require('koa-router')()
const {
  login
} = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

router.prefix('/api/users')

router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body;
  // const { username, password } = req.query
  const data = login(username, password);
  if(data.username) {
    // 设置 session
    ctx.session.username = data.username;
    ctx.session.realname = data.realname;
    ctx.body = new SuccessModel('登陆成功')
    return ;
  }
  else {
    ctx.body = new ErrorModel('登陆失败')
  }
})

router.get('/session-test', async function(ctx, next) {
  if(ctx.session.viewCount == null) {
    console.log(ctx.session);
    ctx.session.viewCount = 0;
  }
  ctx.session.viewCount++;
  ctx.body = {
    errno: 0,
    viewCount: ctx.session.viewCount,
  }
})

module.exports = router
