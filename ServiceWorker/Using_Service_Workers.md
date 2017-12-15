DEMO https://github.com/mdn/sw-test

https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers

## 背景
有一个困扰 web 用户多年的难题——丢失网络连接。而随着离线页面的出现，一些问题已经得到了解决，但仍然没有一个好的统筹机制对资源缓存和自定义的网络请求进行控制。  
之前的尝试 — `AppCache` — 看起来是个不错的方法，因为它可以很容易地指定需要离线缓存的资源。但是，它假定你使用时会遵循诸多规则，如果你不严格遵循这些规则，它会把你的APP搞得一团糟。


## 使用前的设置
`Firefox Nightly`: 访问 about:config 并设置 dom.serviceWorkers.enabled 的值为 true; 重启浏览器；  
`Chrome Canary`: 访问 chrome://flags 并开启 experimental-web-platform-features; 重启浏览器 (注意：有些特性在Chrome中没有默认开放支持)；  
`Opera`: 访问 opera://flags 并开启 ServiceWorker 的支持; 重启浏览器。 

>Service Workers 要求必须在 HTTPS 下才能运行  
localhost 也被浏览器认为是安全源


## 基本架构
基本步骤

1. `注册`: service worker URL 通过`serviceWorkerContainer.register()` 来获取和注册

2. 如果注册成功，service worker 就在 `ServiceWorkerGlobalScope` 环境中运行； 这是一个特殊类型的 woker 上下文运行环境，与主运行线程（执行脚本）相独立，同时也*没有*访问 DOM 的能力

3. service worker 现在可以处理事件了

4. 受service worker控制的页面打开后会尝试去安装`service worker`。最先发送给service worker的事件是`安装事件`(在这个事件里可以开始进行填充 IndexDB和缓存站点资源)。这个流程同原生 APP 或者 Firefox OS APP 是一样的 — 让所有资源可离线访问

5. 当 `oninstall` 事件的处理程序执行完毕后，可以认为 service worker 安装完成了
下一步是激活。当service worker安装完成后，会接收到一个激活事件(activate event)。 `onactivate`主要用途是清理先前版本的service worker 脚本中使用的资源。

6. Service Worker现在可以控制页面了，但仅是在 `register()`成功后的打开的页面。也就是说，页面起始于有没有service worker，且在页面的接下来生命周期内维持这个状态。所以，页面不得不重新加载以让service worker获得完全的控制。

