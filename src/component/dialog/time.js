/**
 * Created by chkui on 2017/7/13.
 */
import React from 'react'
const cn = require('classnames/bind').bind(require('./time.scss'))
/**
 * 时间显示内容
 * @param props {object}
 * {
 *      {string} time
 * }
 * @constructor
 */
const Time = props=>
    <p className={cn('time')}>{props.time}</p>

export default Time
