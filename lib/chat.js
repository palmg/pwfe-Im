'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chatFrame = require('./component/chatFrame');

var _chatFrame2 = _interopRequireDefault(_chatFrame);

var _context = require('./context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 聊天窗口组件。用于直接呈现数据
 * @param {object} props {
 * @ {string} error 错误信息，当这个值存在时，聊天窗口会出现遮罩层并显示设定的错误信息。
 * @ {array} chatList 聊天列表，用于在窗口创建只时候就显示聊天内容。结构为:[{
 *      type: [receive|send] receive表示接受到的消息，send表示本地发送出去的消息
 *      msg: '' 消息内容
 *      timestamp: 时间搓
 * }]。可以通过重新设定这个列表改变聊天内容
 * @ {object} user 聊天对象信息:
 *    {
 *      avatar:用户头像
 *      name:用户昵称
 *      id:用户对应的标记id
 *    }。可以通过重新设定这个数据改变聊天对象信息，注意数据突变
 * @ {function} send 用于发送消息 send(msg,timestamp),在内部触发
 * @ {function} setOnMsg 用于设置获取消息的回调函数，结构为：
 *  setOnMsg((msg,timestamp)=>{//msg:消息内容，timestamp:时间搓})。
 * @ {function} onHistory 获取历史消息的处理器，当用户在界面上触发历史消息的事件时，这个接口会被调用
 *  方法返回的数据就是回调历史数据，结构和chatList类似： ()=>{return [{
 *      type: ['receive'|'send'] receive表示接受到的消息，send表示本地发送出去的消息
 *      msg: '' 消息内容
 *      timestamp: 时间搓
 *  }]}
 * @ {function} onClose 点击关闭时触发 ()=>{}
 * }
 */
var Chat = function Chat(props) {
    var params = Object.assign({}, props);
    if (props.error) {
        params.state = _context.ImState.error;
        params.state.name = props.error;
    } else {
        params.state = _context.ImState.connect;
    }
    return _react2.default.createElement(_chatFrame2.default, params);
}; /**
    * Created by chkui on 2017/7/21.
    */
exports.default = Chat;