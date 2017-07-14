/**
 * Created by chkui on 2017/7/11.
 */

import React from 'react'
const cn = require('classnames/bind').bind(require('./title.scss'))

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

    static shouldComponentUpdate(){
        return false //任何情况都不执行比对算法
    }

    closeHandle(e) {
        const close = this.props.onClose
        close && close()
    }

    render() {
        const user = this.props.user
        return (
            <div className={cn('title')}>
                <img className={cn('img')} src={user.avatar}/>
                <div className={cn('inline', 'name')}>{user.name}</div>
                <div className={cn('inline', 'close')} onClick={this.closeHandle}/>
            </div>
        )
    }
}

export default Title