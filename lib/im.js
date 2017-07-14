'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chatFrame = require('./component/chatFrame');

var _chatFrame2 = _interopRequireDefault(_chatFrame);

var _context = require('./context');

var _webSocket = require('./net/webSocket');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by chkui on 2017/7/10.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * IM入口组件，用于创建聊天窗口。
 * @param {object} user 聊天对象信息，结构为：
 * {
 *      avatar:用户头像
 *      name:用户昵称
 *      id:用户对应的标记id
 * }
 * @param url:服务器连接地址。切记标记ws相关的协议名称。如 ws://localhost:8080/path或wss://localhost:8080
 * @param {function} onClose 用户点击关闭按钮。点击关闭按钮是否关闭聊天窗口由业务层决定。{show && <Im />}
 */
var Im = function (_React$Component) {
    _inherits(Im, _React$Component);

    function Im() {
        var _ref;

        _classCallCheck(this, Im);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        var _this2 = _possibleConstructorReturn(this, (_ref = Im.__proto__ || Object.getPrototypeOf(Im)).call.apply(_ref, [this].concat(props)));

        _this2.onMsg = null; //子组件获取消息的回调
        _this2.state = {
            stu: _context.ImState.establish //标记是否显示对话框
        };
        _this2.fooList = []; //方法处理队列，用于排队处理状态
        _this2.timer = null; //处理队列的间隔回调对象
        _this2.sendHandle = _this2.sendHandle.bind(_this2);
        _this2.setOnMessage = _this2.setOnMessage.bind(_this2);
        _this2.socketConnectHandle = _this2.socketConnectHandle.bind(_this2);
        _this2.socketMessageHandle = _this2.socketMessageHandle.bind(_this2);
        _this2.socketDisconnectHandle = _this2.socketDisconnectHandle.bind(_this2);

        _this2.socket = (0, _webSocket.webSocket)({
            url: _this2.props.url,
            onConnect: _this2.socketConnectHandle,
            onMessage: _this2.socketMessageHandle,
            onDisconnect: _this2.socketDisconnectHandle
        });
        return _this2;
    }

    _createClass(Im, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.socket.connect();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearInterval(this.timer);
            this.socket.close();
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return nextState.stu !== this.state.stu;
        }
    }, {
        key: 'socketConnectHandle',
        value: function socketConnectHandle(e) {
            //call after establish connect success
            this.setState({ stu: _context.ImState.connect });
        }
    }, {
        key: 'socketMessageHandle',
        value: function socketMessageHandle(msg, e) {
            //get a message from the server
            this.onMsg(msg, new Date().getTime());
        }
    }, {
        key: 'socketDisconnectHandle',
        value: function socketDisconnectHandle(code, msg) {
            var _this3 = this;

            //close webSocket connect
            var _this = this;
            switch (code) {
                case _context.disconnect.establishErr:
                    this.stateProcess(function () {
                        _this3.setState({ stu: _context.ImState.establishError });
                    });
                    break;
                case _context.disconnect.serverCancel:
                    this.stateProcess(function () {
                        _this3.setState({ stu: _context.ImState.closing });
                    });
                    this.stateProcess(function () {
                        _this3.props.onClose();
                    });
                    break;
                default:
            }
        }
    }, {
        key: 'sendHandle',
        value: function sendHandle(msg, timestamp) {
            //send message to server
            this.socket.send(msg);
        }
    }, {
        key: 'setOnMessage',
        value: function setOnMessage(foo) {
            //set a function to handle the message from server
            this.onMsg = foo;
        }
    }, {
        key: 'stateProcess',
        value: function stateProcess(foo) {
            var _this4 = this;

            //状态处理队列
            var fooList = this.fooList;
            fooList.push(foo);
            !this.timer && (this.timer = setInterval(function () {
                var _f = fooList.shift();
                _f ? _f() : clearInterval(_this4.timer);
            }, _context.UI.stateProcessTime));
        }
    }, {
        key: 'render',
        value: function render() {
            var stu = this.state.stu;

            return _react2.default.createElement(_chatFrame2.default, { state: stu,
                user: this.props.user,
                send: this.sendHandle,
                setOnMsg: this.setOnMessage,
                onClose: this.props.onClose });
        }
    }]);

    return Im;
}(_react2.default.Component);

exports.default = Im;