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
        this.handleWheel = this.handleWheel.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return this.props.chatList !== nextProps.chatList //只有聊天列表变更时才出现执行比对更新
    }

    componentDidUpdate(prevProps, prevState) { //保持右侧的滚动条一直在最下方
        //TODO 陈俊昕 判断消息列表的状态是“加载历史记录”还是“发送信息或收到新信息”
        if(prevProps.chatList[0] && prevProps.chatList[0].msg != this.props.chatList[0] && this.props.chatList[0].msg){ //加载了历史记录
            const {dom} = this;
            dom.scrollTop = 0;
        }else { //发送了信息或收到了新信息
            const {dom} = this;
            dom.scrollTop = dom.scrollHeight;
        }
    }

    // TODO 陈俊昕
    handleWheel(event){ //鼠标滚动监听
        const {dom} = this;
        let deta = event.deltaY;
        if(dom.scrollTop == 0){ //滚动条在顶端时
            if(deta < 0){ //鼠标向上滚动
                this.props.onHistory();
            }
        }
    }

    render() {
        const {chatList, user} = this.props
        return (
            <div onWheel={this.handleWheel} style={s_dialog} ref={ref => {
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
    overflowX: 'hidden',
    position: 'relative',
    paddingTop:'.8rem'
}