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
    news1: 'data/news/csv/Test_1_scénario-1_marche_2-tags.csv',
    news2: 'data/news/csv/Test_2_scénario-1_marche_2-tags.csv',
    news3: 'data/news/csv/Test_3_scénario-1_marche_2-tags.csv',
    news4: 'data/news/csv/Test_4_marche_1-tags.csv',
    news5: 'data/news/csv/Test_5_marche_1-tags.csv',
    news6: 'data/news/csv/Test_6_scénario-1_marche_2-tags.csv',
    news7: 'data/news/csv/Test_7_scénario-1_marche_2-tags.csv',
    news8: 'data/news/csv/Test_8_scénario-2-1-a_marche-aller_3-tags.csv',
    news9: 'data/news/csv/Test_9_scénario-2-1-a_marche-retour_3-tags.csv',
    news16: 'data/news/csv/Test_16_scénario-2-2_marche-libre_45s_3-tags.csv',
    news17: 'data/news/csv/Test_17_scénario-2-2_marche-libre_45s_3-tags.csv',
    news18: 'data/news/csv/Test_18_scénario-2-3_marche-libre-accélération-décélration_45s_3-tags.csv',
    news19: 'data/news/csv/Test_19_scénario-2-3_marche-libre-accélération-décélration_45s_3-tags.csv'
}

require('./db.init')(db, CSV_FILES);
require('./ws-server')(server, db);
require('./http-server')(server, db);

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})
