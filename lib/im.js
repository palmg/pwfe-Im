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

        var _this = _possibleConstructorReturn(this, (_ref = Im.__proto__ || Object.getPrototypeOf(Im)).call.apply(_ref, [this].concat(props)));

        _this.onMsg = null; //子组件获取消息的回调
        _this.state = {
            stu: _context.ImState.closed //标记是否显示对话框
        };
        _this.sendHandle = _this.sendHandle.bind(_this);

        _this.setOnMessage = _this.setOnMessage.bind(_this);
        _this.socketConnectHandle = _this.socketConnectHandle.bind(_this);
        _this.socketMessageHandle = _this.socketMessageHandle.bind(_this);
        _this.socketCloseHandle = _this.socketCloseHandle.bind(_this);

        _this.socket = (0, _webSocket.webSocket)({
            url: _this.props.url,
            onConnect: _this.socketConnectHandle,
            onMessage: _this.socketMessageHandle,
            onClose: _this.socketCloseHandle
        });
        return _this;
    }

    _createClass(Im, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.socketEstablish();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.socket.close();
            //this.setState({stu: ImState.closing})
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return nextState.stu !== this.state.stu;
        }
    }, {
        key: 'socketEstablish',
        value: function socketEstablish() {
            //begin establish connect
            this.setState({ stu: _context.ImState.establish });
            this.socket.connect();
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
        key: 'socketCloseHandle',
        value: function socketCloseHandle(e) {//close webSocket connect
            //this.setState({stu: ImState.closed})
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
        key: 'render',
        value: function render() {
            var stu = this.state.stu;

            return stu === _context.ImState.closed || stu === _context.ImState.closing ? null : _react2.default.createElement(_chatFrame2.default, { mask: stu === _context.ImState.establish,
                user: this.props.user,
                send: this.sendHandle,
                setOnMsg: this.setOnMessage,
                onClose: this.props.onClose });
        }
    }]);

    return Im;
}(_react2.default.Component);

exports.default = Im;