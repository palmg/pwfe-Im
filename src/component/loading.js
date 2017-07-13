/**
 * Created by chkui on 2017/7/13.
 */
import React from 'react'
const cn = require('classnames/bind').bind(require('./loading.scss'))
class Loading extends React.Component {
    constructor(...props) {
        super(...props)
        this.state = {
            t: '.'
        }
        this.count = 0
        this.showLine = this.showLine.bind(this)
    }

    showLine() {
        this.count = ++this.count % 8
        let ch = '.'
        for(let i = 0;i<this.count;i++){
            ch += '.'
        }
        this.setState({
            t:ch
        })
    }

    shouldComponentUpdate(nextProps, nextState){
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
                    <p className={cn('text')}>建立链接中</p>
                    <p className={cn('dot')}>{this.state.t}</p>
                </div>
            </div>
        )
    }
}

export default Loading