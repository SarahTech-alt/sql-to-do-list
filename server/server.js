const express = require('express');
const app = express();
app.use(express.static('server/public'));


// Serve static assets from server/public folder
app.use(express.static('server/public'));

// Set up router to respond to requests from the '/tasks' URL
let tasksRouter = require('./routes/tasks.router');
app.use('/tasks', tasksRouter);


// Start express
const PORT = 5000;
app.listen(PORT, () => {
    console.log('up and running on port', PORT);
    
})