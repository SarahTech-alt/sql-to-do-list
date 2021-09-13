const express = require('express');
const router = express.Router();


// Bring in pg
const pg = require('pg');
const pool = new pg.Pool({
    database: process.env.DATABASE_NAME || 'to-do',
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

// Get all the items from database 'to-do' and table 'task'
// Order alphabetically and send back to client

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

// Accessed by id provided by the client
// Switches the status boolean of the task with corresponding id
router.put('/:id', (req, res) => {
    const taskId = req.params.id;
    const queryText = 'UPDATE "tasks" SET "status" = NOT "status" WHERE id = $1;';
    pool.query(queryText, [taskId]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        res.sendStatus(200);
    })
})

// Accessed by id provided by the client
// Deletes the item of the task with corresponding id
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

// Gets the value of the input field from the client
// Adds to 'task' table with a default status of false
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