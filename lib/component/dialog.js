'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _receive = require('./dialog/receive');

var _receive2 = _interopRequireDefault(_receive);

var _send = require('./dialog/send');

var _send2 = _interopRequireDefault(_send);

var _time = require('./dialog/time');

var _time2 = _interopRequireDefault(_time);

var _context = require('../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by chkui on 2017/7/11.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * 聊天显示框
 * @param {object} user用户信息，结构为:
 *   {
 *      avatar:用户头像
 *      name:用户昵称
 *    }
 * @param {array} chatList 聊天的列表信息:
 * [{
 *      type:消息类型,
 *      msg:消息内容,
 *      timestamp:消息产生的时间搓
 * }]
 * @param {function} onHistory 获取历史消息的处理器，当用户在界面上触发历史消息的事件时，这个接口会被调用
 *  方法返回的数据就是回调历史数据，结构和chatList类似： ()=>{return [{
 *      type: ['receive'|'send'] receive表示接受到的消息，send表示本地发送出去的消息
 *      msg: '' 消息内容
 *      timestamp: 时间搓
 *  }]}
 */
var Dialog = function (_React$Component) {
    _inherits(Dialog, _React$Component);

    function Dialog() {
        var _ref;

        _classCallCheck(this, Dialog);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call.apply(_ref, [this].concat(props)));

        _this.handleWheel = _this.handleWheel.bind(_this);
        return _this;
    }

    _createClass(Dialog, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            return this.props.chatList !== nextProps.chatList; //只有聊天列表变更时才出现执行比对更新
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            //保持右侧的滚动条一直在最下方
            //TODO 陈俊昕 判断消息列表的状态是“加载历史记录”还是“发送信息或收到新信息”
            if (prevProps.chatList[0] && prevProps.chatList[0].msg != this.props.chatList[0] && this.props.chatList[0].msg) {
                //加载了历史记录
                var dom = this.dom;

                dom.scrollTop = 0;
            } else {
                //发送了信息或收到了新信息
                var _dom = this.dom;

                _dom.scrollTop = _dom.scrollHeight;
            }
        }

        // TODO 陈俊昕

    }, {
        key: 'handleWheel',
        value: function handleWheel(event) {
            //鼠标滚动监听
            var dom = this.dom;

            var deta = event.deltaY;
            if (dom.scrollTop == 0) {
                //滚动条在顶端时
                if (deta < 0) {
                    //鼠标向上滚动
                    this.props.onHistory();
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                chatList = _props.chatList,
                user = _props.user;

            return _react2.default.createElement(
                'div',
                { onWheel: this.handleWheel, style: s_dialog, ref: function ref(_ref2) {
                        _this2.dom = _ref2;
                    } },
                chatList && chatList.map(function (i) {
                    switch (i.type) {
                        case _context.chatType.time:
                            return _react2.default.createElement(_time2.default, { key: 'Time' + i.timestamp, time: i.msg });
                        case _context.chatType.receive:
                            return _react2.default.createElement(_receive2.default, { key: 'Receive' + i.timestamp, user: user, chat: i.msg,
                                timestamp: i.timestamp });
                        default:
                            return _react2.default.createElement(_send2.default, { key: 'Send' + i.timestamp, chat: i.msg, timestamp: i.timestamp });
                    }
                })
            );
        }
    }]);

    return Dialog;
}(_react2.default.Component);

exports.default = Dialog;

var s_dialog = {
    flexGrow: 2,
    overflowY: 'auto',
    overflowX: 'hidden',
    position: 'relative',
    paddingTop: '.8rem'
};