const db = require('better-sqlite3')('data/db.sqlite');
let server = require('http').createServer();

const PORT = 8080

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

require('./db.init')(db, CSV_FILES);
require('./ws-server')(server, db);
require('./http-server')(server, db);

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})
