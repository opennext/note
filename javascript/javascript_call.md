Function的属性:
- Function.arguments(已废弃)
- Function.arity(已废弃)
- Function.caller
- Function.displayName(非标准)
- Function.length
- Function.name
- Function.prototype

Function的方法：
- Function.prototype.apply()
- Function.prototype.bind()
- Function.prototype.call()
- Function.prototype.isGenerator()(非标准)
- Function.prototype.toSource()
- Function.prototype.toString()

本文将介绍call的用法
### Function.prototype.call()
call() 方法调用一个函数, 其具有一个指定的this值和分别地提供的参数(参数的列表)。  
在特定的作用域中调用函数,能改变函数的作用域，实际上是改变函数体内 this 的值 。
该方法的作用和 apply() 方法类似，只有一个区别，就是call()方法接受的是若干个参数的列表，而apply()方法接受的是一个包含多个参数的数组。
```
fun.call(thisArg, arg1, arg2, ...)
```
#### 参数

 - thisArg
在fun函数运行时指定的this值。需要注意的是，指定的this值并不一定是该函数执行时真正的this值，如果这个函数处于非严格模式下，则指定为null和undefined的this值会自动指向全局对象(浏览器中就是window对象)，同时值为原始值(数字，字符串，布尔值)的this会指向该原始值的自动包装对象。

 - arg1, arg2, ...
    指定的参数列表。

#### 返回值
返回结果包括指定的this值和参数。

#### 描述
可以让call()中的对象调用当前对象所拥有的function。你可以使用call()来实现继承：写一个方法，然后让另外一个新的对象来继承它（而不是在新对象中再写一次这个方法）。

#### 示例
 - 使用call方法调用函数并且指定上下文的'this'  
在下面的例子中，当调用 greet 方法的时候，该方法的 this 值会绑定到 i 对象。
```
function greet() {
  var reply = [this.person, 'Is An Awesome', this.role].join(' ');
  console.log(reply);
}

var i = {
  person: 'Douglas Crockford', role: 'Javascript Developer'
};

greet.call(i); // Douglas Crockford Is An Awesome Javascript Developer
```

 - 使用call方法调用匿名函数  
在下例中的for循环体内，我们创建了一个匿名函数，然后通过调用该函数的call方法，将每个数组元素作为指定的this值执行了那个匿名函数。这个匿名函数的主要目的是给每个数组元素对象添加一个print方法，这个print方法可以打印出各元素在数组中的正确索引号。当然，这里不是必须得让数组元素作为this值传入那个匿名函数（普通参数就可以），目的是为了演示call的用法。
```
var animals = [
  {species: 'Lion', name: 'King'},
  {species: 'Whale', name: 'Fail'}
];

for (var i = 0; i < animals.length; i++) {
  (function (i) { 
    this.print = function () { 
      console.log('#' + i  + ' ' + this.species + ': ' + this.name); 
    } 
    this.print();
  }).call(animals[i], i);
}
```
#### 使用call方法调用父构造函数  
在一个子构造函数中，你可以通过调用父构造函数的 call 方法来实现继承，类似于Java中的写法。下例中，使用 Food 和 Toy 构造函数创建的对象实例都会拥有在 Product 构造函数中添加的 name 属性和 price 属性,但 category 属性是在各自的构造函数中定义的。
```
function Product(name, price) {
  this.name = name;
  this.price = price;

  if (price < 0) {
    throw RangeError('Cannot create product ' +
                      this.name + ' with a negative price');
  }
}

function Food(name, price) {
  Product.call(this, name, price); 
  this.category = 'food';
}

//等同于
function Food(name, price) { 
    this.name = name;
    this.price = price;
    if (price < 0) {
        throw RangeError('Cannot create product ' +
                this.name + ' with a negative price');
    }

    this.category = 'food'; 
}

//function Toy 同上
function Toy(name, price) {
  Product.call(this, name, price);
  this.category = 'toy';
}

var cheese = new Food('feta', 5);
var fun = new Toy('robot', 40);
```


https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call