/**
 * Created by chkui on 2017/7/12.
 */
import {SocketType} from '../context'
import standard from './socket/standardSocket'
import socketIo from './socket/socketIo'

/**
 * 创建websocket连接
 * @param {object} options{
 *   url:访问地址。切记标记ws相关的协议名称。如 ws://localhost:8080/path或wss://localhost:8080
 *   channel: 链接频道，socket.io用于标记链接频道。需要根据服务器配置
 *   onConnect:连接成功的回调(e)=>{}
 *   onMessage:接收到消息的回调(msg,e)=>{}
 *   onClose:关闭链接成功的回调(e)=>{}
 *   onDisconnect:外部关闭链接的回调(code,msg)=>{code表示关闭表示符，请查看context.disconnect，msg为对应的消息}
 * }
 * @param {number} type 定义socket的类型，支持SocketType.standard或SocketType.socketIo。请参看context.js说明
 * @returns {function()}
 */
export const webSocket = (options, type = SocketType.standard) => {
    return type === SocketType.socketIo ? socketIo(options) : standard(options)
}