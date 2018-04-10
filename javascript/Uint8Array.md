
# Uint8Array   
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array 


Uint8Array 数组类型表示一个8位无符号整型数组，创建时内容被初始化为0。创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素。  
Uint8Array(length);// 创建初始化为0，包含length个元素的无符号整型数组  
Uint8Array(typedArray);  
Uint8Array(object);  
Uint8Array(buffer, [, byteOffset [, length]]);  
- 属性
Uint9Array.BYTES_PER_ELEMENT  
返回数组中元素的字节，Uint8Array中返回1字节。  
Uint8Array.length  
数组的长度  
Uint8Array.name  
返回构造名的字符串，对Uint8Array类型而言返回Uint8Array  
Uint8Array.prototype 
TypedArray 对象的原型.  
- 方法
Uint8Array.from()  
从一个数组或可迭代的对象创建一个新的Uint8Array数组，可参见Array.from().   
Uint8Array.of()  
通过一个可变数目的参数创建一个新的Uint8Array数组，可参见Array.of().  

# TypedArray  
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray

一个TypedArray 对象描述一个底层的二进制数据缓存区的一个类似数组(array-like)视图。事实上，没有名为 TypedArray的全局对象，也没有一个名为的 TypedArray构造函数。相反，有许多不同的全局对象，下面会列出这些针对特定元素类型的类型化数组的构造函数。在下面的页面中，你会找到一些不管什么类型都公用的属性和方法。

```
// create a TypedArray with a size in bytes

const typedArray1 = new Int8Array(8);

typedArray1[0] = 32;


const typedArray2 = new Int8Array(typedArray1);

typedArray2[1] = 42;


console.log(typedArray1);

// expected output: Int8Array [32, 0, 0, 0, 0, 0, 0, 0]


console.log(typedArray2);

// expected output: Int8Array [32, 42, 0, 0, 0, 0, 0, 0]

```
