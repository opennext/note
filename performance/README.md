Chrome DevTools  
https://developers.google.com/web/tools/chrome-devtools

JavaScript性能优化  
https://www.cnblogs.com/developersupport/p/JavaScript-Performance.html 


前端性能优化相关  
https://github.com/wy-ei/notebook/issues/34

避免强制性同步布局 - 分离读和写
将写操作放在 requestAnimationFrame 中

```javascript
var widthArray = [];
for(var i = 0,len = divs.length; i<len; i++){
    var width = divs[i].clientWidth;
    widthArray.push(width);
}
for(let i = 0,len = divs.length; i<len; i++){
    let width = divs[i].clientWidth;
    requestAnimationFrame(()=>{
        divs[i].style.height = width + 'px';
    })
}
```

https://github.com/Findow-team/Blog/issues/11

https://blog.thankbabe.com/2017/07/05/fore-end-optimize/

