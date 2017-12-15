>Service workers:
>1. 本质上充当Web应用程序与浏览器之间的代理服务器  
>2. 在网络可用时作为浏览器和网络间的代理
>3. 旨在（除其他之外）使得能够创建有效的离线体验，拦截网络请求并基于网络是否可用以及更新的资源是否驻留在服务器上来采取适当的动作
>4. 允许访问推送通知和后台同步API

## 概念和用法
- 一个注册在指定源和路径下的事件驱动worker  
- 采用JavaScript控制关联的页面或者网站，拦截并修改访问和资源请求，细粒度地缓存资源  
- 可以完全控制应用在特定情形（最常见的情形是网络不可用）下的表现

Service worker运行在worker上下文，因此它不能访问DOM。相对于驱动应用的主JavaScript线程，它运行在其他线程中，所以不会造成阻塞。它设计为完全异步，同步API（如XHR和localStorage）不能在service worker中使用。

>Service workers只能由HTTPS承载  
Service workers大量使用Promise

##  ServiceWorkerContainer.register()
ServiceWorkerContainer.register()首次注册service worker。如果注册成功，service worker就会被下载到客户端并尝试安装或激活（见下文），这将作用于整个域内用户可访问的URL，或者其特定子集。

## 下载、安装和激活
你的服务工作者(service worker)将遵守以下生命周期：`下载` `安装` `激活`

用户首次访问service worker控制的网站或页面时，service worker会立刻被下载。

之后至少每24小时它会被下载一次。它*可能*被更频繁地下载，不过每24小时一定会被下载一次，以避免不良脚本长时间生效。

无论它与现有service worker不同（字节对比），还是第一次在页面或网站遇到service worker，如果下载的文件是新的，`安装`就会尝试进行。

如果这是首次启用service worker，页面会首先尝试`安装`，安装成功后它会被`激活`。

如果现有`service worker`已启用，新版本会在后台安装，但不会被激活，这个时序称为`worker in waiting`。  
直到所有已加载的页面不再使用旧的service worker才会激活新的service worker。  
只要页面不再依赖旧的service worker，新的service worker会被激活（成为`active worker`）。

可以监听`InstallEvent`，事件触发时的标准行为是准备service worker用于使用，例如使用内建的storage API来创建缓存，并且放置应用离线时所需资源。

`activate`事件，触发时可以清理旧缓存和旧的service worker关联的东西。

Servcie worker可以通过 `FetchEvent` 事件去响应请求。通过使用 `FetchEvent.respondWith` 方法，你可以任意修改对于这些请求的响应。

>注意: 因为oninstall和onactivate完成前需要一些时间，service worker标准提供一个waitUntil方法，当oninstall或者onactivate触发时被调用，接受一个promise。在这个 promise被成功resolve以前，功能性事件不会分发到service worker。

## Service workers也可以用来做这些事情：

1. 后台数据同步
2. 响应来自其它源的资源请求
3. 集中接收计算成本高的数据更新，比如地理位置和陀螺仪信息，这样多个页面就可以利用同一组数据
3. 在客户端进行CoffeeScript，LESS，CJS/AMD等模块编译和依赖管理（用于开发目的）
4. 后台服务钩子
5. 自定义模板用于特定URL模式
5. 性能增强，比如预取用户可能需要的资源，比如相册中的后面数张图片  

未来service workers能够用来做更多使web平台接近原生应用的事。 值得关注的是，其他标准也能并且将会使用service worker，例如:

1. 后台同步：启动一个service worker即使没有用户访问特定站点，也可以更新缓存
2. 响应推送：启动一个service worker向用户发送一条信息通知新的内容可用
3. 对时间或日期作出响应
4. 进入地理栅栏
