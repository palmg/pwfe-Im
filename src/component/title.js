/**
 * Created by chkui on 2017/7/11.
 */

import React from 'react'

/**
 * 标题内容
 * @param {object} user 用户信息：
 *   {
 *      avatar:用户头像
 *      name:用户昵称
 *      id:用户对应的标记id
 *    }
 * @param {function} onClose 聊天窗口关闭事件()=>{}
 */
class Title extends React.Component {
    constructor(...props) {
        super(...props)
        this.closeHandle = this.closeHandle.bind(this)
    }

    static shouldComponentUpdate() {
        return false //任何情况都不执行比对算法
    }

    closeHandle(e) {
        const close = this.props.onClose
        close && close()
    }

    render() {
        const user = this.props.user
        return (
            <div style={s_title}>
                <img style={s_img} src={user.avatar}/>
                <div style={s_name}>{user.name}</div>
                <div style={s_close} onClick={this.closeHandle}>
                    <div style={s_before}/>
                    <div style={s_after}/>
                </div>
            </div>
        )
    }
}
export default Title
const s_title = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
        width: '100%',
        height: '3rem',
        backgroundColor: '#EEEEEE'
    },
    s_img = {
        margin: '0 1rem',
        width: '1.5rem',
        height: '1.5rem',
        borderRadius: '50%'
    },
    s_name = {
        flexGrow: 2,
        fontSize: '.6rem',
        color: '#333333'
    },
    s_close = {
        position: 'relative',
        width: '2.35rem',
        height: '2.35rem',
        transform: 'rotate(45deg)',
        cursor: 'pointer'
    },
    s_close_fix = {
        position: 'absolute',
        background: '#ccc',
        margin: 'auto',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    s_before = Object.assign({}, s_close_fix, {
        width: '1rem',
        height: '.05rem'
    }),
    s_after = Object.assign({}, s_close_fix, {
        width: '.05rem',
        height: '1rem'
    })