/**
 * Created by chkui on 2017/7/11.
 */

/**
 * socket链接类型
 * @type {{standard: number, socketIo: number}}
 */
export const SocketType = {
    standard:1, //标准的html5模式，使用浏览器底层的websocket接口
    socketIo:2 //socketIO模式，使用https://socket.io/ 实现，更好的兼容性
}

/**
 * 当前连接状态类型
 * @type {{establish: {code: number, name: string}, establishError: {code: number, name: string}, connect: {code: number, name: string}, closing: {code: number, name: string}, closed: {code: number, name: string}, error: {code: number, name: string}}}
 */
export const ImState = {
    establish: {code: 1, name: '正在创建连接'},
    establishError: {code: 2, name: '无法创建连接'}, //
    connect: {code: 3, name: '已经链接'}, //
    closing: {code: 4, name: '即将关闭链接'},//
    closed: {code: 5, name: '链接已关闭'}, //链接已经关闭
    error: {code: 6, name: ''} //自定义错误信息
}

/**
 * 聊天信息内容
 * @type {{time: number, receive: number, send: number}}
 */
export const chatType = {
    time: 3, //时间标记
    receive: 1, //接收的数据
    send: 2 //发送的数据
}

/**
 * 聊天信息内容的类型
 * @type {{text: number, img: number, file: number}}
 */
export const msgType = {
    text: 1, //文本
    img: 2, //图片
    file: 3 //文件
}

/**
 * UI显示效果全局配置
 * @type {{stateProcessTime: number, timeShowInterval: number}}
 */
export const UI = {
    stateProcessTime: 1500, //聊天窗口出现时默认加载时间，单位毫秒
    timeShowInterval: 1000 * 60 * 3 //聊天窗口间隔时间，单位毫秒
}

/**
 * 服务断线状态
 * @type {{establishErr: number, serverCancel: number}}
 */
export const disconnect = {
    establishErr: -1, //建立链接失败
    serverCancel: 1, //服务器主动断开链接
}