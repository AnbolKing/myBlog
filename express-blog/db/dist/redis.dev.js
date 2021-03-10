"use strict";

var redis = require('redis');

var _require = require('../config/db'),
    REDIS_CONF = _require.REDIS_CONF;

var redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on('error', function (err) {
  console.log(err);
}); // function set(key, val) {
//   if(typeof val === 'object') {
//     val = JSON.stringify(val);
//   }
//   redisClient.set(key, val);
// }
// function get(key) {
//   const promise = new Promise((resolve, reject) => {
//     redisClient.get(key, (err, val) => {
//       if(err) {
//         reject(err);
//         return ;
//       }
//       if(val === null) {
//         resolve(null);
//         return ;
//       }
//       try {
//         resolve(
//           JSON.parse(val)
//         )
//       }
//       catch(ex) {
//         resolve(val)
//       }
//     })
//   })
//   return promise;
// }

module.exports = redisClient;