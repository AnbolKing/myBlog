const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const { set, get } = require('./src/db/redis.js')
const { access } = require('./src/utils/log');

// session 数据
// const SESSION_DATA = {}

const getCookieExpires = () => {
  const d = new Date();
  d.setTime*(d.getTime() + (24*60*60*1000));
  return d.toUTCString();
}

const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if(req.method !== 'POST') {
      resolve({});
      return ;
    }
    if(req.headers['content-type'] !== 'application/json') {
      resolve({});
      return ;
    }
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    })
    req.on('end', () => {
      if(!postData) {
        resolve({});
        return ;
      }
      resolve(JSON.parse(postData));
    })
  });
  return promise;
}

const serverHandle = (req, res) => {
  // 记录log
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}\n`)
  // 设置头部
  res.setHeader('Content-type', 'application/json');
  // 获取路由
  const url = req.url;
  req.path = url.split('?')[0];
  //解析query
  req.query = querystring.parse(url.split('?')[1]);
  // 获取cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || '';
  cookieStr.split(';').forEach(item => {
    if(!item) {
      return ;
    }
    const arr = item.split('=');
    const key = arr[0].trim();
    const value = arr[1].trim();
    req.cookie[key] = value;
  })
  // 解析 session
  // let needSetCookie = false;
  // let userId = req.cookie.userid;
  // if(userId) {
  //   if(!SESSION_DATA[userId]) {
  //     SESSION_DATA[userId] = {};
  //   }
  // }
  // else {
  //   needSetCookie = true;
  //   userId = `${Date.now()}_${Math.random()}`
  //   SESSION_DATA[userId] = {};
  // }
  // console.log('SESSION_DATA is', SESSION_DATA);
  // req.session = SESSION_DATA[userId]
  let userId = req.cookie.userid;
  let needSetCookie = false;
  if (!userId) {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    set(userId, {})
    console.log('进来了')
  }
  req.sessionId = userId
  get(req.sessionId).then(sessionData => {
    if (sessionData == null) {
        // 设置redis的session
        set(req.sessionId, {})
        // 设置session
        req.session = {}
    } else {
      req.session = sessionData
    }
    // 处理 post 数据
    return getPostData(req)
  }).then(postData => {
    req.body = postData;
    // 处理blog路由
    const blogResult = handleBlogRouter(req, res);
    if(blogResult) {
      blogResult.then(blogData => {
        if(needSetCookie) {
          res.setHeader('Set-Cookie',`userid=${userID}; path=/; httpOnly; expire=${getCookieExpires()}`)
        }
        res.end(JSON.stringify(blogData));
      })
      return ;
    }
    // 处理user路由
    const userResult = handleUserRouter(req, res);
    if(userResult) {
      userResult.then(userData => {
        if(needSetCookie) {
          res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expire=${getCookieExpires()}`)
        }
        res.end(JSON.stringify(userData))
      })
      return ;
    }
    // 未命中路由
    res.writeHead(404, {'Content-type': 'text/plain'});
    res.write('404 Not Found\n');
    res.end();
  })
}

module.exports = serverHandle