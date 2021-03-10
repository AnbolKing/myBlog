const promise = new Promise((resolve, reject) => {
  resolve('AnbolKing');
})

const test1 = () => {
  return promise.then(name => {
    if(name === 'AnbolKing') {
      return '123';
    }
  })
}

const test2 = () => {
  console.log(test1());
  // test1().then(str => {
  //   console.log(str);
  // })
}

test2();