/**
 * Created by chkui on 2017/7/7.
 */

import React from 'react'
import {render} from 'react-dom'
import Im from '../src/im'
import Chat from '../src/chat'
import style from './demo.scss'
import cnTool from 'classnames/bind'

const cn = cnTool.bind(style)

/**
 * 用于演示Im工具的组件。
 * 1）例子同时提供了浏览器源生websocket和socket.io链接的功能。请先启动对应的服务器
 * 2）源生websocket必须在支持websocket的浏览器上使用。而socket.io会根据需要在http和websocket之间切换。
 * 3）
 */
class Demo extends React.Component {
    constructor(...props) {
        super(...props)
        this.state = {
            type: false
        }
        this.popHandle = this.popHandle.bind(this)
        this.cancelHandle = this.cancelHandle.bind(this)
    }

    popHandle(type) {
        this.setState({
            type: type
        })
    }

    cancelHandle() {
        this.setState({
            type: false
        })
    }

    render() {
        const state = this.state
        const Comp = state.type ? (() => {
            switch (state.type) {
                case 'standard': //标准websocket的方式创建聊天窗口
                    return (<Im user={{
                        avatar: standard.avatar,
                        name: standard.name
                    }}
                                url={standard.url}
                                type={state.type}
                                onClose={this.cancelHandle}/>)
                case 'socketIo': //socket.id的方式创建聊天窗口
                    return (<div>
                        <Im user={{
                            avatar: socketIO.user1.avatar,
                            name: socketIO.user1.name
                        }}
                            url={socketIO.user1.url}
                            channel="ackevent"
                            type={state.type}
                            onClose={this.cancelHandle}
                            middleware={{
                                onSend: msg => onSend(msg, socketIO.user2.toId, socketIO.user1.toId),
                                onMsg: msg => onMsg(msg)
                            }}/>
                        <Im style={{left: '20rem'}}
                            user={{
                                avatar: socketIO.user2.avatar,
                                name: socketIO.user2.name
                            }}
                            url={socketIO.user2.url}
                            channel="ackevent"
                            type={state.type}
                            onClose={this.cancelHandle}
                            middleware={{
                                onSend: msg => onSend(msg, socketIO.user1.toId, socketIO.user2.toId),
                                onMsg: msg => onMsg(msg)
                            }}/>
                    </div>)
                case 'static1': //纯静态使用聊天窗口，通过事件设定聊天内容
                case 'static2':
                    //TODO by 昕爷，onHistory是触发获取历史消息回调的接口，
                    return (<Chat user={'static1' === state.type ? {
                        avatar: standard.avatar,
                        name: standard.name
                    } : {
                        avatar: socketIO.user1.avatar,
                        name: socketIO.user1.name
                    }} onHistory={historySimulation}
                                  chatList={'static1' === state.type ? staticComp.chatList : staticComp.modifyChatList}/>)
            }
        })() : null
        return (
            <div>
                <div className={cn('btn-box')}>
                    <button className={cn('btn')} onClick={() => this.popHandle('standard')}>使用标准模式链接</button>
                    <button className={cn('btn')} onClick={() => this.popHandle('socketIo')}>使用socket.id链接</button>
                    <button className={cn('btn')} onClick={() => this.popHandle('static1')}>静态使用聊天窗口</button>
                    {'static1' === state.type && (
                        <button className={cn('btn')} onClick={() => this.popHandle('static2')}>修改数据</button>)}
                </div>
                {Comp}
            </div>
        )
    }
}

//数据转换模板，在组件向服务器发送消息时被调用
const onSend = (msg, fromId, toId) => {
    return JSON.stringify({
        from: {
            userId: fromId,
            userName: U[fromId].userName,
            imgUrl: U[fromId].imgUrl,
            website: fromId,
            description: ""
        },
        to: {
            userId: toId,
            userName: U[toId].userName,
            imgUrl: U[toId].imgUrl,
            website: toId,
            description: ""
        },
        resurl: "跳转URL",
        content: msg
    })
}, onMsg = (msg) => {//数据转换模板，在组件接收到服务器的消息时被调用
    const json = JSON.parse(msg)
    return json.content
}

const date = new Date().getTime(),
    /**
     *
     * @type {{chatList: [*]}}
     */
    staticComp = {
        chatList: [{
            type: 'receive',
            msg: '第一条消息',
            timestamp: date
        }, {
            type: 'receive',
            msg: '第二条消息',
            timestamp: date + 100000
        }, {
            type: 'send',
            msg: '第三条消息',
            timestamp: date + 200000
        }, {
            type: 'receive',
            msg: '第四条消息',
            timestamp: date + 300000
        }],
        modifyChatList: [{
            type: 'receive',
            msg: '第1条消息',
            timestamp: date

        }, {
            type: 'receive',
            msg: '第2条消息',
            timestamp: date + 1000000
        }, {
            type: 'send',
            msg: '第3条消息',
            timestamp: date + 2000000
        }, {
            type: 'receive',
            msg: '第4条消息',
            timestamp: date + 3000000
        }, {
            type: 'receive',
            msg: '第5条消息',
            timestamp: date + 4000000
        }]
    },
    /**
     *
     * @type {{url: string, avatar: string, name: string}}
     */
    standard = {
        url: 'ws://localhost:8181/123456/name/',
        avatar: 'https://file.mahoooo.com/res/file/20170301104952MPDRQN0N2A6QW2L2ZJF6BE995909CE55C7A72876DEE5C6FAE4F5E3@54w_80Q',
        name: '没头脑&不高兴'
    },
    //
    U = {
        "57515612afd1197c49fd7f50": {
            userName: "fengzt",
            imgUrl: "https://file.mahoooo.com/res/file/201704014123953WL3948TMHRTC0LETYK6A713B0EF4AE56FA12096CD60B77E299D9D9"
        },
        "575157d9afd1197c49fd7f51": {
            userName: "aa",
            imgUrl: "https://file.mahoooo.com/res/file/201704014123953WL3948TMHRTC0LETYK6A713B0EF4AE56FA12096CD60B77E299D9D9"
        }
    },
    /**
     *
     * @type {{user1: {toId: string, url: string, avatar: string, name: string}, user2: {toId: string, url: string, avatar: string, name: string}}}
     */
    socketIO = {
        user1: {
            toId: '57515612afd1197c49fd7f50',
            url: 'http://120.27.153.59:9093?userId=575157d9afd1197c49fd7f51', //聊天请求
            avatar: 'https://file.mahoooo.com/res/file/201704014123953WL3948TMHRTC0LETYK6A713B0EF4AE56FA12096CD60B77E299D9D9@54w_80Q',//聊天对象的头像
            name: 'fengzt' //聊天对象名称
        },
        user2: {
            toId: '575157d9afd1197c49fd7f51',
            url: 'http://120.27.153.59:9093?userId=57515612afd1197c49fd7f50', //聊天请求
            avatar: 'https://file.mahoooo.com/res/file/20170301104952MPDRQN0N2A6QW2L2ZJF6BE995909CE55C7A72876DEE5C6FAE4F5E3@54w_80Q',//聊天对象的头像
            name: 'aa' //聊天对象名称
        }
    },
    historySimulation = () => {
        return [{
            type: 'receive',
            msg: '来啊，造作啊',
            timestamp: new Date().getTime() - 10000000
        }, {
            type: 'send',
            msg: '聊天啊，造作啊',
            timestamp: new Date().getTime() - 10001000
        }, {
            type: 'send',
            msg: 'hh，33',
            timestamp: new Date().getTime() - 10002000
        }, {
            type: 'receive',
            msg: '你是谁？？',
            timestamp: new Date().getTime() - 10003000
        }, {
            type: 'receive',
            msg: '111？？',
            timestamp: new Date().getTime() - 10004000
        }, {
            type: 'receive',
            msg: '222？？',
            timestamp: new Date().getTime() - 10005000
        }, {
            type: 'receive',
            msg: '333？？',
            timestamp: new Date().getTime() - 10006000
        }, {
            type: 'send',
            msg: '444？？',
            timestamp: new Date().getTime() - 10007000
        }, {
            type: 'send',
            msg: '555？？',
            timestamp: new Date().getTime() - 10008000
        }, {
            type: 'receive',
            msg: '666？？',
            timestamp: new Date().getTime() - 10009000
        },{
            type: 'send',
            msg: '777？？',
            timestamp: new Date().getTime() - 10010000
        },{
            type: 'receive',
            msg: '888？？',
            timestamp: new Date().getTime() - 10011000
        },{
            type: 'send',
            msg: '999？？',
            timestamp: new Date().getTime() - 10012000
        },{
            type: 'send',
                msg: '00000？？',
                timestamp: new Date().getTime() - 10013000
        }]
    }
render(<Demo/>, document.getElementById('root'))

