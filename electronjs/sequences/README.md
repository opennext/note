# electron runtime sequence

## part 1. from node core to main.js  
![electron_runtime_sequence_1](electron_runtime_sequence_1.png)

#### modules loaded  
/usr/local/lib/node_modules/electron/dist/resources/electron.asar/browser/api/app.js  
/usr/local/lib/node_modules/electron/dist/resources/electron.asar/browser/api/browser-window.js  
/usr/local/lib/node_modules/electron/dist/resources/electron.asar/browser/api/exports/electron.js  
/usr/local/lib/node_modules/electron/dist/resources/electron.asar/browser/api/ipc-main.js  
/usr/local/lib/node_modules/electron/dist/resources/electron.asar/browser/api/menu-item-roles.js  
/usr/local/lib/node_modules/electron/dist/resources/electron.asar/browser/api/menu-item.js  
/usr/local/lib/node_modules/electron/dist/resources/electron.asar/browser/api/menu.js  
/usr/local/lib/node_modules/electron/dist/resources/electron.asar/browser/api/module-list.js  
/usr/local/lib/node_modules/electron/dist/resources/electron.asar/browser/api/navigation-controller.js  
/usr/local/lib/node_modules/electron/dist/resources/electron.asar/browser/api/session.js  
/usr/local/lib/node_modules/electron/dist/resources/electron.asar/browser/api/web-contents.js  
/usr/local/lib/node_modules/electron/dist/resources/electron.asar/browser/init.js  
/usr/local/lib/node_modules/electron/dist/resources/electron.asar/common/api/deprecate.js  
/usr/local/lib/node_modules/electron/dist/resources/electron.asar/common/api/exports/electron.js  
/usr/local/lib/node_modules/electron/dist/resources/electron.asar/common/api/module-list.js  
/usr/local/lib/node_modules/electron/dist/resources/electron.asar/common/atom-binding-setup.js  
/usr/local/lib/node_modules/electron/dist/resources/electron.asar/common/init.js  
/usr/local/lib/node_modules/electron/dist/resources/electron.asar/common/reset-search-paths.js  
...

#### how to edit the diagram
- install vs code plugin vscode-sequence-diagrams
- open file **electron_runtime_sequence - from node core to main.js.seqdiag** in vscode
- run Command `Show Sequence Diagram Preview`  

## part 2. BrowserWindow  
TODO