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
    const queryText = 'SELECT * FROM "tasks"  ORDER BY "taskItem" LIMIT 100';
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch(error => {
        console.log('There was an error getting the tasks', error);
        res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
    const taskId = req.params.id;
    const queryText = 'UPDATE "tasks" SET "status" = true WHERE "id" = $1;'
    pool.query(queryText, [taskId]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        res.sendStatus(200);
    })
})

router.delete('/:id', (req, res) => { 
    console.log(req.params);
    const taskId = req.params.id;
    const queryText = 'DELETE FROM "tasks" WHERE "id" = $1;'
    pool.query(queryText, [taskId]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error in /songs DELETE', error);
        res.sendStatus(500);
    })
});

router.post('/', (req, res) => {
    // get the task from the client from data sent
    const taskToAdd = req.body;
    // write query to send to db with sanitized data
    const queryText = 'INSERT INTO "tasks" ("taskItem","status") VALUES ($1,$2);';
    // send query to database
    pool.query(queryText,
        [taskToAdd.taskItem,
        taskToAdd.status]).then((result) => {
            res.sendStatus(200)
        }).catch((error) => {
            res.sendStatus(500)
        })
});





module.exports = router;