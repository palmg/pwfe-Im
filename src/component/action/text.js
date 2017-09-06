/**
 * Created by chkui on 2017/7/12.
 */
import React from 'react'
/**
 * 聊天文字输入框。非受控组件
 * 1）可以通过ref.get()的获取聊天内容
 * 2）可以通过ref.clean()清除内容
 * @param {function} onSend()
 */
class Text extends React.Component {
    constructor(...props) {
        super(...props)
        this.keyDownHandle = this.keyDownHandle.bind(this)
    }

    get() {
        return this.dom.value
    }

    clean() {
        this.dom.value = ''
        return this
    }

    keyDownHandle(e) {
        e && e.keyCode === 13 && this.dom.value && this.props.onSend()
    }

    render() {
        return (
            <textarea style={s_text} ref={ref => {
                this.dom = ref
            }} onKeyDown={this.keyDownHandle} placeholder="请输入聊天信息"/>
        )
    }
}
export default Text
const s_text = {
    padding: '0 1rem 1rem 1rem',
    border: 0,
    width: '100%',
    height: '100%',
    resize: 'none',
    outline: 'none'
}