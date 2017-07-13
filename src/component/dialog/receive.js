/**
 * Created by chkui on 2017/7/12.
 */
import React from 'react'
const cn = require('classnames/bind').bind(require('./recive.scss'))

/**
 * 收取消息的窗口
 * @param props {object}
 * {
 *      {object} user 用户相关信息,结构为:{avatar:''}//头像
 *      {string} chat 接收内容
 *      {number} timestamp 时间搓
 * }
 * @constructor
 */
const Receive = props =>
    <div className={cn('receive')}>
        <img className={cn('avatar')} src={props.user.avatar}/>
        <p className={cn('chat')}>{props.chat}</p>
        <div className={cn('arrow')}/>
    </div>

export default Receive