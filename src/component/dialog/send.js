/**
 * Created by chkui on 2017/7/12.
 */

import React from 'react'
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
    <div style={s_send}>
        <p style={s_chat}>{props.chat}</p>
        <div style={s_arrow}/>
    </div>
export default Send
const s_send = {
        marginBottom: '.5rem',
        position: 'relative',
        padding: '0 .8rem 0 2.5rem',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    s_chat = {
        margin: 0,
        maxWidth: '14rem',
        wordBreak: 'break-all',
        padding: '.5rem .8rem',
        background: '#6092E0',
        borderRadius: '3px',
        fontSize: '.6rem',
        color: '#FFFFFF',
        lineHeight: '1.2rem'
    },
    s_arrow = {
        position: 'absolute',
        zIndex: 3,
        transform: 'rotate(45deg)',
        margin: 'auto',
        top: 0,
        bottom: 0,
        right: '.5rem',
        width: '.6rem',
        height: '.6rem',
        background: '#6092E0'
    }