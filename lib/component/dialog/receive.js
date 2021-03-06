'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _context = require('../../context');

var _imgMsg = require('./imgMsg');

var _imgMsg2 = _interopRequireDefault(_imgMsg);

var _fileMsg = require('./fileMsg');

var _fileMsg2 = _interopRequireDefault(_fileMsg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 收取消息的窗口
 * @param props {object}
 * {
 *      {object} user 用户相关信息,结构为:{avatar:''}//头像
 *      {string} chat 接收内容
 *      {number} timestamp 时间搓
 * }
 * @constructor
 */
/**
 * Created by chkui on 2017/7/12.
 */
var Receive = function Receive(props) {
    var msg = function () {
        var chat = props.chat;
        try {
            chat = JSON.parse(chat);
        } catch (e) {}
        switch (_context.msgType[chat.msgType]) {
            case _context.msgType.img:
                return _react2.default.createElement(_imgMsg2.default, { url: chat.url, type: _context.chatType.receive });
            case _context.msgType.file:
                return _react2.default.createElement(_fileMsg2.default, { url: chat.url, name: chat.name, type: _context.chatType.receive });
            case _context.msgType.text:
            default:
                return _react2.default.createElement('p', { style: s_text, dangerouslySetInnerHTML: { __html: chat } });
        }
    }();

    return _react2.default.createElement(
        'div',
        { style: s_receive },
        _react2.default.createElement('img', { style: s_avatar, src: props.user.avatar }),
        _react2.default.createElement(
            'div',
            { style: s_chat },
            msg
        ),
        _react2.default.createElement('div', { style: s_arrow })
    );
};
exports.default = Receive;

var s_receive = {
    position: 'relative',
    margin: '0 1.7rem .5rem 0',
    display: 'flex',
    alignItems: 'center'
},
    s_avatar = {
    margin: '0 1rem',
    flexShrink: 0,
    width: '1.5rem',
    height: '1.5rem',
    borderRadius: '50%'
},
    s_chat = {
    margin: 0,
    maxWidth: '14rem',
    background: '#FFFFFF',
    border: '1px solid #EEEEEE',
    borderRadius: '3px',
    fontSize: '.6rem',
    color: '#333333',
    lineHeight: '1.2rem'
},
    s_arrow = {
    position: 'absolute',
    zIndex: -1,
    transform: 'rotate(45deg)',
    margin: 'auto',
    top: 0,
    bottom: 0,
    left: '3.2rem',
    width: '.6rem',
    height: '.6rem',
    background: '#FFFFFF',
    borderLeft: '1px solid #EEEEEE',
    borderBottom: '1px solid #EEEEEE'
},
    s_text = {
    padding: '0 .8rem'
};