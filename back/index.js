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
    console.log('new ws client');
    let options = new URL(`http://localhost${request.url}`).searchParams;
    let file = CSV_FILES[options.get('file')] ?? CSV_FILES.dynamic1;
    sendCSV(ws, file);

    ws.on('message', (message) => {
        console.log(`message from ws client: ${message}`);
        data = JSON.parse(message);
    });

    ws.on('error', (err) => {
        console.log(`error in ws client: ${err}`);
    });

    ws.on('close', (code, reason) => {
        console.log(`ws client closed with code ${code}: ${reason}`);
    });
});

wss.on('error', (err) => {
    console.log(`error in ws server: ${err}`);
});

wss.on('close', () => {
    console.log('ws server closed');
});

//store previous data for each anchor
const previousData = {};

async function sendCSV(ws, file) {
    const parser = fs.createReadStream(file)
    .pipe(parse({ delimiter: ";", columns: true }))

    for await (const row of parser) {
        await new Promise((resolve) => setTimeout(resolve, row['Temps_acquisition']));

        //get current position
        let anchor = row['Ancre'];
        let currentX = parseFloat(row['X']);
        let currentY = parseFloat(row['Y']);
        let currentTime = parseFloat(row['temps_ms'].replace(/\s/g, '') / 1000);

        //check if the current data is valid
        if (isNaN(currentX) || isNaN(currentY) || isNaN(currentTime)) {
            continue;
        }

        let speed = 0;

        if (!isNaN(currentX) && !isNaN(currentY) && !isNaN(currentTime)) {
            //check if there is previous valid data for this anchor
            if (previousData[anchor]) {
                //calculate speed
                let distance = Math.sqrt(Math.pow(currentX - previousData[anchor].x, 2) + Math.pow(currentY - previousData[anchor].y, 2));
                let timeDifference = currentTime - previousData[anchor].time;

                //ensure that the time difference is valid
                if (timeDifference > 0) {
                    speed = distance / timeDifference;
                }
                else {
                    console.log(`Invalid time difference for anchor ${anchor} at time ${currentTime} : ${timeDifference}`);
                }

                //debug
                if (speed > 5) {
                    console.log(`Anchor: ${anchor}`)
                    console.log(`Current: (${currentX}, ${currentY}) at ${currentTime}`);
                    console.log(`Previous: (${previousData[anchor].x}, ${previousData[anchor].y}) at ${previousData[anchor].time}`);
                    console.log(`Distance: ${distance}, Time difference: ${timeDifference}`);
                    console.log(`Speed: ${speed}`);
                }
            }

            //store current data for the next iteration
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
            instant_speed: parseFloat(speed)
        };
        
        ws.send(JSON.stringify(data));
    }

    await sendCSV(ws, file);
}