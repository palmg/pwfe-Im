/**
 * Created by luodh on 2017/9/7.
 */
import React from 'react'
import {downloadffffff} from '../../res/img'
import {msgType, chatType} from '../../context'

/**
 * 图片消息
 * @param props {object}
 * {
 *    {string} type 消息的类型(无用)
 *    {string} url 图片的url
 * }
 * @constructor
 */
const ImgMsg = props =>
    <div style={s_msg}>
        <img style={s_img} src={props.url}/>
        <div style={s_download}>
            <a target='_blank' href={props.url}><img style={s_dl_icon} src={downloadffffff}/></a>
        </div>
    </div>
export default ImgMsg

const s_msg = {width: '205px', height: '140px', position: 'relative', borderRadius: '4px'},
    s_img = {width: '205px', height: '140px', borderRadius: '4px'},
    s_download = {
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        background: 'rgba(0,0,0,.7)',
        borderRadius: '5px'
    },
    s_dl_icon = {width: '15px', margin: "4px 5px 0"}