## CommonJS
January 2009  
http://www.commonjs.org/  
官方JavaScript标准定义的API是为了构建基于浏览器的应用程序。然而，并没有定于一个用于更广泛(非浏览器)的应用程序的标准库。

CommonJS API定义很多普通应用程序（主要指非浏览器的应用）使用的API，从而填补了这个空白。它的终极目标是提供一个类似Python，Ruby和Java标准库。这样的话，开发者可以使用CommonJS API编写应用程序，然后这些应用可以运行在不同的JavaScript解释器和不同的主机环境中。在兼容CommonJS的系统中，你可以实用JavaScript程序开发：

 - 服务器端JavaScript应用程序
 - 命令行工具
 - 图形界面应用程序
 - 混合应用程序（如Titanium或Adobe AIR）

 CommonJS有很多实现，其中不乏很多大名鼎鼎的项目，比如 说：Apache的CouchDB和node等。但这些项目大部分只实现了CommonJS的部分规范。Node应用由模块组成，采用 CommonJS 模块规范。

## AMD
Asynchronous Module Definition  
https://github.com/amdjs/amdjs-api/wiki/AMD-(%E4%B8%AD%E6%96%87%E7%89%88)

主要贡献者:https://github.com/jrburke  
实现：主要有两个Javascript库实现了AMD规范：require.js和curl.js。

AMD是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。CommonJS规范不适用于浏览器环境，即使通过Browserify转化为浏览器可以运行的模块，还存在一个问题，就是CommonJS是同步加载的，会在浏览器端造成堵塞。AMD采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。
AMD也采用require()语句加载模块，但是不同于CommonJS，它要求两个参数：
```
require([module], callback);
```
AMD可以作为CommonJS模块一个中转的版本只要CommonJS没有被用来同步的require调用。使用同步require调用的CommonJS代码可以被转换为使用回调风格的AMD模块加载器。

> require.js  
>2010 http://requirejs.org  
>作者：https://github.com/jrburke  
>RequireJS implements the Asynchronous Module Definition (formerly Transport/C) proposal.
>CommonJS模块格式的模块，可以使用RequireJS很容易地将它们转换。并不是所有的模块都能转化。
> - 实现js文件的异步加载，避免网页失去响应；
> - 管理模块之间的依赖性，便于代码的编写和维护。  

## CMD
与AMD相近
实现：seajs http://seajs.org/ 

## UMD (Universal Module Definition) 
https://github.com/umdjs/umd
patterns for JavaScript modules that work everywhere.
UMD使用AMD作为基础，并为兼容ComnmonJS做了一些特殊case的处理。那就先判断是否支持node模块，支持就用node模块方式加载，再判断是否支持AMD（define是否存在），存在则使用AMD的方式加载。


## ES6
ES6 在语言标准的层面上，实现了模块功能而且实现得相当简单，完全可以取代CommonJS和AMD规范，成为浏览器和服务器通用的模块解决方案。

## TODO
 - CommonJS、AMD、CMD、UMD spec差异
 - Node NPM
 - requirejs
 - ES6 Module
 - Browserify / browser-unpack

附录:

http://www.cnblogs.com/fullhouse/archive/2011/07/15/2107416.html
http://www.cnblogs.com/chenguangliang/p/5856701.html
http://www.cnblogs.com/humin/p/5389901.html