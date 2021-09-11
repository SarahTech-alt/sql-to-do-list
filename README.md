# Project Name

To Do List


## Description

This app should allow users to create a to-do list to keep track of their tasks. It should let them add new tasks and delete ones as they complete them.

## Task List

- [x] Create a task list
- [x] Add necessary files
        - [x] '.gitignore', 'database.sql'
        - [x] Server folder with folders 'public', 'routes' and file 'server.js'
        - [x] Public folder with folders 'scripts', 'styles', 'vendors', 'routes', 
                and file 'index.html'
        - [x] In scripts file 'client.js'
        - [x] In styles file 'styles.css'
        - [x] In vendors download and add 'jquery.js'
- [ ] In .gitignore add lines 'node_modules/
                              '.DS_Store'
- [ ] Install dependencies (npm)
- [ ] In package.json file in 'test:' add ',"start":node server/server.js'
- [ ] Set up the server (require express, port, app.use, app.listen)
- [ ] Set up the router (const express, const router, module.exports)
- [ ] Add postgres to router/set up the pool
- [ ] Create a database named 'to-do.sql'
- [ ] Create DOM structure with HTML
        -[ ] Title, section for to-dos to appear, input field and button
- [ ] Ready DOM in the client, on load get the table from the client and set up 
      click handler for adding task
- [ ] Clear table from DOM, GET table from the database with a SELECT query, and 
       append the results to the DOM and add a done button with data-id 
- [ ]  When 'add' button is clicked POST to the server, INSERT into database, step 
       back into GET function to append the updated table
- [ ]  When 'done' button is clicked send PUT request with button id to the server 
       to DELETE from the database, step back into the GET function to append updated table