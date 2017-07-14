/**
 * Created by chkui on 2017/7/13.
 */
import React from 'react'
const cn = require('classnames/bind').bind(require('./loading.scss'))
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
        for(let i = 0;i<this.count;i++){
            ch += '.'
        }
        this.setState({dot:ch})
    }

    shouldComponentUpdate(nextProps, nextState){//防止非相关执行差异算法
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
            <div className={cn('loading')}>
                <div className={cn('mask')}/>
                <div className={cn('name')}>
                    <p className={cn('text')}>{this.props.title}</p>
                    <p className={cn('dot')}>{this.state.dot}</p>
                </div>
            </div>
        )
    }
}

export default Loading