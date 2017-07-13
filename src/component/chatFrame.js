/**
 * Created by chkui on 2017/7/11.
 */

import React from 'react'
import Title from './title'
import Dialog from './dialog'
import Action from './action'
import {chatType} from '../context'
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
            list: [] //消息列表，结构为[{type, msg, timestamp}]
        }
        this.onMsg = this.onMsg.bind(this)
        this.sendMsg = this.sendMsg.bind(this)
        this.props.setOnMsg(this.onMsg)
    }

    onMsg(msg, timestamp) {//接收消息
        this.setState({
            list: this.state.list.concat([{
                type: chatType.receive,
                msg: msg,
                timestamp: timestamp
            }])
        })
    }

    sendMsg(msg, timestamp) { //向外发送消息
        this.props.send(msg, timestamp)
        this.setState({
            list: this.state.list.concat([{
                type: chatType.send,
                msg: msg,
                timestamp: timestamp
            }])
        })
    }

    render() {
        const user = this.props.user
        return (
            <div className={cn('chat-frame')}>
                <Title user={user}/>
                <Dialog user={user} chatList={this.state.list}/>
                <Action onSend={this.sendMsg}/>
            </div>
        )
    }
}

export default ChatFrame