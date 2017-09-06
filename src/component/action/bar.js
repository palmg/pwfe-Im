import React from 'react'
import {folder} from '../../res/img'

/**
 * onFileSelected:(file)=>{} 要上传的图片
 */
class Bar extends React.Component {
    constructor(...props) {
        super(...props)
        this.changeHandle = this.changeHandle.bind(this)
    }

    changeHandle(e) {
        const files = e.target.files
        files && files[0] && this.props.onFileSelected(files[0])
    }

    render() {
        return (
            <div style={s_bar}>
                <FolderBtn onChange={this.changeHandle}/>
            </div>
        )
    }
}

export default Bar

/**
 * 图标按钮
 * @param {object} props {
 *     onFileSelected:()=>{}文件选择的回调
 * }
 * @constructor
 */
const FolderBtn = props =>
    <div style={s_folder_btn}>
        <img style={s_img} src={folder}/>
        <input style={s_input} type="file" onChange={props.onChange}/>
    </div>

const s_bar = {
        padding: '.5rem 1rem'
    },
    s_folder_btn = {
        position: 'relative',
        width: '1rem',
        height:'1rem',
    },
    s_btn_def = {
        position: 'absolute',
        width: '1rem',
        height: '1rem',
        top: 0,
        left: 0
    },
    s_img = Object.assign({}, s_btn_def),
    s_input = Object.assign({opacity: '0'}, s_btn_def)