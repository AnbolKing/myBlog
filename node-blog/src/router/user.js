const {
  login
} = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { set } = require('../db/redis');

const handleUserRouter = (req, res) => {
  const method = req.method;

  // 登陆
  if(method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body;
    // const { username, password } = req.query
    const result = login(username, password);
    return result.then(data => {
      if(data.username) {
        // 设置 session
        req.session.username = data.username;
        req.session.realname = data.realname;
        // 同步 redis
        set(req.sessionId, req.session);
        return new SuccessModel('登陆成功');
      }
      else {
        return new ErrorModel('登陆失败')
      }
    })
  }
  
  // 登陆验证
  if(method === 'GET' && req.path === '/api/user/login-test') {
    console.log('req.session is ', req.session);
    if(req.session.username) {
      return Promise.resolve(new SuccessModel({
        session: req.session
      }));
    }
    return Promise.resolve(new ErrorModel('尚未登陆'))
  }
}

module.exports = handleUserRouter