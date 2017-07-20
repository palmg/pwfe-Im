/**
 * Created by chkui on 2017/7/10.
 */

import React from 'react'
import ChatFrame from './component/chatFrame'
import {ImState, disconnect, UI, SocketType} from './context'
import {webSocket} from './net/webSocket'

/**
 * IM入口组件，用于创建聊天窗口。
 * @param {object} style: 样式
 * @param {string} className: css样式
 * @param {object} user 聊天对象信息，结构为：
 * {
 *      avatar:用户头像
 *      name:用户昵称
 * }
 * @param {string} url:服务器连接地址。切记标记ws相关的协议名称。如 ws://localhost:8080/path或wss://localhost:8080
 * @param {string} type:websocket的模式'standard'|'socketIo'。默认为'standard'
 *                 standard :按照w3c规范实现，使用浏览器底层接口。只能在可支持的浏览器上使用。
 *                 socketIo :使用https://socket.io/实现，对浏览器又更好的兼容性。但是需要后台服务器也是要对应的方案。
 * @param {function} onClose 用户点击关闭按钮。点击关闭按钮是否关闭聊天窗口由业务层决定。{show && <Im />}
 * @param {string} channel 链接频道，socket.io用于标记链接频道。需要根据服务器配置
 * @param {object} middleware 用于处理收发消息的中间件。可以在收到会发送消息的时候对消息本身进行处理。结构为{
 *      onSend:(msg)=>{return //}发送消息的中间件，当触发发送消息时该方法会被调用，返回的内容即是发送的消息，必须是字符串。
 *      onMsg:(msg)=>{return //}收到消息的中间件，需要将信息转换为可用于展示的字符串。
 * } 所有的中间件，返回false表示不执行，返回true表示执行原始消息
 */
class Im extends React.Component {
    constructor(...props) {
        super(...props)
        const params = this.props,
            middleware = params.middleware || {}
        this.onMsg = null//子组件获取消息的回调
        this.state = {
            stu: ImState.establish //标记是否显示对话框
        }
        this.fooList = [] //方法处理队列，用于排队处理状态
        this.timer = null //处理队列的间隔回调对象
        this.middleware = {//用于处理消息的中间件
            onSend: middleware && middleware.onSend ? middleware.onSend : () => {
                return true
            },
            onMsg: middleware && middleware.onMsg ? middleware.onMsg : () => {
                return true
            }
        }
        this.sendHandle = this.sendHandle.bind(this)
        this.setOnMessage = this.setOnMessage.bind(this)
        this.socketConnectHandle = this.socketConnectHandle.bind(this)
        this.socketMessageHandle = this.socketMessageHandle.bind(this)
        this.socketDisconnectHandle = this.socketDisconnectHandle.bind(this)

        this.socket = webSocket({
            url: params.url,
            channel: params.channel,
            onConnect: this.socketConnectHandle,
            onMessage: this.socketMessageHandle,
            onDisconnect: this.socketDisconnectHandle
        }, SocketType[this.props.type])
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
        executeMsgOpt(msg, this.middleware.onMsg(msg), this.onMsg)
    }

    socketDisconnectHandle(code, msg) {//close webSocket connect
        const _this = this
        switch (code) {
            case disconnect.establishErr:
                this.stateProcess(() => {
                    this.setState({stu: ImState.establishError})
                })
                this.stateProcess(() => {
                    this.setState({stu: ImState.closing})
                })
                this.stateProcess(() => {
                    this.props.onClose()
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
        executeMsgOpt(msg, this.middleware.onSend(msg), this.socket.send)
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
        const {style, className} = this.props,
            {stu} = this.state
        return (
            <ChatFrame style={style}
                       className={className}
                       state={stu}
                       user={this.props.user}
                       send={this.sendHandle}
                       setOnMsg={this.setOnMessage}
                       onClose={this.props.onClose}/>
        )
    }
}

Im.defaultProps = {
    type: 'standard'
};

/**
 * 信息操作枚举标记
 * @type {{NONE: number, STOP: number, MODIFY: number}}
 */
const MsgOptType = {
        NONE: 1, //什么都不修改，返回原有数据
        STOP: 2, //不执行
        MODIFY: 3 //使用返回的数据触发消息
    },
    /**
     * 处理消息
     * @param originMsg
     * @param modifyMsg
     * @param foo
     * @returns {number}
     */
    executeMsgOpt = (originMsg, modifyMsg, foo) => {
        const type = typeof modifyMsg,
            opt = (null === modifyMsg || 'undefined' === type || 'boolean' === type) ? (modifyMsg && (()=>{
                foo(originMsg, new Date().getTime())
            })()) : foo(modifyMsg, new Date().getTime())
    }


export default Im