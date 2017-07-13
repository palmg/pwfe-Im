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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by chkui on 2017/7/13.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var cn = require('classnames/bind').bind(require('./loading.scss'));

var Loading = function (_React$Component) {
    _inherits(Loading, _React$Component);

    function Loading() {
        var _ref;

        _classCallCheck(this, Loading);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = Loading.__proto__ || Object.getPrototypeOf(Loading)).call.apply(_ref, [this].concat(props)));

        _this.state = {
            t: '.'
        };
        _this.count = 0;
        _this.showLine = _this.showLine.bind(_this);
        return _this;
    }

    _createClass(Loading, [{
        key: 'showLine',
        value: function showLine() {
            this.count = ++this.count % 8;
            var ch = '.';
            for (var i = 0; i < this.count; i++) {
                ch += '.';
            }
            this.setState({
                t: ch
            });
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return this.state !== nextState;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.timer = setInterval(this.showLine, 200);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearInterval(this.timer);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: cn('loading') },
                _react2.default.createElement('div', { className: cn('mask') }),
                _react2.default.createElement(
                    'div',
                    { className: cn('name') },
                    _react2.default.createElement(
                        'p',
                        { className: cn('text') },
                        '\u5EFA\u7ACB\u94FE\u63A5\u4E2D'
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: cn('dot') },
                        this.state.t
                    )
                )
            );
        }
    }]);

    return Loading;
}(_react2.default.Component);

exports.default = Loading;