const router = require('koa-router')()
const { 
  getList, 
  getDetail, 
  newBlog,
  updateBlog,
  deleteBlog,
} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');

router.prefix('/api/blog');

router.get('/list', async (ctx, next) => {
  let author = ctx.query.author || '';
  const keyword = ctx.query.keyword || '';  
  if(ctx.query.isadmin) {
    if(ctx.session.username == null) {
      ctx.body(
        new ErrorModel('未登录')
      )
      return ;
    }
    author = ctx.session.username;
  }

  const listData = await getList(author, keyword);
  ctx.body = new SuccessModel(listData)
  const result = await getList(author, keyword);
})

router.get('/detail', async (ctx, next) => {
  const data = await getDetail(ctx.query.id);
  ctx.body = new SuccessModel(data)
})

router.post('/new', loginCheck, async(ctx, next) => {
  const body = ctx.request.body.author;
  body.author = ctx.session.username;
  const data = await newBlog(body);
  ctx.body =  new SuccessModel(data);
})

router.post('/update', loginCheck, async(ctx, next) => {
  const val = await updateBlog(id, req.body);
  if(val) {
    ctx.body = new SuccessModel(val);
  }
  else {
    ctx.body = new ErrorModel(val);
  }
})

router.post('/del', loginCheck, async(ctx, next) => {
  const author = ctx.session.username
  const val = await deleteBlog(id, author);
  if(val) {
    ctx.body = new SuccessModel();
  }
  else {
    ctx.body = new ErrorModel('删除博客失败')
  }
})

module.exports = router
