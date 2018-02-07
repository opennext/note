
使用 JavaScript, HTML 和 CSS 构建跨平台的桌面应用  

### 调试主进程
使用如下的命令行开关来调试 Electron 的主进程：

- --inspect=[port]  
当这个开关用于 Electron 时，它将会监听 V8 引擎中有关 port 的调试器协议信息。 默认的port 是 5858

```electron --inspect=5858 your/app```

- --inspect-brk=[port]  
和`--inspector` 一样，但是会在JavaScript 脚本的第一行暂停运行。


### 运行时时序图

#### 1. [from node core to main.js](sequences/README.md)

#### 2. [BrowserWindow](sequences/README.md)


