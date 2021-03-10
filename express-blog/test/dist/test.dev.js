"use strict";

var promise = new Promise(function (resolve, reject) {
  resolve('AnbolKing');
});

var test1 = function test1() {
  return promise.then(function (name) {
    if (name === 'AnbolKing') {
      return '123';
    }
  });
};

var test2 = function test2() {
  console.log(test1()); // test1().then(str => {
  //   console.log(str);
  // })
};

test2();