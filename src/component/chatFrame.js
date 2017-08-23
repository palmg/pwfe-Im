/**
 * Created by chkui on 2017/7/11.
 */

import React from 'react'
import Title from './title'
import Dialog from './dialog'
import Action from './action'
import Loading from './loading'
import {chatType, UI, ImState} from '../context'

/**
 * 聊天窗口。
 * @param {object} state 当前外部加载状态，context.ImState中的所有值。
 * @param {array} chatList 聊天列表，用于在窗口创建只时候就显示聊天内容。结构为:[{
 *      type: ['receive'|'send'] receive表示接受到的消息，send表示本地发送出去的消息
 *      msg: '' 消息内容
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
 *      msg: '' 消息内容
 *      timestamp: 时间搓
 *  }])}
 * @param {function} onClose 点击关闭时触发 ()=>{}
 */
class ChatFrame extends React.Component {
    constructor(...props) {
        super(...props)
        const params = this.props
        this.state = {
            list: [], //消息列表，结构为[{type, msg, timestamp}]
        }
        this.lastTimeBox = 0 //最后一次添加消息框的位置
        this.onMsg = this.onMsg.bind(this) //收到外部消息的回调
        this.sendMsg = this.sendMsg.bind(this) //发送消息给服务器的方法
        params.setOnMsg && params.setOnMsg(this.onMsg)
        this.historyHandle = this.historyHandle.bind(this);
        this.setChatList = this.setChatList.bind(this);
        this.historyCallback = this.historyCallback.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState) {
        //只有消息列表发送变更时才进行比对算法,确保list不会发生数据突变
        const props = this.props
        return (props.user !== nextState.user) ||
            (props.state !== nextProps.state) ||
            (this.state.list !== nextState.list)
    }

    componentWillReceiveProps(nextProps) {
        this.props.chatList !== nextProps.chatList && this.setChatList(nextProps.chatList)
    }

    componentDidMount() {
        const chatList = this.props.chatList
        chatList && this.setChatList(chatList)
        this.props.onHistory(this.historyCallback);
    }

    onMsg(msg, timestamp) {//接收消息
        this.addChatLabel(chatType.receive, msg, timestamp)
    }

    sendMsg(msg, timestamp) { //向外发送消息
        const send = this.props.send
        send && send(msg, timestamp)
        this.addChatLabel(chatType.send, msg, timestamp)
    }

    historyCallback(hisList){
        let msgList = [];
        for (let chat of hisList) {
            this.processOneChat(msgList, chatType[chat.type], chat.msg, chat.timestamp)
        }
        this.setState({
            list: msgList.concat(this.state.list)
        })
    }

    historyHandle() {
        //TODO 昕爷，使用这个列表去更新聊天样式，现在修改为回调触发
        this.props.onHistory(this.historyCallback);

        //TODO this.setState() 使用hisList改变状态，更新历史信息列表
        //this.processOneChat用于向聊天队列尾部添加聊天消息，可以参考调整向聊天队列队首增加内容
        //
    }

    setChatList(chatList) { //处理外部传入的聊天列表
        const showList = []
        for (let chat of chatList) {
            this.processOneChat(showList, chatType[chat.type], chat.msg, chat.timestamp)
        }
        this.setState({
            list: showList
        })
    }

    processOneChat(list, type, msg, timestamp) {
        //当消息的间隔时间搓大于设定的时间时（UI.timeShowInterval），向消息列表增加时间显示
        timestamp - this.lastTimeBox > UI.timeShowInterval && (() => {
            this.lastTimeBox = timestamp
            const date = new Date(timestamp)
            list.push({
                type: chatType.time,
                msg: `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${date.getHours()}:${processMinutes(date.getMinutes())}`,
                timestamp: timestamp
            })
        })()

        //添加对话消息到消息列表
        list.push({
            type: type,
            msg: msg,
            timestamp: timestamp
        })
    }

    addChatLabel(type, msg, timestamp) {//向聊天列表增加一条消息
        const list = this.state.list,
            tempList = []
        this.processOneChat(tempList, type, msg, timestamp)
        //更新列表
        //使用array.concat方法构建一个新队列，保证构建的是一个新实例以防止数据突变
        this.setState({
            list: this.state.list.concat(tempList)
        })
    }

    render() {
        const {style, className, user, onClose, state} = this.props,
            s_style = Object.assign({}, style, s_chatFrame)
        //TODO, 昕爷。onHistory触发historyHandle事件
        return (
            <div style={s_style} className={className ? className : ''}>
                <Title user={user} onClose={onClose}/>
                <Dialog user={user} chatList={this.state.list} onHistory={this.historyHandle}/>
                <Action onSend={this.sendMsg}/>
                {state !== ImState.connect && <Loading title={state.name}/>}
            </div>
        )
    }
}

/**
 * 处理分钟
 * @param minutes
 * @returns {string}
 */
const processMinutes = (minutes) => {
    return 10 > minutes ? '0' + minutes : minutes
}
const s_chatFrame = {
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
}
export default ChatFrame