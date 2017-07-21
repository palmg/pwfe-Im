用React实现的轻便及时通讯工具，用于web端。支持浏览器源生*websocket*和*socket.io*的方式
## 安装
`npm install pwfe-im`
## 使用
通过React组件的方式使用：
```JavaScript
import React from 'react'
import {render} from 'react-dom'
import IM from 'pwfe-im'
const user = {
        avatar: 'http://myPicture'
        name:'myName'
    },
    url='ws://domian:8080/path',
    handleClose = ()=>{}
render(<IM user={user} url={url} onClose={handleClose}/>)
```
## 参数说明

接口 | 说明
------------ | -------------
user | 聊天对象信息，2个参数`avatar`和`name`<br>`avatar`：头像，应该是一个网络地址或base64编码。<br>`name`：名称。
url | 发送到服务器建立链接的url参数。
onClose | 当用户点击关闭或者发送其他关闭事件时（无法连接服务器、服务器关闭等）会调用这个方法。聊天窗口是否显示由使用者控制。
type | websocket的模式,目前支持`'standard'`或`'socketIo'`。默认值为'standard'。<br>`standard` ：按照w3c规范实现，使用浏览器底层接口。只能在可支持的浏览器上使用。<br>`socketIo`：使用https://socket.io/实现，对浏览器又更好的兼容性。但是需要后台服务器也是要对应的方案。
channel | 链接频道，socket.io用于标记链接频道。需要根据服务器配置。
middleware | 用于处理收发消息的中间件。可以在收到会发送消息的时候对消息本身进行处理。结构为`{onSend:()=>{//},onMsg:(msg)=>{//}}`。<br>`onSend`：是用于处理发送消息的中间件。当用户触发发送消息事件时，会经过这个中间件进行一次处理。返回`true`表示使用原数据，返回`false`表示该数据不提交服务器，返回一个新的字符串会将该字符串发送给服务器。<br>`onMsg`：是用于处理接受消息的中间件。用组件接收到服务器发送过来的消息时会经过这个中间件进行一次处理。返回`true`表示使用原数据，返回`false`表示该数据不显示在聊天窗口，返回一个新的字符串会将该字符串显示在聊天窗口。<br>默认值都是返回原始数据。
style | 设定最外层<div>的样式。例如`<Im style={{letf:'20rem'}}>`
className | 设定最外层<div>的css。`<Im className="myCss">`
## 例子使用说明
在example中提供了测试的代码。
- 首先`npm install` 安装package中的依赖。
- example中已经简单实现了一个websocket服务 *example/server/index.js*。运行`npm run server`命令即可启动。
- 服务器启动之后，用webpack运行客户端的demo:`npm run demo`。
- 浏览器输入 *http://localhost:8080/* 可以看到效果。