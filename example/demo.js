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
        this.commitHandle = this.commitHandle.bind(this)
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

    commitHandle(data) {
        this.setState({
            show: false,
            area: `${data.province.name}${data.city.name}${data.area.name}`
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.popHandle}>点我蹦出聊天窗口</button>
                {this.state.show && (<Im user={{
                    avatar: 'https://file.mahoooo.com/res/file/20170301104952MPDRQN0N2A6QW2L2ZJF6BE995909CE55C7A72876DEE5C6FAE4F5E3@54w_80Q',
                    name: '不高兴',
                    id: '123'
                }} url="ws://localhost:8181/123456/name/" onClose={this.cancelHandle}/>)}
            </div>
        )
    }
}

render(<Demo />, document.getElementById('root'))

