### Function.prototype.apply()
apply() 方法调用一个函数, 其具有一个指定的this值，以及作为一个数组（或类似数组的对象）提供的参数。  
```
fun.apply(thisArg, [argsArray])
```
#### 参数

 - thisArg
在 fun 函数运行时指定的 this 值。需要注意的是，指定的 this 值并不一定是该函数执行时真正的 this 值，如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动指向全局对象（浏览器中就是window对象），同时值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的自动包装对象。
 - argsArray
一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 fun 函数。如果该参数的值为null 或 undefined，则表示不需要传入任何参数。从ECMAScript 5 开始可以使用类数组对象。浏览器兼容性请参阅本文底部内容。
 
#### 描述

在调用一个存在的函数时，你可以为其指定一个 this 对象。 this 指当前对象，也就是正在调用这个函数的对象。 使用 apply， 你可以只写一次这个方法然后在另一个对象中继承它，而不用在新对象中重复写该方法。  

apply 与 call() 非常相似，不同之处在于提供参数的方式。apply 使用参数数组而不是一组参数列表（原文：a named set of parameters）。apply 可以使用数组字面量（array literal），如 fun.apply(this, ['eat', 'bananas'])，或数组对象， 如  fun.apply(this, new Array('eat', 'bananas'))。  

你也可以使用 arguments  对象作为 argsArray 参数。 arguments 是一个函数的局部变量。 它可以被用作被调用对象的所有未指定的参数。 这样，你在使用apply函数的时候就不需要知道被调用对象的所有参数。 你可以使用arguments来把所有的参数传递给被调用对象。 被调用对象接下来就负责处理这些参数。  

从 ECMAScript 第5版开始，可以使用任何种类的类数组对象，就是说只要有一个 length 属性和[0...length) 范围的整数属性。例如现在可以使用 NodeList 或一个自己定义的类似 {'length': 2, '0': 'eat', '1': 'bananas'} 形式的对象。  

需要注意：Chrome 14 以及 Internet Explorer 9 仍然不接受类数组对象。如果传入类数组对象，它们会抛出异常。  

#### 示例
 - 使用apply来链接构造器
你可以使用apply来给一个对象链接构造器，类似于Java. 在接下来的例子中我们会创建一个叫做construct的全局的Function函数,来使你能够在构造器中使用一个类数组对象而非参数列表。  
```
Function.prototype.construct = function (aArgs) {
  var oNew = Object.create(this.prototype);
  this.apply(oNew, aArgs);
  return oNew;
};
```
 - 使用apply和内置函数
 聪明的apply用法允许你在某些本来需要写成遍历数组变量的任务中使用内建的函数。在接下里的例子中我们会使用Math.max/Math.min来找出一个数组中的最大/最小值。
```
/* min/max number in an array */
var numbers = [5, 6, 2, 3, 7];

/* using Math.min/Math.max apply */
var max = Math.max.apply(null, numbers); /* This about equal to Math.max(numbers[0], ...) or Math.max(5, 6, ..) */
var min = Math.min.apply(null, numbers);

/* vs. simple loop based algorithm */
max = -Infinity, min = +Infinity;

for (var i = 0; i < numbers.length; i++) {
  if (numbers[i] > max)
    max = numbers[i];
  if (numbers[i] < min) 
    min = numbers[i];
}
```
但是当心：如果用上面的方式调用 apply, 你很可能会遇到方法参数个数越界的问题. 当你对一个方法传入非常多的参数 (比如超过1W多个参数) 时, 就非常有可能会导致越界问题, 这个临界值是根据不同的 JavaScript 引擎而定的 (JavaScript 核心中已经做了硬编码  参数个数限制在65536)，因为这个限制(实际上也是任何用到超大栈空间的行为的自然表现)是未指定的. 有些引擎会抛出异常.  更糟糕的是其他引擎会直接限制传入到方法的参数个数，导致参数丢失. (举个例子: 如果某个引擎限制了方法参数最多为4个 [实际真正的参数个数限制当然要高得多了, 这里只是打个比方], 上面的代码中, 真正通过 apply 传到目标方法中的参数为 5, 6, 2, 3, 而不是完整的 numbers 数组.) 如果你的参数数组可能非常大, 那么推荐使用下面这种策略来处理: 将参数数组切块后循环传入目标方法:
```
function minOfArray(arr) {
  var min = Infinity;
  var QUANTUM = 32768;

  for (var i = 0, len = arr.length; i < len; i += QUANTUM) {
    var submin = Math.min.apply(null, arr.slice(i, Math.min(i + QUANTUM, len)));
    min = Math.min(submin, min);
  }

  return min;
}

var min = minOfArray([5, 6, 2, 3, 7]);
```
#### 在"monkey-patching"中使用apply
Apply可以作为monkey-patch一个Firefox或JS库内建函数的最好方式。对于someobject.foo 函数，你可以用一种旁门左道的方式来修改这个函数，像这样：
```
var originalfoo = someobject.foo;
someobject.foo = function() {
  //在调用函数前干些什么
  console.log(arguments);
  //像正常调用这个函数一样来进行调用：
  originalfoo.apply(this,arguments);
  //在这里做一些调用之后的事情。
}
```    
这种方法在你想要debug事件，或者与一些没有API的东西配合，例如多种 .on([event]... events, 比如那些在Devtools Inspector中可用的).

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply