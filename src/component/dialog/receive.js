/**
 * Created by chkui on 2017/7/12.
 */
import React from 'react'
const cn = require('classnames/bind').bind(require('./recive.scss'))

/**
 * 收取消息的弹窗
 * @param {object} user 用户相关信息,结构为:{avatar:''}//头像
 * @param {string} chat 接收内容
 * @param {number} timestamp 时间搓
 */
class Receive extends React.Component {
    constructor(...props) {
        super(...props)
    }

    render() {
        const {user, chat} = this.props
        return (
            <div className={cn('receive')}>
                <img className={cn('avatar')} src={user.avatar}/>
                <p className={cn('chat')}>{chat}</p>
                <div className={cn('arrow')}/>
            </div>
        )
    }
}

export default Receive