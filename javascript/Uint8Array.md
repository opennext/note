
# Uint8Array   
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array 


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
