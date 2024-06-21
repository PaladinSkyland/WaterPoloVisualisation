const WebSocket = require('ws');
const fs = require('fs');
const { parse } = require("csv-parse");

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

const wss = new WebSocket.Server({ port: WS_PORT });
console.log(`ws server running on port ${WS_PORT}`);


wss.on('connection', (ws, request) => {
    let currentStream = null;
    console.log('new ws client');
    let options = new URL(`http://localhost${request.url}`).searchParams;
    let file = CSV_FILES[options.get('file')] ?? CSV_FILES.dynamic1;

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
        const parser = fs.createReadStream(file)
        .pipe(parse({ delimiter: ";", columns: true }))
    
        let shouldStartSending = false;
    
        for await (const row of parser) {
            if (currentStream !== id) {
                //console.log(currentStream, id);
                return;
            }
            const rowTimestamp = Number(+row['temps_ms'].replace(/\u202F/g, '')) / 1000;
            if (!shouldStartSending) {
                //const rowTimestamp = +row['temps_ms'];
                if (rowTimestamp >= startTimestamp) {
                    shouldStartSending = true;
                } else {
                    continue;
                }
            }
    
            const data = {
                time: rowTimestamp,
                anchor: row['Ancre'],
                x: +row['X'],
                y: +row['Y'],
                z: +row['Z'],
                precision: +row['Precision %']
            }
    
            ws.send(JSON.stringify(data));
    
            await delay(row['Temps_acquisition']);
        }
        currentStream = Math.random().toString(16);
        sendCSVstartTimestamp(ws, file, startTimestamp, currentStream);
    }
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
async function sendCSV(ws, file) {
    const parser = fs.createReadStream(file)
    .pipe(parse({ delimiter: ";", columns: true }))

    for await (const row of parser) {
        await new Promise((resolve) => setTimeout(resolve, row['Temps_acquisition']));
        data = {
            time: +row['temps_ms'] / 1000,
            anchor: row['Ancre'],
            x: +row['X'],
            y: +row['Y'],
            z: +row['Z'],
            precision: +row['Precision %']
        }
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
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err}`);
            return;
        }

        const rows = data.split('\n');
        const firstRow = rows[1]; // Assuming the first row is the header
        const lastRow = rows[rows.length - 2]; // Assuming the last row is empty
        
        const firstTime = Number(firstRow.split(';')[1].replace(/\u202F/g, ''));
        const lastTime = Number(lastRow.split(';')[1].replace(/\u202F/g, ''));
        
        const timeData = {
            TimeData: {
              firstTime: firstTime,
              lastTime: lastTime
            }
          };

        

        ws.send(JSON.stringify(timeData));
    });
}