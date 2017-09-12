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
 *
 * @param props {object}
 * {
 *    {string} chat 发送内容
 *    {number} timestamp 时间搓
 * }
 * @constructor
 */
/**
 * Created by chkui on 2017/7/12.
 */

var Send = function Send(props) {
    var msg = function () {
        var chat = props.chat;
        try {
            chat = JSON.parse(chat);
        } catch (e) {}
        switch (_context.msgType[chat.msgType]) {
            case _context.msgType.img:
                return _react2.default.createElement(_imgMsg2.default, { url: chat.url, type: _context.chatType.send });
            case _context.msgType.file:
                return _react2.default.createElement(_fileMsg2.default, { url: chat.url, name: chat.name, type: _context.chatType.send });
            case _context.msgType.text:
            default:
                return _react2.default.createElement('p', { style: s_text, dangerouslySetInnerHTML: { __html: chat } });
        }
    }();
    return _react2.default.createElement(
        'div',
        { style: s_send },
        _react2.default.createElement(
            'div',
            { style: s_chat },
            msg
        ),
        _react2.default.createElement('div', { style: s_arrow })
    );
};
exports.default = Send;

var s_send = {
    marginBottom: '.5rem',
    position: 'relative',
    padding: '0 .8rem 0 2.5rem',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
},
    s_chat = {
    margin: 0,
    maxWidth: '14rem',
    wordBreak: 'break-all',
    background: '#6092E0',
    borderRadius: '3px',
    fontSize: '.6rem',
    color: '#FFFFFF',
    lineHeight: '1.2rem'
},
    s_arrow = {
    position: 'absolute',
    zIndex: -1,
    transform: 'rotate(45deg)',
    margin: 'auto',
    top: 0,
    bottom: 0,
    right: '.5rem',
    width: '.6rem',
    height: '.6rem',
    background: '#6092E0'
},
    s_text = {
    padding: '0 .8rem'
};