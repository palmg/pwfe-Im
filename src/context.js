/**
 * Created by chkui on 2017/7/11.
 */

/**
 * 当前连接状态类型
 * @type {{establish: number, connect: number, closing: number, closed: number}}
 */
export const ImState = {
    establish: 1, //建立链接
    connect: 2, //已经链接
    closing: 3,//发起关闭链接
    closed: 4 //链接已经关闭
}

/**
 * 聊天信息内容
 * @type {{receive: number, send: number}}
 */
export const chatType = {
    receive: 1, //接收的数据
    send: 2 //发送的数据
}
