/**
 * Created by chkui on 2017/7/11.
 */

import React from 'react'
import Title from './title'
import Dialog from './dialog'
import Action from './action'
import Loading from './loading'
import {chatType, UI, ImState} from '../context'
const cn = require('classnames/bind').bind(require('./chatFrame.scss'))

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
class ChatFrame extends React.Component {
    constructor(...props) {
        super(...props)
        this.state = {
            list: [], //消息列表，结构为[{type, msg, timestamp}]
        }
        this.lastTimeBox = 0
        this.onMsg = this.onMsg.bind(this) //收到外部消息的回调
        this.sendMsg = this.sendMsg.bind(this) //发送消息给服务器的方法
        this.props.setOnMsg(this.onMsg)
    }

    shouldComponentUpdate(nextProps, nextState) {
        //只有消息列表发送变更时才进行比对算法,确保list不会发生数据突变
        return (this.props.state !== nextProps.state) || (this.state.list !== nextState.list)
    }

    onMsg(msg, timestamp) {//接收消息
        this.addChatLabel(chatType.receive, msg, timestamp)
    }

    sendMsg(msg, timestamp) { //向外发送消息
        this.props.send(msg, timestamp)
        this.addChatLabel(chatType.send, msg, timestamp)
    }

    addChatLabel(type, msg, timestamp) {//向聊天列表增加一条消息
        const list = this.state.list,
            tempList = []
        //当消息的间隔时间搓大于设定的时间时（UI.timeShowInterval），向消息列表增加时间显示
        timestamp - this.lastTimeBox > UI.timeShowInterval && (() => {
            this.lastTimeBox = timestamp
            const date = new Date(timestamp)
            tempList.push({
                type: chatType.time,
                msg: `${('' + date.getFullYear()).substring(2)}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}`,
                timestamp: timestamp
            })
        })()

        //添加对话消息到消息列表
        tempList.push({
            type: type,
            msg: msg,
            timestamp: timestamp
        })

        //更新列表
        //使用array.concat方法构建一个新队列，保证构建的是一个新实例以防止数据突变
        this.setState({
            list: this.state.list.concat(tempList)
        })
    }

    render() {
        const {style, className, user, onClose, state} = this.props
        return (
            <div style={style} className={cn('chat-frame', className)}>
                <Title user={user} onClose={onClose}/>
                <Dialog user={user} chatList={this.state.list}/>
                <Action onSend={this.sendMsg}/>
                {state !== ImState.connect && <Loading title={state.name}/>}
            </div>
        )
    }
}

export default ChatFrame