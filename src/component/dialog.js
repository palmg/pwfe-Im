/**
 * Created by chkui on 2017/7/11.
 */

import React from 'react'
import Receive from './dialog/receive'
import Send from './dialog/send'
import Time from './dialog/time'
import {chatType} from '../context'

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
class Dialog extends React.Component {
    constructor(...props) {
        super(...props)
    }

    shouldComponentUpdate(nextProps) {
        return this.props.chatList !== nextProps.chatList //只有聊天列表变更时才出现执行比对更新
    }

    componentDidUpdate(prevProps, prevState) { //保持右侧的滚动条一直在最下方
        const {dom} = this
        dom.scrollTop = dom.scrollHeight
    }

    render() {
        const {chatList, user} = this.props
        return (
            <div style={s_dialog} ref={ref => {
                this.dom = ref
            }}>
                {chatList && chatList.map(i => {
                    switch (i.type) {
                        case chatType.time:
                            return <Time key={`Time${i.timestamp}`} time={i.msg}/>
                        case chatType.receive:
                            return <Receive key={`Receive${i.timestamp}`} user={user} chat={i.msg}
                                            timestamp={i.timestamp}/>
                        default:
                            return <Send key={`Send${i.timestamp}`} chat={i.msg} timestamp={i.timestamp}/>
                    }
                })}
            </div>
        )
    }
}
export default Dialog
const s_dialog = {
    flexGrow: 2,
    overflowY: 'auto',
    overflowX: 'hidden'
}