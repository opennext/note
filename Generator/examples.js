
//###基本概念###

// 1.定义了一个 Generator 函数helloWorldGenerator
//   yield表达式（hello和world）即该函数有三个状态：hello，world 和 return 语句（结束执行）。
function* helloWorldGenerator(){
  yield 'h';
  yield 'w'; 
  return 'ending';
}

// 调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果
// 而是一个指向内部状态的指针对象，也就是上一章介绍的遍历器对象（Iterator Object）
var hw = helloWorldGenerator();

// 调用遍历器对象的next方法，使得指针移向下一个状态
hw.next() //{value: "h", done: false}

hw.next() // {value: "w", done: false}

hw.next() //{value: "ending", done: true}

hw.next() //{value: undefined, done: true}


// 2. 
function* gen() {
  yield  123 + 456;//“惰性求值”（Lazy Evaluation）
}

// 3.Generator 函数可以不用yield表达式，这时就变成了一个单纯的暂缓执行函数
function* f(){
  console.log('did ...')
}

var generator = f()

setTimeout(() => {
  generator.next()
}, 1000)

// 4.yield表达式如果用在另一个表达式之中，必须放在圆括号里面。
function* demo() {
  console.log('Hello' + yield); // SyntaxError
  console.log('Hello' + yield 123); // SyntaxError

  console.log('Hello' + (yield)); // OK
  console.log('Hello' + (yield 123)); // OK
}

// 5. yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号。
function* demo() {
  foo(yield 'a', yield 'b')
  let input = yield
}

//###与Iterator接口关系###

// 6. 由于 Generator 函数就是遍历器生成函数
//    因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口
var myObject = {}
myObject[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
};

[...myObject]


// Generator 函数执行后，返回一个遍历器对象
// 该对象本身也具有Symbol.iterator属性，执行后返回自身
function* gen(){
  console.log('* gen')
  yield 0;
}

var g = gen();
g[Symbol.iterator]() === g;
[...g]

// ###next 方法的参数###

// 7. yield表达式本身返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。
function* f(){
  for(var i = 0; true; i++){
    var reset = yield i;
    if(reset) {
      i = -1
    }
  }
}

var g = f()

g.next()
g.next()
g.next()
g.next(true)

// 8.
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }

// 9.
function* dataConsumer() {
  console.log('Started');
  console.log(`1. ${yield}`);
  console.log(`2. ${yield}`);
  return 'result';
}

let genObj = dataConsumer();
genObj.next();
// Started
genObj.next('a')
// 1. a
genObj.next('b')
// 2. b


// 10.第一次调用next方法时，就能够输入值，可以在 Generator 函数外面再包一层。
//    Generator 函数如果不用wrapper先包一层，是无法第一次调用next方法，就输入参数的。
function wrapper(generatorFunction) {
  return function (...args) {
    let generatorObject = generatorFunction(...args);
    generatorObject.next(); //（调用一次）
    return generatorObject;
  };
}

const wrapped = wrapper(function* () {
  console.log(`First input: ${yield}`);
  return 'DONE';
});

wrapped().next('hello!')
// First input: hello!