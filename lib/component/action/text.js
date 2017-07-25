'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by chkui on 2017/7/12.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * 聊天文字输入框。非受控组件
 * 1）可以通过ref.get()的获取聊天内容
 * 2）可以通过ref.clean()清除内容
 * @param {function} onSend()
 */
var Text = function (_React$Component) {
    _inherits(Text, _React$Component);

    function Text() {
        var _ref;

        _classCallCheck(this, Text);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = Text.__proto__ || Object.getPrototypeOf(Text)).call.apply(_ref, [this].concat(props)));

        _this.keyUpHandle = _this.keyUpHandle.bind(_this);
        return _this;
    }

    _createClass(Text, [{
        key: 'get',
        value: function get() {
            return this.dom.value;
        }
    }, {
        key: 'clean',
        value: function clean() {
            this.dom.value = '';
            return this;
        }
    }, {
        key: 'keyUpHandle',
        value: function keyUpHandle(e) {
            e && e.keyCode === 13 && this.dom.value && this.props.onSend();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement('textarea', { style: s_text, ref: function ref(_ref2) {
                    _this2.dom = _ref2;
                }, onKeyUp: this.keyUpHandle, placeholder: '\u8BF7\u8F93\u5165\u804A\u5929\u4FE1\u606F' });
        }
    }]);

    return Text;
}(_react2.default.Component);

exports.default = Text;

var s_text = {
    padding: '1rem',
    border: 0,
    width: '100%',
    height: '70%',
    resize: 'none',
    outline: 'none'
};