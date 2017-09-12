'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
 * @param {object} style: 样式
 * @param {string} className: css样式
 * @param {object} user 聊天对象信息，结构为：
 * {
 *      avatar:用户头像
 *      name:用户昵称
 * }
 * @param {string} url:服务器连接地址。切记标记ws相关的协议名称。如 ws://localhost:8080/path或wss://localhost:8080
 * @param {string} type:websocket的模式'standard'|'socketIo'。默认为'standard'
 *                 standard :按照w3c规范实现，使用浏览器底层接口。只能在可支持的浏览器上使用。
 *                 socketIo :使用https://socket.io/实现，对浏览器又更好的兼容性。但是需要后台服务器也是要对应的方案。
 * @param {function} onClose 用户点击关闭按钮。点击关闭按钮是否关闭聊天窗口由业务层决定。{show && <Im />}
 * @param {function} onHistory 获取历史消息的处理器，当用户在界面上触发历史消息的事件时，这个接口会被调用
 *  方法返回的数据就是回调历史数据，结构和chatList类似： ()=>{return [{
 *      type: ['receive'|'send'] receive表示接受到的消息，send表示本地发送出去的消息
 *      msg: '' 消息内容
 *      timestamp: 时间搓
 *  }]}
 * @param {string} channel 链接频道，socket.io用于标记链接频道。需要根据服务器配置
 * @param {object} middleware 用于处理收发消息的中间件。可以在收到会发送消息的时候对消息本身进行处理。结构为{
 *      onSend:(msg)=>{return //}发送消息的中间件，当触发发送消息时该方法会被调用，返回的内容即是发送的消息，必须是字符串。
 *      onMsg:(msg)=>{return //}收到消息的中间件，需要将信息转换为可用于展示的字符串。
 * } 所有的中间件，返回false表示不执行，返回true表示执行原始消息
 * @param {function} onFile 上传文件时被触发
 *  (file, callback) => {file：前端文件对象，callback:文件异步上传成功后的回调.callback(imgSrc, downloadSrc)}
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

        var params = _this2.props,
            middleware = params.middleware || {};
        _this2.onMsg = null; //子组件获取消息的回调
        _this2.state = {
            stu: _context.ImState.establish //标记是否显示对话框
        };
        _this2.fooList = []; //方法处理队列，用于排队处理状态
        _this2.timer = null; //处理队列的间隔回调对象
        _this2.middleware = { //用于处理消息的中间件
            onSend: middleware && middleware.onSend ? middleware.onSend : function () {
                return true;
            },
            onMsg: middleware && middleware.onMsg ? middleware.onMsg : function () {
                return true;
            }
        };
        _this2.sendHandle = _this2.sendHandle.bind(_this2);
        _this2.setOnMessage = _this2.setOnMessage.bind(_this2);
        _this2.socketConnectHandle = _this2.socketConnectHandle.bind(_this2);
        _this2.socketMessageHandle = _this2.socketMessageHandle.bind(_this2);
        _this2.socketDisconnectHandle = _this2.socketDisconnectHandle.bind(_this2);

        _this2.socket = (0, _webSocket.webSocket)({
            url: params.url,
            channel: params.channel,
            onConnect: _this2.socketConnectHandle,
            onMessage: _this2.socketMessageHandle,
            onDisconnect: _this2.socketDisconnectHandle
        }, _context.SocketType[_this2.props.type]);
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
            executeMsgOpt(msg, this.middleware.onMsg(msg), this.onMsg);
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
                    this.stateProcess(function () {
                        _this3.setState({ stu: _context.ImState.closing });
                    });
                    this.stateProcess(function () {
                        _this3.props.onClose();
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
            executeMsgOpt(msg, this.middleware.onSend(msg), this.socket.send);
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
                _f ? _f() : function () {
                    clearInterval(_this4.timer);
                    _this4.timer = false;
                }();
            }, _context.UI.stateProcessTime));
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                style = _props.style,
                className = _props.className,
                stu = this.state.stu,
                _props2 = this.props,
                onHistory = _props2.onHistory,
                onClose = _props2.onClose,
                onFile = _props2.onFile;

            return _react2.default.createElement(_chatFrame2.default, { style: style,
                className: className,
                state: stu,
                user: this.props.user,
                send: this.sendHandle,
                setOnMsg: this.setOnMessage,
                onHistory: onHistory,
                onFile: onFile,
                onClose: onClose });
        }
    }]);

    return Im;
}(_react2.default.Component);

Im.defaultProps = {
    type: 'standard'
};

/**
 * 信息操作枚举标记
 * @type {{NONE: number, STOP: number, MODIFY: number}}
 */
var MsgOptType = {
    NONE: 1, //什么都不修改，返回原有数据
    STOP: 2, //不执行
    MODIFY: 3 //使用返回的数据触发消息
},

/**
 * 处理消息
 * @param originMsg
 * @param modifyMsg
 * @param foo
 * @returns {number}
 */
executeMsgOpt = function executeMsgOpt(originMsg, modifyMsg, foo) {
    var type = typeof modifyMsg === 'undefined' ? 'undefined' : _typeof(modifyMsg),
        opt = null === modifyMsg || 'undefined' === type || 'boolean' === type ? modifyMsg && function () {
        foo(originMsg, new Date().getTime());
    }() : foo(modifyMsg, new Date().getTime());
};

exports.default = Im;