/**
 * Created by Administrator on 2017/7/11.
 */

import React from 'react'
import Text from './action/text'
const cn = require('classnames/bind').bind(require('./action.scss'))

/**
 * 用户操作框
 * @param {function} onSend:(msg, timestamp)=>{msg:发送的消息，timestamp:时间搓}
 */
class Action extends React.Component {
    constructor(...props) {
        super(...props)
        this.sendHandle = this.sendHandle.bind(this)
    }

    static shouldComponentUpdate() {
        return false
    }

    sendHandle() {
        const text = this.text
        this.props.onSend(this.text.get(), new Date().getTime())
        text.clean()
    }

    render() {
        return (
            <div className={cn('action')}>
                <Text onSend={this.sendHandle} ref={ref => {
                    this.text = ref
                }}/>
                <button onClick={this.sendHandle} className={cn('send')}>发送</button>
            </div>
        )
    }
}

export default Action