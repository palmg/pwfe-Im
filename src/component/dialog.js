/**
 * Created by chkui on 2017/7/11.
 */

import React from 'react'
import Receive from './dialog/receive'
import Send from './dialog/send'
import Time from './dialog/time'
import {chatType} from '../context'
const cn = require('classnames/bind').bind(require('./dialog.scss'))

/**
 * 聊天显示框
 * @param {object} user用户信息，结构为:
 *   {
 *      avatar:用户头像
 *      name:用户昵称
 *      id:用户对应的标记id
 *    }
 * @param {array} chatList 聊天的列表信息:
 * [{
 *      type:消息类型,
 *      msg:消息内容,
 *      timestamp:消息产生的时间搓
 * }]
 */
class Dialog extends React.Component{
    constructor(...props){
        super(...props)
    }

    shouldComponentUpdate(nextProps){
        return this.props.chatList !== nextProps.chatList
    }

    componentDidUpdate(prevProps, prevState){
        const {dom} = this
        dom.scrollTop = dom.scrollHeight
    }

    render(){
        const {chatList, user} = this.props
        return(
            <div className={cn('dialog')} ref={ref=>{this.dom = ref}}>
                {chatList && chatList.map(i=>{
                    switch (i.type){
                        case chatType.time:
                            return <Time key={`Time${i.timestamp}`} time={i.msg}/>
                        case chatType.receive:
                            return <Receive key={`Receive${i.timestamp}`} user={user} chat={i.msg} timestamp={i.timestamp} />
                        default:
                            return <Send key={`Send${i.timestamp}`} chat={i.msg} timestamp={i.timestamp}/>
                    }
                })}
            </div>
        )
    }
}

export default Dialog