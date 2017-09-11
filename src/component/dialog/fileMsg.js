/**
 * Created by luodh on 2017/9/7.
 */
import React from 'react'
import {chatType} from '../../context'
import {file,fileffffff,download,downloadffffff} from '../../res/img'

/**
 * 文件类型的消息
 * @param props {object}
 * {
 *    {string} type 消息的类型
 *    {string} url 文件的url
 *    {string} name 文件名称
 * }
 * @constructor
 */
const FileMsg = props => {
    let fileIcon,downIcon;
    if (props.type === chatType.send) {
        fileIcon = fileffffff;
        downIcon=downloadffffff;
    } else {
        fileIcon = file;
        downIcon=download;
    }
    return <div style={s_msg}>
        <div style={s_file}>
            <img style={s_file_icon} src={fileIcon}/>
            <span>{props.name}</span>
        </div>
        <div style={s_download}><a target='_blank' href={props.url}><img
            style={s_dl_icon} src={downIcon}/></a></div>
    </div>
}
export default FileMsg

const s_msg = {width: '205px', height: '140px', position: 'relative', borderRadius: '4px'},
    s_file = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '140px',
        textAlign: "center",
        fontSize: '14px'
    },
    s_file_icon = {marginBottom: '12px', width: '50px'},
    s_download = {position: 'absolute', bottom: '10px', right: '10px', borderRadius: '5px'},
    s_dl_icon = {width: '15px'}