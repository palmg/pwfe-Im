/**
 * Created by chkui on 2017/7/11.
 */

import React from 'react'
import Title from './title'
import Dialog from './dialog'
import Action from './action'
import Loading from './loading'
import {chatType, UI} from '../context'
const cn = require('classnames/bind').bind(require('./chatFrame.scss'))

/**
 * 聊天窗口。
 * @param {boolean} mask 用于标记是否显示遮罩层
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
class ChatFrame extends React.Component {
    constructor(...props) {
        super(...props)
        this.state = {
            list: [], //消息列表，结构为[{type, msg, timestamp}]
            mask: true
        }
        this.lastTimeBox = 0
        this.onMsg = this.onMsg.bind(this)
        this.sendMsg = this.sendMsg.bind(this)
        this.props.setOnMsg(this.onMsg)
    }

    componentWillReceiveProps(nextProps) {
        this.props.mask !== nextProps.mask && !nextProps.mask && (() => {
            this.mask = true //标记外部传入了移除mask的消息
            this.closeMask()
        })()
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.mask !== this.state.mask && !nextState.mask) ||
            (this.state.list !== nextState.list)
    }

    componentDidMount() {
        const timer = setTimeout(() => {
            this.timer = true //标记计数器计算完成
            this.closeMask()
            clearTimeout(timer)
        }, UI.mastShowTime)
    }

    closeMask() {
        this.timer && this.mask && this.setState({
            mask: false
        })
    }

    onMsg(msg, timestamp) {//接收消息
        this.addChatLabel(chatType.receive, msg, timestamp)
    }

    sendMsg(msg, timestamp) { //向外发送消息
        this.props.send(msg, timestamp)
        this.addChatLabel(chatType.send, msg, timestamp)
    }

    addChatLabel(type, msg, timestamp) {
        const list = this.state.list,
            tempList = []
        timestamp - this.lastTimeBox > UI.timeShowInterval && (() => {
            this.lastTimeBox = timestamp
            const date = new Date(timestamp)
            tempList.push({
                type: chatType.time,
                msg:`${('' + date.getFullYear()).substring(2)}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}`,
                timestamp: timestamp
            })
        })()
        tempList.push({
            type: type,
            msg:msg,
            timestamp:timestamp
        })

        this.setState({
            list: this.state.list.concat(tempList)
        })
    }

    render() {
        const {user, onClose} = this.props
        return (
            <div className={cn('chat-frame')}>
                <Title user={user} onClose={onClose}/>
                <Dialog user={user} chatList={this.state.list}/>
                <Action onSend={this.sendMsg}/>
                {this.state.mask && <Loading />}
            </div>
        )
    }
}

export default ChatFrame