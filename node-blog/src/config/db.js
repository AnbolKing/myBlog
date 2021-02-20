// 获取环境参数
const env = process.env.NODE_ENV

// 配置mysql
let MYSQL_CONF
let REDIS_CONF

if(env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'wzazawestlife928',
    port: '3306',
    database: 'myBlog'
  }

  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

if(env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'wzazawestlife928',
    port: '3306',
    database: 'myBlog'
  }
  
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}