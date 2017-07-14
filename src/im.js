/**
 * Created by chkui on 2017/7/10.
 */

import React from 'react'
import ChatFrame from './component/chatFrame'
import {ImState, disconnect, UI} from './context'
import {webSocket} from './net/webSocket'

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
class Im extends React.Component {
    constructor(...props) {
        super(...props)
        this.onMsg = null//子组件获取消息的回调
        this.state = {
            stu: ImState.establish //标记是否显示对话框
        }
        this.fooList = [] //方法处理队列，用于排队处理状态
        this.timer = null //处理队列的间隔回调对象
        this.sendHandle = this.sendHandle.bind(this)
        this.setOnMessage = this.setOnMessage.bind(this)
        this.socketConnectHandle = this.socketConnectHandle.bind(this)
        this.socketMessageHandle = this.socketMessageHandle.bind(this)
        this.socketDisconnectHandle = this.socketDisconnectHandle.bind(this)

        this.socket = webSocket({
            url: this.props.url,
            onConnect: this.socketConnectHandle,
            onMessage: this.socketMessageHandle,
            onDisconnect: this.socketDisconnectHandle
        })
    }

    componentDidMount() {
        this.socket.connect()
    }

    componentWillUnmount() {
        clearInterval(this.timer)
        this.socket.close()
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.stu !== this.state.stu
    }

    socketConnectHandle(e) {//call after establish connect success
        this.setState({stu: ImState.connect})
    }

    socketMessageHandle(msg, e) {//get a message from the server
        this.onMsg(msg, new Date().getTime())
    }

    socketDisconnectHandle(code, msg) {//close webSocket connect
        const _this = this
        switch (code) {
            case disconnect.establishErr:
                this.stateProcess(()=>{
                    this.setState({stu: ImState.establishError})
                })
                break
            case disconnect.serverCancel:
                this.stateProcess(() => {
                    this.setState({stu: ImState.closing})
                })
                this.stateProcess(() => {
                    this.props.onClose()
                })
                break
            default:
        }
    }

    sendHandle(msg, timestamp) {//send message to server
        this.socket.send(msg)
    }

    setOnMessage(foo) {//set a function to handle the message from server
        this.onMsg = foo
    }

    stateProcess(foo) {//状态处理队列
        const fooList = this.fooList
        fooList.push(foo)
        !this.timer && (this.timer = setInterval(() => {
            const _f = fooList.shift()
            _f ? _f() : clearInterval(this.timer)
        }, UI.stateProcessTime))
    }

    render() {
        const {stu} = this.state
        return (
            <ChatFrame state={stu}
                       user={this.props.user}
                       send={this.sendHandle}
                       setOnMsg={this.setOnMessage}
                       onClose={this.props.onClose}/>
        )
    }
}

export default Im