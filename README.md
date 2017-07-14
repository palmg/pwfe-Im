用React实现的轻便及时通讯工具，用于web端。
## 安装
`npm install pwfe-im`
## 使用
通过React组件的方式使用：
```JavaScript
import React from 'react'
import {render} from 'react-dom'
import IM from 'pwfe-im'
const user = {
        avatar: ''
        name:''
    },
    url='ws://domian:8080/path',
    handleClose = ()=>{}
render(<IM user={user} url={url} onClose={handleClose}/>)
```
## 参数说明

接口 | 说明
------------ | -------------
user | 聊天对象信息，2个参数`avatar`和`name`<br>`avatar`：头像，应该是一个网络地址或base64编码。<br>`name`：名称。
url | 发送到服务器建立websocket链接的url参数。
onClose | 当用户点击关闭或者发送其他关闭事件时（无法连接服务器、服务器关闭等）会调用这个方法。聊天窗口是否显示由使用者控制。
## 例子使用说明
在example中提供了测试的代码。
- 首先`npm install` 安装package中的依赖。
- example中已经简单实现了一个websocket服务 *example/server/index.js*。运行`npm run server`命令即可启动。
- 服务器启动之后，用webpack运行客户端的demo:`npm run demo`。
- 浏览器输入 *http://localhost:8080/* 可以看到效果。