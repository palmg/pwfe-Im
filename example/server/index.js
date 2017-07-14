/**
 * Created by chkui on 2017/7/12.
 */

var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8181});

wss.on('connection', function (ws, req) {
    console.log('client connected');
    let url = req.url
    url.startsWith('/') && (url = url.substring(1))
    url.endsWith('/') && (url = url.substring(0, url.length - 1))
    const urls = url.split('/')
    console.log('RestFull params：', urls)
    ws.on('message', function (message) {
        console.log('get client info:', message)
        const timer = setTimeout(function(){
            ws.send('你给我发送了一条消息：' + message)
            clearTimeout(timer)
        }, 2000)
    });
});
