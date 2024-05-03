const WebSocket = require('ws');

const WS_PORT = 8080

const wss = new WebSocket.Server({ port: WS_PORT });
console.log(`ws server running on port ${WS_PORT}`);

wss.on('connection', (ws) => {
    console.log('new ws client');

    ws.on('open', () => {
        console.log('ws client openned');
    });

    ws.on('message', (message) => {
        console.log(`message from ws client: ${message}`);
    });

    ws.on('error', (err) => {
        console.log(`error in ws client: ${err}`);
    });

    ws.on('close', (code, reason) => {
        console.log(`ws client closed with code ${code}: ${reason}`);
    });

    ws.send('hello');
});

wss.on('error', (err) => {
    console.log(`error in ws server: ${err}`);
});

wss.on('close', () => {
    console.log('ws server closed');
});