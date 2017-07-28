


## JavaScript中的prototype

  JS中有很多概念，有一些需要经过一段时间的学习理解、实践、悟、记忆或回忆才能真正理解。笔者准备把常用的概念进行梳理，供记忆或回忆。
今天就从object和prototype说起：

  The constructor’s 'prototype' property can be referenced by the program expression constructor.prototype, and properties added to an object’s prototype are shared, through inheritance, by all objects sharing the prototype. http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.3
翻译：prototype是constructor的属性。prototype被表达式constructor.prototype引用。添加到prototype的属性可以通过inheritance进行共享。

### 一、object
  ECMAScript是一个高度抽象的面向对象语言，基于对象进行处理。ECMAScript有基本数据类型，但是需要的时候也会转成对象。
  一个object拥有一个独立的prototype。我们来看一个小例子：
```
var foo = {
  x: 10,
  y: 20
}
```

  两个自身属性和一个隐含的__proto__属性，这个属性是对foo原型对象的引用：
  http://dmitrysoshnikov.com/wp-content/uploads/basic-object.png 

  下面来介绍一下prototype chain，来了解prototype的作用和__proto__的关系。

### 二、prototype chain
  prototype也是简单的对象，也有自己的prototype。如果一个每prototype都有一个非null的引用，那么就形成了chain。
  在像Java、cpp这样的语言中，重用对象的属性和方法，一般使用类继承的方式。在ES中没有类的概念，为了实现“继承”，可以通过原型链来实现，这种方式叫做委托继承delegation based inheritance，或则叫做原型继承(prototype based inheritance)

  举个例子：
  对象a中存储公共属性和方法。b和c只存储它们自身的属性方法。
```
var a = {
  x: 10,
  calculate: function (z) {
    return this.x + this.y + z;
  }
};
 
var b = {
  y: 20,
  __proto__: a
};
 
var c = {
  y: 30,
  __proto__: a
};
 
// call the inherited method
b.calculate(30); // 60
c.calculate(40); // 80
```
  我们看到b和c访问到了在对象a中定义的calculate方法。这是通过原型链实现的。
  如果一个属性或者一个方法在对象中无法找到，然后它会尝试在原型链中寻找这个属性/方法。
  如果这个属性在原型中没有查找到，那么将会查找这个原型的原型，以此类推。
  第一个被查找到的同名属性/方法会被使用。
  如果在遍历了整个原型链之后还是没有查找到这个属性的话，返回undefined值。

  已复用方法中所使用的this的值被设置为当前对象，而并不是某一个“原型”对象。
  如例子中this.y取的是b和c中的值，而不是a中的值。但是，this.x是取值是通过原型链找到的a中的值。
  对象的__proto__的默认值是Object.prototype。Object.prototype的__proto__属性值为null。
  a，b，c之间的继承层级：
  http://dmitrysoshnikov.com/wp-content/uploads/prototype-chain.png

  ES5 提供了一种标准的prototype-based inheritance借口，即Object.create:
```
var b = Object.create(a, {y: {value: 20}});
var c = Object.create(a, {y: {value: 30}});
```

  通常情况下需要使用构造函数(constructor)来创造对象。
  后面文字中继续来回忆constructor。

  （主要内容引自 http://dmitrysoshnikov.com/ecmascript/javascript-the-core/）
