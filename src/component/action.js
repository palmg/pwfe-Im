/**
 * Created by Administrator on 2017/7/11.
 */

import React from 'react'
import Text from './action/text'

/**
 * 下方的操作框
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

        const text = this.text,
            msg = text.get()
        msg && '' !== msg.replace(/\s+/g, '') && this.props.onSend(msg, new Date().getTime())
        text.clean()
    }

    render() {
        return (
            <div style={s_action}>
                <Text onSend={this.sendHandle} ref={ref => {
                    this.text = ref
                }}/>
                {/*<button style={s_send} onClick={this.sendHandle}>发送</button>*/}
            </div>
        )
    }
}
export default Action
const s_action = {
    height: '7rem',
    backgroundColor: '#FFFFFF'
}, s_send = {
    float: 'right',
    width: '5rem',
    height: '1.75rem',
    background: '#F8F8F8',
    border: 0,
    marginRight: '1rem',
    cursor: 'pointer'
}