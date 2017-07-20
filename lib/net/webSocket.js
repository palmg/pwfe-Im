'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webSocket = undefined;

var _context = require('../context');

var _standardSocket = require('./socket/standardSocket');

var _standardSocket2 = _interopRequireDefault(_standardSocket);

var _socketIo = require('./socket/socketIo');

var _socketIo2 = _interopRequireDefault(_socketIo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var webSocket = exports.webSocket = function webSocket(options) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _context.SocketType.standard;

  return type === _context.SocketType.socketIo ? (0, _socketIo2.default)(options) : (0, _standardSocket2.default)(options);
}; /**
    * Created by chkui on 2017/7/12.
    */