'use strict';

const express = require('express');

module.exports = function (server, db) {
    const app = express()
    server.on('request', app);
    console.log('http server running');

    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        next();
    });

    app.get('/matchs', (req, res) => {
        const stmt = db.prepare("SELECT DISTINCT matchid FROM positions");
        res.send(stmt.all().map(row => row.matchid));
    })

    app.get('/stats/:matchid', (req, res) => {
        const stmt = db.prepare(`SELECT matchid, anchor,
            SUM(distance) as total_distance,
            SUM(time - prev_time) as total_time,
            SUM(distance) / SUM(time - prev_time) as average_speed
            FROM (
                SELECT *,
                SQRT(POW(x - LAG(x) OVER (PARTITION BY matchid, anchor ORDER BY time), 2) + POW(y - LAG(y) OVER (PARTITION BY matchid, anchor ORDER BY time), 2)) as distance,
                LAG(time) OVER (PARTITION BY matchid, anchor ORDER BY time) as prev_time
                FROM positions
                WHERE matchid = ?
                AND x IS NOT NULL
                AND y IS NOT NULL
                ORDER BY time
            )
            GROUP BY anchor
        `);

        res.send(stmt.all(req.params.matchid));
    });
}