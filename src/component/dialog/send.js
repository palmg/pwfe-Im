/**
 * Created by chkui on 2017/7/12.
 */

import React from 'react'
import {msgType,chatType} from '../../context'
import ImgMsg from './imgMsg'
import FileMsg from './fileMsg'
/**
 *
 * @param props {object}
 * {
 *    {string} chat 发送内容
 *    {number} timestamp 时间搓
 * }
 * @constructor
 */
const Send = props => {
    const msg = (() => {
        let chat = props.chat;
        try{chat = JSON.parse(chat)}
        catch(e){}
        switch (msgType[chat.msgType]) {
            case msgType.img:
                return <ImgMsg url={chat.url} type={chatType.send}/>
            case msgType.file:
                return <FileMsg url={chat.url} name={chat.name} type={chatType.send}/>
            case msgType.text:
            default:
                return <p style={s_text} dangerouslySetInnerHTML={{__html: chat}}/>
        }
    })();
    return (<div style={s_send}>
        <div style={s_chat}>{msg}</div>
        <div style={s_arrow}/>
    </div>)
}
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
        background: '#6092E0',
        borderRadius: '3px',
        fontSize: '.6rem',
        color: '#FFFFFF',
        lineHeight: '1.2rem'
    },
    s_arrow = {
        position: 'absolute',
        zIndex: -1,
        transform: 'rotate(45deg)',
        margin: 'auto',
        top: 0,
        bottom: 0,
        right: '.5rem',
        width: '.6rem',
        height: '.6rem',
        background: '#6092E0'
    },
    s_text = {
        padding: '0 .8rem',
    }