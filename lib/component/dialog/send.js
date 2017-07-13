'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cn = require('classnames/bind').bind(require('./send.scss'));

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
  return _react2.default.createElement(
    'div',
    { className: cn('send') },
    _react2.default.createElement(
      'p',
      { className: cn('chat') },
      props.chat
    ),
    _react2.default.createElement('div', { className: cn('arrow') })
  );
};

exports.default = Send;