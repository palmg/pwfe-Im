/**
 * Created by chkui on 2017/7/12.
 */

var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8181});

wss.on('connection', function (ws) {
    console.log('client connected');
    ws.on('message', function (message) {
        const timer = setTimeout(function(){
            ws.send('你给我发送了一条消息：' + message)
            clearTimeout(timer)
        }, 2000)
    });
});
