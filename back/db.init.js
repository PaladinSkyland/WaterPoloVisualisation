'use strict';

const fs = require('fs');
const { parse } = require("csv-parse");

module.exports = function (db, CSV_FILES) {
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

    let row = db.prepare("SELECT COUNT(*) AS count FROM positions").get()
    console.log(`number of rows in the table: ${row.count}`);
}