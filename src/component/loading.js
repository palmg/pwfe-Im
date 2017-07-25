/**
 * Created by chkui on 2017/7/13.
 */
import React from 'react'
/**
 * 加载状态遮罩层
 * @param {string} title 要显示的内容
 */
class Loading extends React.Component {
    constructor(...props) {
        super(...props)
        this.state = {dot: '.'}
        this.count = 0
        this.showLine = this.showLine.bind(this)
    }

    showLine() {//循环显示...
        this.count = ++this.count % 8
        let ch = '.'
        for (let i = 0; i < this.count; i++) {
            ch += '.'
        }
        this.setState({dot: ch})
    }

    shouldComponentUpdate(nextProps, nextState) {//防止非相关执行差异算法
        return this.state !== nextState
    }

    componentDidMount() {
        this.timer = setInterval(this.showLine, 200)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        return (
            <div style={s_loading}>
                <div style={s_mask}/>
                <div style={s_name}>
                    <p style={s_text}>{this.props.title}</p>
                    <p style={s_dot}>{this.state.dot}</p>
                </div>
            </div>
        )
    }
}
export default Loading
const s_loading = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    s_mask = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#333333',
        opacity: .7
    },
    s_name = {
        display: 'inline-block',
        position: 'absolute',
        margin: 'auto',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        color: '#FFFFFF',
        fontsize: '.7rem',
        width: '5.5rem',
        height: '2rem'
    },
    s_text = {
        display: 'inline-block',
        width: '4.5rem',
        height: '1rem',
        lineHeight: '1rem',
        textAlign: 'center'
    },
    s_dot = {
        display: 'inline-block',
        width: '1rem',
        height: '1rem',
        lineHeight: '1rem'
    }