/**
 * Created by chkui on 2017/7/20.
 */

import io from "socket.io-client"
import {disconnect} from '../../context'

/**
 * 使用socket-io实现的websocket，与源生相比，可以用http模拟实现websocket，有更好的兼容性。
 * @param {object} options{
 *   url:访问地址。切记标记ws相关的协议名称。如 ws://localhost:8080/path或wss://localhost:8080
 *   channel: 链接频道，socket.io用于标记链接频道。需要根据服务器配置
 *   onConnect:连接成功的回调(e)=>{}
 *   onMessage:接收到消息的回调(msg,e)=>{}
 *   onClose:关闭链接成功的回调(e)=>{}
 *   onDisconnect:外部关闭链接的回调(code,msg)=>{code表示关闭表示符，请查看context.disconnect，msg为对应的消息}
 * }
 */
const socketIo = (options) => {
    !options.channel && console.error('if use socket.io, an channel value must be setting.')
    return (() => {
        //成员变量
        let _url = options.url, //连接地址
            _isConnect = false, //标记是否已经创建连接
            _socket = {} //webSocket对象
        //成员方法
        const _send = (msg) => { //发送消息的实现方法
                _socket.emit(options.channel, msg, (successJson)=>{
                    console.log("ack from server! arg1: " + successJson);
                });
            },
            _close = () => { //关闭链接
                _socket.on('disconnect', ()=>{})
            },
            _self = {} //对象本身
        _self.connect = () => {
            _socket = io(_url)
            _socket.on('connect', (e) => {
                _isConnect = true
                options.onConnect(e)
                console.log(_socket.id); // 'G5p5...'
            });
            _socket.on('connect_error', (e)=>{
                options.onDisconnect(disconnect.establishErr, '建立链接失败')
            })
            _socket.on('connect_timeout', (timeout) => {
                options.onDisconnect(disconnect.establishErr, '建立链接超时')
            });
            _socket.on(options.channel, function (data) {
                options.onMessage(data, {})
            });
        }
        _self.send = (msg) => {
            _isConnect ? _send(msg) : console.warn('connection no establish!')
        }
        _self.close = () => {
            _close()
        }
        return _self
    })()
}

export default socketIo
