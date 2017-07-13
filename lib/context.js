"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by chkui on 2017/7/11.
 */

/**
 * 当前连接状态类型
 * @type {{establish: number, connect: number, closing: number, closed: number}}
 */
var ImState = exports.ImState = {
  establish: 1, //建立链接
  connect: 2, //已经链接
  closing: 3, //发起关闭链接
  closed: 4 //链接已经关闭


  /**
   * 聊天信息内容
   * @type {{time: number, receive: number, send: number}}
   */
};var chatType = exports.chatType = {
  time: 3, //时间标记
  receive: 1, //接收的数据
  send: 2 //发送的数据


  /**
   * UI显示效果全局配置
   * @type {{mastShowTime: number, timeShowInterval: number}}
   */
};var UI = exports.UI = {
  mastShowTime: 1500, //聊天窗口出现时默认加载时间，单位毫秒
  timeShowInterval: 1000 * 60 * 3 //聊天窗口间隔时间，单位毫秒
};