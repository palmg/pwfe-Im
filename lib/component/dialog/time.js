'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 时间显示内容
 * @param props {object}
 * {
 *      {string} time
 * }
 * @constructor
 */
var Time = function Time(props) {
  return _react2.default.createElement(
    'p',
    { style: s_time },
    props.time
  );
}; /**
    * Created by chkui on 2017/7/13.
    */
exports.default = Time;

var s_time = {
  textAlign: 'center',
  fontSize: '.6rem',
  color: '#999999',
  margin: '.5rem 0 .2rem 0'
};