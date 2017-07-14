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

var cn = require('classnames/bind').bind(require('./chatFrame.scss'));

/**
 * 聊天窗口。
 * @param {object} state 当前外部加载状态，context.ImState中的所有值
 * @param {object} user 聊天对象信息:
 *    {
 *      avatar:用户头像
 *      name:用户昵称
 *      id:用户对应的标记id
 *    }
 * @param {function} send 用于发送消息 send(msg,timestamp),在内部触发
 * @param {function} setOnMsg 用于设置获取消息的回调函数，结构为：
 *  setOnMsg((msg,timestamp)=>{//msg:消息内容，timestamp:时间搓})。
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

        _this.state = {
            list: [] //消息列表，结构为[{type, msg, timestamp}]
        };
        _this.lastTimeBox = 0;
        _this.onMsg = _this.onMsg.bind(_this); //收到外部消息的回调
        _this.sendMsg = _this.sendMsg.bind(_this); //发送消息给服务器的方法
        _this.props.setOnMsg(_this.onMsg);
        return _this;
    }

    _createClass(ChatFrame, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            //只有消息列表发送变更时才进行比对算法,确保list不会发生数据突变
            return this.props.state !== nextProps.state || this.state.list !== nextState.list;
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
            this.props.send(msg, timestamp);
            this.addChatLabel(_context.chatType.send, msg, timestamp);
        }
    }, {
        key: 'addChatLabel',
        value: function addChatLabel(type, msg, timestamp) {
            var _this2 = this;

            //向聊天列表增加一条消息
            var list = this.state.list,
                tempList = [];
            //当消息的间隔时间搓大于设定的时间时（UI.timeShowInterval），向消息列表增加时间显示
            timestamp - this.lastTimeBox > _context.UI.timeShowInterval && function () {
                _this2.lastTimeBox = timestamp;
                var date = new Date(timestamp);
                tempList.push({
                    type: _context.chatType.time,
                    msg: ('' + date.getFullYear()).substring(2) + '.' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes(),
                    timestamp: timestamp
                });
            }();

            //添加对话消息到消息列表
            tempList.push({
                type: type,
                msg: msg,
                timestamp: timestamp
            });

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
                user = _props.user,
                onClose = _props.onClose,
                state = _props.state;

            return _react2.default.createElement(
                'div',
                { className: cn('chat-frame') },
                _react2.default.createElement(_title2.default, { user: user, onClose: onClose }),
                _react2.default.createElement(_dialog2.default, { user: user, chatList: this.state.list }),
                _react2.default.createElement(_action2.default, { onSend: this.sendMsg }),
                state !== _context.ImState.connect && _react2.default.createElement(_loading2.default, { title: state.name })
            );
        }
    }]);

    return ChatFrame;
}(_react2.default.Component);

exports.default = ChatFrame;