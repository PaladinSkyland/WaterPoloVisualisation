'use strict';

const WebSocket = require('ws');

module.exports = function (server, db) {
    const wss = new WebSocket.Server({ server: server });
    console.log('ws server running');

    wss.on('connection', (ws, request) => {
        let currentStream = null;
        console.log('new ws client');
        let matchid = new URL(`http://localhost${request.url}`).searchParams.get('file') ?? 'dynamic1';

        sendTime(ws, matchid);

        ws.on('message', (message) => {
            console.log(`message from ws client: ${message}`);
            let data = JSON.parse(message);
            if (data.play) {
                currentStream = generateRandomID();
                if (data.timestamp !== undefined || data.timestamp !== null) {
                    sendCSVstartTimestamp(ws, matchid, data.timestamp, currentStream);
                } else {
                    sendCSVstartTimestamp(ws, matchid, 0, currentStream);
                }
            }else if(data.pause){
                currentStream = null;
            }
            else if (data.timestamp !== undefined || data.timestamp !== null) {
                currentStream = generateRandomID();
                sendCSVstartTimestamp(ws, matchid, data.timestamp, currentStream);
            }
        });

        ws.on('error', (err) => {
            console.log(`error in ws client: ${err}`);
            currentStream = null;
            ws.close();
        });

        ws.on('close', (code, reason) => {
            console.log(`ws client closed with code ${code}: ${reason}`);
            currentStream = null;
        });

        async function sendCSVstartTimestamp(ws, matchid, startTimestamp, id) {
            const stmt = db.prepare(`SELECT *,
                time - prev_time AS acquisition_time,
                SQRT(POW(x - prev_x, 2) + POW(y - prev_y, 2)) / (time - prev_time) as speed,
                ATAN2(y - prev_y, x - prev_x) as direction
                FROM (
                    SELECT *,
                    time - LAG(time) OVER (PARTITION BY matchid ORDER BY time) AS sleep_time,
                    LAG(x) OVER (PARTITION BY matchid, anchor ORDER BY time) as prev_x,
                    LAG(y) OVER (PARTITION BY matchid, anchor ORDER BY time) as prev_y,
                    LAG(time) OVER (PARTITION BY matchid, anchor ORDER BY time) as prev_time
                    FROM positions
                    WHERE matchid = ?
                    AND time >= ?
                    ORDER BY time
                )
            `);

            for (const row of stmt.iterate(matchid, startTimestamp)) {
                if (currentStream !== id) {
                    return;
                }

                if (row['sleep_time']) {
                    await delay(row['sleep_time'] * 1000);
                }
        
                ws.send(JSON.stringify({
                    time: row['time'],
                    acquisition_time: row['acquisition_time'],
                    anchor: row['anchor'],
                    x: row['x'],
                    y: row['y'],
                    z: row['z'],
                    precision: row['precision'],
                    speed: row['speed'],
                    direction: row['direction']
                }));
            }

            currentStream = generateRandomID();
            sendCSVstartTimestamp(ws, matchid, startTimestamp, currentStream);
        };
            
    });

    wss.on('error', (err) => {
        console.log(`error in ws server: ${err}`);
    });

    wss.on('close', () => {
        console.log('ws server closed');
    });

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    function generateRandomID() {
        return Math.random().toString(16).substring(2);
    }
    
    function sendTime(ws, matchid) {
        let first = db.prepare("SELECT time FROM positions WHERE matchid = ? ORDER BY time ASC LIMIT 1").get(matchid);
        let last = db.prepare("SELECT time FROM positions WHERE matchid = ? ORDER BY time DESC LIMIT 1").get(matchid);
    
        ws.send(JSON.stringify({
            TimeData: {
                firstTime: first.time * 1000,
                lastTime: last.time * 1000
            }
        }));
    }
}    