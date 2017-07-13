'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cn = require('classnames/bind').bind(require('./recive.scss'));

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
  return _react2.default.createElement(
    'div',
    { className: cn('receive') },
    _react2.default.createElement('img', { className: cn('avatar'), src: props.user.avatar }),
    _react2.default.createElement(
      'p',
      { className: cn('chat') },
      props.chat
    ),
    _react2.default.createElement('div', { className: cn('arrow') })
  );
};

exports.default = Receive;