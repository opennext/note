//#1
//Generator 函数，依次读取两个文件
const fs = require('fs')

const readFile = function (fileName){
  return new Promise(function(resolve, reject){
    fs.readFile(fileName, function(error, data){
      if(error){
        return reject(error);
      }
      resolve(data);
    })
  })
}

const gen = function* (){
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
}

// 写成async函数
const asyncReadFile = async function(){
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
}

//async函数对 Generator 函数的改进，体现在以下四点。
//（1）内置执行器。async函数的执行，与普通函数一模一样，只要一行。asyncReadFile();
//（2）更好的语义。
//（3）更广的适用性。
//（4）返回值是 Promise。
//async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖。

//#2 函数前面的async关键字，表明该函数内部有异步操作。调用该函数时，会立即返回一个Promise对象。
async function getStockPriceByName(name){
  const symbol = await getSockSymbol(name);
  const stockPrice = await getStockPrice(symbol);
  return stockPrice;
}

getStockPriceByName('goog').then(function(result){
  console.log(result);
})


//#3 指定多少毫秒后输出一个值
function timeout(ms){
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
}

async function asyncPrint(value, ms){
  await timeout(ms)
  console.log(value)
}

asyncPrint('h w', 1000)

//#4 async 函数有多种使用形式
// 声明函数
async function foo(){}

// 函数表达是
const foo = async function(){}

// 对象的方法
let obj = { async foo(){} };
obj.foo().then(...)

// Class的方法
class Storage{
  constructor(){
    this.cachePromise = caches.open('avatars')
  }

  async getAvatar(name){
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}

const storage = new Storage();
storage.getAvatar('jake').then(...);

// 箭头函数
const foo = async () => {};

//#5 async函数内部return语句返回的值，会成为then方法回调函数的参数
async function f(){
  return 'hello world';
}

f().then(v => console.log(v))
// 'hello world'

//#6 async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。
async function f(){
  throw new Error('error le!');
}

f().then(
  v => console.log(v),
  e => console.log(e)
)

//#7 Promise 对象的状态变化
// async函数内部的异步操作执行完，才会执行then方法指定的回调函数。
async function getTitle(url){
  let response = await fetch(url);
  let html = await response.text();
  return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}

getTitle('http://es6.ruanyifeng.com/#docs/async')

//#8 await命令后面是一个 Promise 对象。如果不是，会被转成一个立即resolve的 Promise 对象。
async function f(){
  return await 123;//await命令的参数是数值123，它被转成 Promise 对象，并立即resolve
}

f().then(v => console.log(v))

//#9 
//await命令后面的 Promise 对象如果变为reject状态
//则reject的参数会被catch方法的回调函数接收到
async function f() {
  await Promise.reject('出错了');
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
// 出错了

//#10
async function f() {
  await Promise.reject('出错了');
  await Promise.resolve('hello world'); // 不会执行
}

//#11 await放在try...catch
async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {
  }
  return await Promise.resolve('hello world'); // 会执行
}

f()
.then(v => console.log(v))
// hello world

//#12 await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误
async function f(){
  await Promise.reject('EEEEEE').catch(e => console.log(e));
  return await Promise.resolve('heool w')
}

f().then(v => console.log(v))

//###错误处理###
//###使用注意点### TODO