const express = require('express');
const router = express.Router();


// Bring in pg
const pg = require('pg');
const pool = new pg.Pool({
    database: 'to-do',
    host: 'localhost',
    port: '5432',
    max: 10,
    idleTimeoutMillis: 3000
});

// Check connection to postgres
pool.on('connect', () => {
    console.log('pg connected to post postgresql!');
});

pool.on('error', (error) => {
    console.log('unable to connect to postgresql', error);
});

router.get('/', (req, res) => {
    console.log(req.body);
    const queryText = 'SELECT * FROM "tasks" LIMIT 100';
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch(error => {
        console.log('There was an error getting the tasks', error);
        res.sendStatus(500);
    });
});





module.exports = router;