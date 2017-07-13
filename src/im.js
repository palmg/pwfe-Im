/**
 * Created by chkui on 2017/7/10.
 */

import React from 'react'
import ChatFrame from './component/chatFrame'
import {ImState} from './context'
import {webSocket} from './net/webSocket'

/**
 * IM入口组件，用于创建聊天窗口。
 * 1）切记不要直接销毁组件，请将show设置为false来关闭，组件会一同websocket链接
 * @param {object} user 聊天对象信息，结构为：
 * {
 *      avatar:用户头像
 *      name:用户昵称
 *      id:用户对应的标记id
 * }
 * @param url:服务器连接地址。切记标记ws相关的协议名称。如 ws://localhost:8080/path或wss://localhost:8080
 * @param {boolean} show 标记是否显示对话弹出框，默认为false。当将其设置为true时尝试建立connect链接并显示窗口。
 */
class Im extends React.Component {
    constructor(...props) {
        super(...props)
        this.onMsg = null//子组件获取消息的回调
        this.state = {
            stu: ImState.closed //标记是否显示对话框
        }
        this.sendHandle = this.sendHandle.bind(this)

        this.setOnMessage = this.setOnMessage.bind(this)
        this.closeHandle = this.closeHandle.bind(this)
        this.socketConnectHandle = this.socketConnectHandle.bind(this)
        this.socketMessageHandle = this.socketMessageHandle.bind(this)
        this.socketCloseHandle = this.socketCloseHandle.bind(this)

        this.socket = webSocket({
            url:this.props.url,
            onConnect:this.socketConnectHandle,
            onMessage:this.socketMessageHandle,
            onClose:this.socketCloseHandle
        })
    }

    componentDidMount() {
        this.props.show && this.socketEstablish()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.show !== nextProps.show) {
            nextProps.show ? this.socketEstablish() : this.close()
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.stu !== this.state.stu
    }

    socketEstablish() { //开始建立接连
        this.setState({stu: ImState.establish})
        this.socket.connect()
    }

    socketConnectHandle(e){//创建连接成功的回调
        this.setState({stu: ImState.connect})
    }

    socketMessageHandle(msg, e) {//接收消息
        this.onMsg(msg, new Date().getTime())
    }

    socketCloseHandle(e){//链接关闭

    }
    socketClose() {
        //TODO 关闭websocket链接，还未实现websocket
        this.setState({stu: ImState.closing})
        const _this = this,
            timer = setTimeout(() => {
                _this.setState({stu: ImState.closed})
                clearTimeout(timer)
            }, 1000) //TODO 模拟关闭链接测试
    }

    sendHandle(msg, timestamp) {//TODO websocket发送消息方法
        this.socket.send(msg)
    }

    closeHandle() { //TODO 聊天窗口关闭事件

    }

    setOnMessage(foo) {
        this.onMsg = foo
    }

    render() {
        const {stu} = this.state
        return stu === ImState.closed || stu === ImState.closing ? (null) :
            (<ChatFrame mask={stu === ImState.establish}
                        user={this.props.user}
                        send={this.sendHandle}
                        setOnMsg={this.setOnMessage}
                        onClose={this.closeHandle}/>)
    }
}

export default Im