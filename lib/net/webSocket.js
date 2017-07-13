'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by chkui on 2017/7/12.
 */

/**
 * 创建websocket连接
 * @param {object} options{
 *   url:访问地址。切记标记ws相关的协议名称。如 ws://localhost:8080/path或wss://localhost:8080
 *   onConnect:连接成功的回调(e)=>{}
 *   onMessage:接收到消息的回调(msg,e)=>{}
 *   onClose:关闭链接成功的回调(e)=>{}
 * }
 * @returns {function()}
 */
var webSocket = exports.webSocket = function webSocket(options) {
    return function () {
        //成员变量
        var _url = options.url,
            //连接地址
        _isConnect = false,
            //标记是否已经创建连接
        _socket = {}; //webSocket对象
        //成员方法
        var _send = function _send(msg) {
            //发送消息的实现方法
            _socket.send(msg);
        },
            _close = function _close() {
            //关闭链接
            _socket.close();
        };
        var _self = {};
        _self.connect = function () {
            _socket = new WebSocket(_url);
            _socket.onopen = function (e) {
                _isConnect = true;
                options.onConnect(e);
            };
            _socket.onmessage = function (e) {
                options.onMessage(e.data, e);
            };
            _socket.onclose = function (e) {
                options.onClose(e);
            };
        };
        _self.send = function (msg) {
            _isConnect ? _send(msg) : console.warn('connection no establish!');
        };
        _self.close = function () {
            _close();
        };
        return _self;
    }();
};