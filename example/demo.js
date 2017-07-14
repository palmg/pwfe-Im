/**
 * Created by chkui on 2017/7/7.
 */

import React from 'react'
import {render} from 'react-dom'
import Im from '../index'
import './demo.scss'

class Demo extends React.Component {
    constructor(...props) {
        super(...props)
        this.state = {
            show: false
        }
        this.popHandle = this.popHandle.bind(this)
        this.cancelHandle = this.cancelHandle.bind(this)
    }

    popHandle() {
        this.setState({
            show: true
        })
    }

    cancelHandle() {
        this.setState({
            show: false
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.popHandle}>点我蹦出聊天窗口</button>
                {this.state.show && (<Im user={user} url={url} onClose={this.cancelHandle}/>)}
            </div>
        )
    }
}

const user = {
        avatar: 'https://file.mahoooo.com/res/file/20170301104952MPDRQN0N2A6QW2L2ZJF6BE995909CE55C7A72876DEE5C6FAE4F5E3@54w_80Q',
        name: '没头脑&不高兴'
    },
    url = 'ws://localhost:8181/123456/name/'

render(<Demo />, document.getElementById('root'))

