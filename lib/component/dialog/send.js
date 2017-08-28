'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
var Send = function Send(props) {
    return _react2.default.createElement(
        'div',
        { style: s_send },
        _react2.default.createElement('p', { style: s_chat, dangerouslySetInnerHTML: { __html: props.chat } }),
        _react2.default.createElement('div', { style: s_arrow })
    );
}; /**
    * Created by chkui on 2017/7/12.
    */

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
    padding: '.5rem .8rem',
    background: '#6092E0',
    borderRadius: '3px',
    fontSize: '.6rem',
    color: '#FFFFFF',
    lineHeight: '1.2rem'
},
    s_arrow = {
    position: 'absolute',
    zIndex: 3,
    transform: 'rotate(45deg)',
    margin: 'auto',
    top: 0,
    bottom: 0,
    right: '.5rem',
    width: '.6rem',
    height: '.6rem',
    background: '#6092E0'
};