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
                { style: s_title },
                _react2.default.createElement('img', { style: s_img, src: user.avatar }),
                _react2.default.createElement(
                    'div',
                    { style: s_name },
                    user.name
                ),
                _react2.default.createElement(
                    'div',
                    { style: s_close, onClick: this.closeHandle },
                    _react2.default.createElement('div', { style: s_before }),
                    _react2.default.createElement('div', { style: s_after })
                )
            );
        }
    }], [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            return false; //任何情况都不执行比对算法
        }
    }]);

    return Title;
}(_react2.default.Component);

exports.default = Title;

var s_title = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0,
    width: '100%',
    height: '3rem',
    backgroundColor: '#EEEEEE'
},
    s_img = {
    margin: '0 1rem',
    width: '1.5rem',
    height: '1.5rem',
    borderRadius: '50%'
},
    s_name = {
    flexGrow: 2,
    fontSize: '.6rem',
    color: '#333333'
},
    s_close = {
    position: 'relative',
    width: '2.35rem',
    height: '2.35rem',
    transform: 'rotate(45deg)',
    cursor: 'pointer'
},
    s_close_fix = {
    position: 'absolute',
    background: '#ccc',
    margin: 'auto',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
},
    s_before = Object.assign({}, s_close_fix, {
    width: '1rem',
    height: '.05rem'
}),
    s_after = Object.assign({}, s_close_fix, {
    width: '.05rem',
    height: '1rem'
});