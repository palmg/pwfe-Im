'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _title = require('./title');

var _title2 = _interopRequireDefault(_title);

var _dialog = require('./dialog');

var _dialog2 = _interopRequireDefault(_dialog);

var _action = require('./action');

var _action2 = _interopRequireDefault(_action);

var _loading = require('./loading');

var _loading2 = _interopRequireDefault(_loading);

var _context = require('../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by chkui on 2017/7/11.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * 聊天窗口。
 * @param {object} state 当前外部加载状态，context.ImState中的所有值。
 * @param {array} chatList 聊天列表，用于在窗口创建只时候就显示聊天内容。结构为:[{
 *      type: ['receive'|'send'] receive表示接受到的消息，send表示本地发送出去的消息
 *      msg: '' 文本格式的消息内容, 或下面的json格式
 *      msg: '{
 *          msgType: 消息内容类型 ['file'|'img'|'text'] file表示文件类型的消息，img表示图片类型的消息, text表示文本类型的消息
 *          text: 文本消息的内容
 *          url: 图片/文件 的url
 *          name: 图片/文件 的名称
 *      }' 消息内容(json格式字符串)
 *      timestamp: 时间搓
 * }]。可以通过重新设定这个列表改变聊天内容，注意数据突变
 * @param {object} user 聊天对象信息:
 *    {
 *      avatar:用户头像
 *      name:用户昵称
 *      id:用户对应的标记id
 *    }。可以通过重新设定这个数据改变聊天对象信息，注意数据突变
 * @param {function} send 用于发送消息 send(msg,timestamp),在内部触发
 * @param {function} setOnMsg 用于设置获取消息的回调函数，结构为：
 *  setOnMsg((msg,timestamp)=>{//msg:消息内容，timestamp:时间搓})。
 * @param {function} onHistory 获取历史消息的处理器，当用户在界面上触发历史消息的事件时，这个接口会被调用
 *  方法会传入一个callback方法，使用callback方法回传数据，回传的数据结构和chatList类似：
 *  (call)=>{call([{
 *      type: ['receive'|'send'] receive表示接受到的消息，send表示本地发送出去的消息
 *      msg: '' 文本格式的消息内容, 或下面的json格式
 *      msg: '{
 *          msgType: 消息内容类型 ['file'|'img'|'text'] file表示文件类型的消息，img表示图片类型的消息, text表示文本类型的消息
 *          text: 文本消息的内容
 *          url: 图片/文件 的url
 *          name: 图片/文件 的名称
 *      }' 消息内容(json格式字符串)
 *      timestamp: 时间搓
 *  }])}
 * @param {function} onFile 上传文件时被触发
 *  (file, callback) => {file：前端文件对象，callback:文件异步上传成功后的回调.callback(imgSrc, downloadSrc)}
 * @param {function} onClose 点击关闭时触发 ()=>{}
 */
var ChatFrame = function (_React$Component) {
    _inherits(ChatFrame, _React$Component);

    function ChatFrame() {
        var _ref;

        _classCallCheck(this, ChatFrame);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = ChatFrame.__proto__ || Object.getPrototypeOf(ChatFrame)).call.apply(_ref, [this].concat(props)));

        var params = _this.props;
        _this.state = {
            list: [] //消息列表，结构为[{type, msg, timestamp}]
        };
        _this.lastTimeBox = 0; //最后一次添加消息框的位置
        _this.onMsg = _this.onMsg.bind(_this); //收到外部消息的回调
        _this.sendMsg = _this.sendMsg.bind(_this); //发送消息给服务器的方法
        params.setOnMsg && params.setOnMsg(_this.onMsg);
        _this.historyHandle = _this.historyHandle.bind(_this);
        _this.setChatList = _this.setChatList.bind(_this);
        _this.historyCallback = _this.historyCallback.bind(_this);
        _this.fileHandle = _this.fileHandle.bind(_this);
        return _this;
    }

    _createClass(ChatFrame, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            //只有消息列表发送变更时才进行比对算法,确保list不会发生数据突变
            var props = this.props;
            return props.user !== nextState.user || props.state !== nextProps.state || this.state.list !== nextState.list;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.props.chatList !== nextProps.chatList && this.setChatList(nextProps.chatList);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var chatList = this.props.chatList;
            chatList && this.setChatList(chatList);
            //打开窗口就获取历史记录数据
            this.props.onHistory(this.historyCallback);
        }
    }, {
        key: 'onMsg',
        value: function onMsg(msg, timestamp) {
            //接收消息
            this.addChatLabel(_context.chatType.receive, msg, timestamp);
        }
    }, {
        key: 'sendMsg',
        value: function sendMsg(msg, timestamp) {
            //向外发送消息
            var send = this.props.send;
            send && send(msg, timestamp);
            this.addChatLabel(_context.chatType.send, msg, timestamp);
        }
    }, {
        key: 'historyCallback',
        value: function historyCallback(hisList) {
            var msgList = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = hisList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var chat = _step.value;

                    this.processOneChat(msgList, _context.chatType[chat.type], chat.msg, chat.timestamp);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.setState({
                list: msgList.concat(this.state.list)
            });
        }
    }, {
        key: 'historyHandle',
        value: function historyHandle() {
            //TODO 昕爷，使用这个列表去更新聊天样式，现在修改为回调触发
            this.props.onHistory(this.historyCallback);

            //TODO this.setState() 使用hisList改变状态，更新历史信息列表
            //this.processOneChat用于向聊天队列尾部添加聊天消息，可以参考调整向聊天队列队首增加内容
            //
        }
    }, {
        key: 'fileHandle',
        value: function fileHandle(file) {
            var _this2 = this;

            this.props.onFile(file, function (imgSrc, downloadSrc) {
                var msg = {},
                    timestamp = new Date().getTime();
                imgSrc && (msg = { url: imgSrc, msgType: "img" });
                downloadSrc && (msg = {
                    url: downloadSrc,
                    name: file.name,
                    msgType: "file"
                });

                var send = _this2.props.send;
                send && send(JSON.stringify(msg), timestamp);
                _this2.addChatLabel(_context.chatType.send, JSON.stringify(msg), timestamp);
            });
        }
    }, {
        key: 'setChatList',
        value: function setChatList(chatList) {
            //处理外部传入的聊天列表
            var showList = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = chatList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var chat = _step2.value;

                    this.processOneChat(showList, _context.chatType[chat.type], chat.msg, chat.timestamp);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            this.setState({
                list: showList
            });
        }
    }, {
        key: 'processOneChat',
        value: function processOneChat(list, type, msg, timestamp) {
            var _this3 = this;

            //当消息的间隔时间搓大于设定的时间时（UI.timeShowInterval），向消息列表增加时间显示
            timestamp - this.lastTimeBox > _context.UI.timeShowInterval && function () {
                _this3.lastTimeBox = timestamp;
                var date = new Date(timestamp);
                list.push({
                    type: _context.chatType.time,
                    msg: date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate() + ' ' + date.getHours() + ':' + processMinutes(date.getMinutes()),
                    timestamp: timestamp
                });
            }();

            //添加对话消息到消息列表
            list.push({
                type: type,
                msg: msg,
                timestamp: timestamp
            });
        }
    }, {
        key: 'addChatLabel',
        value: function addChatLabel(type, msg, timestamp) {
            //向聊天列表增加一条消息
            var list = this.state.list,
                tempList = [];
            this.processOneChat(tempList, type, msg, timestamp);
            //更新列表
            //使用array.concat方法构建一个新队列，保证构建的是一个新实例以防止数据突变
            this.setState({
                list: this.state.list.concat(tempList)
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                style = _props.style,
                className = _props.className,
                user = _props.user,
                onClose = _props.onClose,
                state = _props.state,
                s_style = Object.assign({}, style, s_chatFrame);
            //TODO, 昕爷。onHistory触发historyHandle事件

            return _react2.default.createElement(
                'div',
                { style: s_style, className: className ? className : '' },
                _react2.default.createElement(_title2.default, { user: user, onClose: onClose }),
                _react2.default.createElement(_dialog2.default, { user: user, chatList: this.state.list, onHistory: this.historyHandle }),
                _react2.default.createElement(_action2.default, { onSend: this.sendMsg, onFile: this.fileHandle }),
                state !== _context.ImState.connect && _react2.default.createElement(_loading2.default, { title: state.name })
            );
        }
    }]);

    return ChatFrame;
}(_react2.default.Component);

/**
 * 处理分钟
 * @param minutes
 * @returns {string}
 */


var processMinutes = function processMinutes(minutes) {
    return 10 > minutes ? '0' + minutes : minutes;
};
var s_chatFrame = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '18rem',
    height: '100%',
    textAlign: 'left',
    boxShadow: '2px 2px 8px 1px rgba(0, 0, 0, .17)',
    backgroundColor: '#F8F8F8',
    boxSizing: 'border-box'
};
exports.default = ChatFrame;