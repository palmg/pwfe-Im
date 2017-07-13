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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by chkui on 2017/7/11.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var cn = require('classnames/bind').bind(require('./title.scss'));

/**
 * 标题内容
 * @param {object} user 用户信息：
 *   {
 *      avatar:用户头像
 *      name:用户昵称
 *      id:用户对应的标记id
 *    }
 * @param {function} onClose 聊天窗口关闭事件()=>{}
 */

var Title = function (_React$Component) {
    _inherits(Title, _React$Component);

    function Title() {
        var _ref;

        _classCallCheck(this, Title);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = Title.__proto__ || Object.getPrototypeOf(Title)).call.apply(_ref, [this].concat(props)));

        _this.closeHandle = _this.closeHandle.bind(_this);
        return _this;
    }

    _createClass(Title, [{
        key: 'closeHandle',
        value: function closeHandle(e) {
            var close = this.props.onClose;
            close && close();
        }
    }, {
        key: 'render',
        value: function render() {
            var user = this.props.user;
            return _react2.default.createElement(
                'div',
                { className: cn('title') },
                _react2.default.createElement('img', { className: cn('img'), src: user.avatar }),
                _react2.default.createElement(
                    'div',
                    { className: cn('inline', 'name') },
                    user.name
                ),
                _react2.default.createElement('div', { className: cn('inline', 'close'), onClick: this.closeHandle })
            );
        }
    }], [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            return false;
        }
    }]);

    return Title;
}(_react2.default.Component);

exports.default = Title;