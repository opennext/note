#1 ?`process.dlopen` 
请注意, 即使原生Node.js模块如果考虑到了线程安全问题， 但在 Web Worker中加载它仍然不安全, 因为 `process.dlopen` 函数并没有考虑。


x关于 Electron 
辅助功能
分发应用
应用程序打包
调试主进程
Debugging the Main Process in node-inspector
使用 VSCode 进行主进程调试
x桌面环境集成
x开发者工具扩展

x安装
键盘快捷键
Mac App Store 应用程序提交指南
x多线程
通知 (Windows, Linux, macOS)
x离屏渲染
x在线/离线事件探测
计划中的 API 更改
x快速入门
交互式解释器 (REPL)
x安全性，原生能力和你的责任
x支持平台
Headless CI Systems 测试 (Travis CI, Jenkins)
更新应用程序
x使用 Node 原生模块
使用 Pepper Flash 插件
使用 Selenium 和 WebDriver
使用 Widevine CDM 插件
Electron 版本管理
Windows 商店提交指南

