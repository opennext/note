export  
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export

## 语法
```javascript
export { name1, name2, ..., nameN };
export {variable1 as name1, variable2 as name2, ..., nameN};
export let name1, name2, ..., nameN; // also var
export let name1 = ..., name2 = ..., ..., nameN; // also var, const

export default expression;
export default function (...){...} // also class, function*
export default function name1(...){...};// also class, function*
export { name1 as default, ...};

export * from ...;
export { name1, name2, ..., nameN } from ...;
export { import1 as name1, import2 as name2, ..., nameN } from ...;
```

## 描述
- 命名导出
```
export { myFunction }; // exports a function 
//exports a constant
export const foo = Math.sqr(2);
```
- 默认导出
export default function(){}  
export default class {}  
命名导出对导出多个值很有用，在导入期间，必须使用相应对象的相同名称。  
但是，可以使用任何名称导入默认导出，例如：  
```javascript
export default k = 12; // in file test.js

import m from './test' // we got the freedom to use m instead of import k, because k was default export

console.log(m); // 12
```
只能有一个默认的导出。
以下语法不会导出已导入模块中的默认导出：
export * from ...;
如果需要导出默认值，应：
import mod from 'mod'  
export default mod  

## 示例
- 使用命名导出
```javascript
// module 'my-module.js'
function cube(x){
  return x ** 3 ;
}
const foo = Math.PI + Math.SQRT2;
export { cube, foo };
// 其他脚本中使用
import { cube, foo } from 'my-module.js';
console.log(cube(3));
console.log(foo)
```


