/**
 * Created by chkui on 2017/7/12.
 */

import React from 'react'
const cn = require('classnames/bind').bind(require('./send.scss'))

/**
 *
 * @param props {object}
 * {
 *    {string} chat 发送内容
 *    {number} timestamp 时间搓
 * }
 * @constructor
 */
const Send = props =>
    <div className={cn('send')}>
        <p className={cn('chat')}>{props.chat}</p>
        <div className={cn('arrow')}/>
    </div>

export default Send