const WebSocket = require('ws');
const fs = require('fs');
const { parse } = require("csv-parse");
const db = require('better-sqlite3')('data/db.sqlite');

const WS_PORT = 8080
const CSV_FILES = {
    dynamic1: 'data/dynamic/csv/Test_1_brasse_10Hz_aller-retour_vidéo.csv',
    dynamic2: 'data/dynamic/csv/Test_2_brasse_5Hz_aller-retour_video.csv',
    dynamic3: 'data/dynamic/csv/Test_3_crawl_10Hz_aller-retour_video.csv',
    dynamic4: 'data/dynamic/csv/Test_4_crawl_5Hz_aller-retour_video.csv',
    dynamic5: 'data/dynamic/csv/Test_5_merged_aller-retour_video.csv',
    static1: 'data/static/csv/Peri_piscine_2x26_30cm_30s_10hz.csv',
    static2: 'data/static/csv/Peri_piscine_4x26_30cm_30s_10hz.csv',
    static3: 'data/static/csv/Peri_piscine_18x26_30cm_30s_10hz.csv',
}


db.prepare("CREATE TABLE IF NOT EXISTS positions (id INTEGER PRIMARY KEY AUTOINCREMENT, matchid TEXT, anchor TEXT, x REAL, y REAL, z REAL, precision REAL, time REAL)").run();

const stmt = db.prepare("INSERT INTO positions (matchid, anchor, x, y, z, precision, time) VALUES (?, ?, ?, ?, ?, ?, ?)");
for (const key in CSV_FILES) {
    const row = db.prepare("SELECT * FROM positions WHERE matchid = ?").get(key);
    if (!row) {
        const file = CSV_FILES[key];
        fs.createReadStream(file).pipe(parse({ delimiter: ";", columns: true })).on('data', (row) => {
            if (row['X'] == 'nan') row['X'] = null;
            if (row['Y'] == 'nan') row['Y'] = null;
            if (row['Z'] == 'nan') row['Z'] = null;
            if (row['Precision %'] == 'nan') row['Precision %'] = null;
            stmt.run(key, row['Ancre'], row['X'], row['Y'], row['Z'], row['Precision %'], row['temps_ms'] / 1000);
        });
    }
}

// count the number of rows in the table
let row = db.prepare("SELECT COUNT(*) AS count FROM positions").get()
console.log(`number of rows in the table: ${row.count}`);

const wss = new WebSocket.Server({ port: WS_PORT });
console.log(`ws server running on port ${WS_PORT}`);


wss.on('connection', (ws, request) => {
    let currentStream = null;
    console.log('new ws client');
    let options = new URL(`http://localhost${request.url}`).searchParams;
    let file = options.get('file') ?? 'dynamic1';

    sendTime(ws, file);

    ws.on('message', (message) => {
        console.log(`message from ws client: ${message}`);
        data = JSON.parse(message);
        if (data.timestamp !== undefined || data.timestamp !== null) {
            //sendPosForTimestamp(ws, file, data.timestamp);
            //console.log(data.timestamp);
            currentStream = Math.random().toString(16);
            sendCSVstartTimestamp(ws, file, data.timestamp, currentStream);
        }
    });

    ws.on('error', (err) => {
        console.log(`error in ws client: ${err}`);
    });

    ws.on('close', (code, reason) => {
        console.log(`ws client closed with code ${code}: ${reason}`);
    });

    async function sendCSVstartTimestamp(ws, file, startTimestamp, id) {
        const stmt = db.prepare(`SELECT *,
            time - LAG(time) OVER (PARTITION BY matchid ORDER BY time) AS acquisition_time,
            SQRT(
                POW(x - LAG(x) OVER (PARTITION BY matchid, anchor ORDER BY time), 2)
                + POW(y - LAG(y) OVER (PARTITION BY matchid, anchor ORDER BY time), 2)
            ) / (time - LAG(time) OVER (PARTITION BY matchid, anchor ORDER BY time)) AS speed
            FROM positions
            WHERE matchid = ?
            AND time >= ?
            ORDER BY time;
        `);

        for (const row of stmt.iterate(file, startTimestamp)) {
            if (currentStream !== id) {
                return;
            }

            if (row['acquisition_time']) {
                await delay(row['acquisition_time'] * 1000);
            }
            console.log(row['time']);
    
            ws.send(JSON.stringify({
                time: row['time'],
                anchor: row['anchor'],
                x: row['x'],
                y: row['y'],
                z: row['z'],
                precision: row['precision'],
                instant_speed: row['speed']
            }));
        }

        currentStream = Math.random().toString(16);
        sendCSVstartTimestamp(ws, file, startTimestamp, currentStream);
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

/*
const previousData = {};


async function sendCSV(ws, file) {
    const parser = fs.createReadStream(file)
    .pipe(parse({ delimiter: ";", columns: true }))

    for await (const row of parser) {
        await new Promise((resolve) => setTimeout(resolve, row['Temps_acquisition']));

        let anchor = row['Ancre'];
        let currentX = parseFloat(row['X']);
        let currentY = parseFloat(row['Y']);
        let currentTime = parseFloat(row['temps_ms'].replace(/\s/g, '') / 1000);

        let speed = 0;

        if (!isNaN(currentX) && !isNaN(currentY) && !isNaN(currentTime)) {
            if (previousData[anchor]) {
                let distance = Math.sqrt(Math.pow(currentX - previousData[anchor].x, 2) + Math.pow(currentY - previousData[anchor].y, 2));
                let timeDifference = currentTime - previousData[anchor].time;

                if (timeDifference > 0) {
                    speed = distance / timeDifference;
                }
            }

            previousData[anchor] = {
                x: currentX,
                y: currentY,
                time: currentTime
            };
        }

        const data = {
            time: +row['temps_ms'].replace(/\s/g, '') / 1000,
            anchor: row['Ancre'],
            x: +row['X'],
            y: +row['Y'],
            z: +row['Z'],
            precision: +row['Precision %'],
            instant_speed: speed
        };
        
        ws.send(JSON.stringify(data));
    }

    await sendCSV(ws, file);
}
*/

/*
function sendPosForTimestamp(ws, file, timestamp) {
    // Read the file and send the position for the given timestamp
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err}`);
            return;
        }
        const rows = data.split('\n');
        const header = rows[0].split(';');
        const timeIndex = header.indexOf('temps_ms');
        const xIndex = header.indexOf('X');
        const yIndex = header.indexOf('Y');
        const zIndex = header.indexOf('Z');
        const precisionIndex = header.indexOf('Precision %');

        for (let i = 1; i < rows.length - 1; i++) {
            const row = rows[i].split(';');
            const time = Number(row[timeIndex].replace(/\u202F/g, '')) / 1000;
            if (time >= timestamp) {
                const data = {
                    time: time,
                    anchor: row[0],
                    x: Number(row[xIndex].replace(/\u202F/g, '')),
                    y: Number(row[yIndex].replace(/\u202F/g, '')),
                    z: Number(row[zIndex].replace(/\u202F/g, '')),
                    precision: Number(row[precisionIndex].replace(/\u202F/g, ''))
                };
                ws.send(JSON.stringify(data));
                break;
            }
        }
    });
}
*/

function sendTime(ws, file) {
    // Read the time for the first and last row
    let first = db.prepare("SELECT time FROM positions WHERE matchid = ? ORDER BY time ASC LIMIT 1").get(file);
    let last = db.prepare("SELECT time FROM positions WHERE matchid = ? ORDER BY time DESC LIMIT 1").get(file);

    ws.send(JSON.stringify({
        TimeData: {
            firstTime: first.time * 1000,
            lastTime: last.time * 1000
        }
    }));
}