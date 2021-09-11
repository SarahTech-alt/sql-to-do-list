const express = require('express');
const app = express()
app.use(express.static('server/public'));


// Serve static assets from server/public folder
app.use(express.static('server/public'));

// Set up router to respond to requests from the '/tasks' URL
let tasksRouter = require('./routes/tasks.router');
app.use('/songs', songsRouter);


// Start express
const PORT = 5000;
applisten(PORT, () => {
    console.log('up and running on port', PORT);
    
})
