/**
 * Created by chkui on 2017/7/10.
 */

import React from 'react'
import ChatFrame from './component/chatFrame'
import {ImState} from './context'
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
            stu: ImState.closed //标记是否显示对话框
        }
        this.sendHandle = this.sendHandle.bind(this)

        this.setOnMessage = this.setOnMessage.bind(this)
        this.socketConnectHandle = this.socketConnectHandle.bind(this)
        this.socketMessageHandle = this.socketMessageHandle.bind(this)
        this.socketCloseHandle = this.socketCloseHandle.bind(this)

        this.socket = webSocket({
            url: this.props.url,
            onConnect: this.socketConnectHandle,
            onMessage: this.socketMessageHandle,
            onClose: this.socketCloseHandle
        })
    }

    componentDidMount() {
        this.socketEstablish()
    }

    componentWillUnmount(){
        this.socket.close()
        //this.setState({stu: ImState.closing})
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.stu !== this.state.stu
    }

    socketEstablish() { //begin establish connect
        this.setState({stu: ImState.establish})
        this.socket.connect()
    }

    socketConnectHandle(e) {//call after establish connect success
        this.setState({stu: ImState.connect})
    }

    socketMessageHandle(msg, e) {//get a message from the server
        this.onMsg(msg, new Date().getTime())
    }

    socketCloseHandle(e) {//close webSocket connect
        //this.setState({stu: ImState.closed})
    }

    sendHandle(msg, timestamp) {//send message to server
        this.socket.send(msg)
    }

    setOnMessage(foo) {//set a function to handle the message from server
        this.onMsg = foo
    }

    render() {
        const {stu} = this.state
        return stu === ImState.closed || stu === ImState.closing ? (null) :
            (<ChatFrame mask={stu === ImState.establish}
                        user={this.props.user}
                        send={this.sendHandle}
                        setOnMsg={this.setOnMessage}
                        onClose={this.props.onClose}/>)
    }
}

export default Im