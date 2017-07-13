'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cn = require('classnames/bind').bind(require('./time.scss'));
/**
 * 时间显示内容
 * @param props {object}
 * {
 *      {string} time
 * }
 * @constructor
 */
/**
 * Created by chkui on 2017/7/13.
 */
var Time = function Time(props) {
  return _react2.default.createElement(
    'p',
    { className: cn('time') },
    props.time
  );
};

exports.default = Time;