'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _text = require('./action/text');

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Administrator on 2017/7/11.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * 下方的操作框
 * @param {function} onSend:(msg, timestamp)=>{msg:发送的消息，timestamp:时间搓}
 */
var Action = function (_React$Component) {
    _inherits(Action, _React$Component);

    function Action() {
        var _ref;

        _classCallCheck(this, Action);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = Action.__proto__ || Object.getPrototypeOf(Action)).call.apply(_ref, [this].concat(props)));

        _this.sendHandle = _this.sendHandle.bind(_this);
        return _this;
    }

    _createClass(Action, [{
        key: 'sendHandle',
        value: function sendHandle() {
            var text = this.text;
            this.props.onSend(this.text.get(), new Date().getTime());
            text.clean();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { style: s_action },
                _react2.default.createElement(_text2.default, { onSend: this.sendHandle, ref: function ref(_ref2) {
                        _this2.text = _ref2;
                    } }),
                _react2.default.createElement(
                    'button',
                    { style: s_send, onClick: this.sendHandle },
                    '\u53D1\u9001'
                )
            );
        }
    }], [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            return false;
        }
    }]);

    return Action;
}(_react2.default.Component);

exports.default = Action;

var s_action = {
    height: '7rem',
    backgroundColor: '#FFFFFF'
},
    s_send = {
    float: 'right',
    width: '5rem',
    height: '1.75rem',
    background: '#F8F8F8',
    border: 0,
    marginRight: '1rem',
    cursor: 'pointer'
};