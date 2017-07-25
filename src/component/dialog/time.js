/**
 * Created by chkui on 2017/7/13.
 */
import React from 'react'
/**
 * 时间显示内容
 * @param props {object}
 * {
 *      {string} time
 * }
 * @constructor
 */
const Time = props =>
    <p style={s_time}>{props.time}</p>
export default Time
const s_time = {
    textAlign: 'center',
    fontSize: '.6rem',
    color: '#999999',
    margin: '.5rem 0 .2rem 0'
}