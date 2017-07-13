/**
 * Created by chkui on 2017/7/12.
 */

import React from 'react'
const cn = require('classnames/bind').bind(require('./send.scss'))

/**
 * 显示本人发布的单条消息
 * @param {string} chat 发送内容
 * @param {number} timestamp 时间搓
 */
class Send extends React.Component{
    constructor(...props){
        super(...props)
    }

    render(){
        const {chat} = this.props
        return(
            <div className={cn('send')}>
                <p className={cn('chat')}>{chat}</p>
                <div className={cn('arrow')}/>
            </div>
        )
    }
}

export default Send