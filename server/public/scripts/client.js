console.log('client.js');

$(document).ready(onReady);


// Display tasks and add click handlers
function onReady() {
    displayTasks();
    $('#task-table').on('click', '.markDone', updateTask);
    $('#task-table').on('click', '.delete-button', deleteTask);
    $('#completed-table').on('click', '.delete-button', deleteTask);
    $('#add-button').on('click', addTask);
    $('#completed-table').on('click', '.undo', updateTask);
}

// Get the data from the database to append to the DOM
// Create an html attribute 'data' with unique id 
// that was assigned by SQL in the database
// put item into different tables 
// and add a class for styling depending on the status attribute

function displayTasks() {
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log(response);
        // Clear the tables before appending tasks
        $('#task-table').empty();
        $('#completed-table').empty();
        // check status of each task and put into corresponding table
        for (const tasks of response) {
            const taskId = tasks.id;
            if (tasks.status === true) {
                // if the status is true append to completed table
                $('#completed-table').append(`
                <tr>
                <td class="taskListed" id="${taskId}">${tasks.taskItem}</td>
                <td><button class="undo" data-id="${taskId}">Undo</button></td>
                <td><button class="delete-button" data-id="${taskId}">Delete</button></td>
                </tr>
                `);
                // add 'done' class to change text appearance
                $(`#${taskId}`).addClass('done');
            }
            else {
                // if the status of task is false append to task-table
                $('#task-table').append(`
                 <tr>
                <td class="taskListed" id="${taskId}">${tasks.taskItem}</td>
                <td><input type="checkbox" class="markDone" data-id="${taskId}"></td>
                 <td><button class="delete-button" data-id="${taskId}">Delete</button></td>
                </tr>
                 `);
              }
            }
         }).catch(function (error) {
              alert('there was an error displaying tasks', error);
    })
}


// Switch status of task when the box is checked
function updateTask() {
    // gets unique id created by SQL
    const taskId = $(this).data('id');
    console.log('button was clicked');
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskId}`
    }).then(function (response) {
        console.log('Item was updated');
    }).catch(function (error) {
        console.log('unable to update');
    })
    displayTasks();
}

// Delete task from table
function deleteTask() {
    // gets unique id created by SQL
    const taskId = $(this).data('id');
    console.log('button was clicked');
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`
    }).then(function (response) {
        console.log(response);
        console.log('Item was deleted');
    }).catch(function (error) {
        console.log('unable to update');
    })
    displayTasks();
}

// When 'add button' is clicked get user input and insert into
// database with a PST method
function addTask() {
    console.log('In add task');
    // get user input
    const taskToAdd = {
        taskItem: $('#add-task').val(),
        status: false
    }
    // send new task to server
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: taskToAdd
    }).then(function (response) {
        // if successful log success message
        console.log('Success in adding task!');
    }).catch(function (error) {
        // if unsuccesfful log an error message
        console.log('There was an error adding task!');
    });
    $('#add-task').val('');
    displayTasks();
}

// When undo button is clicked send to server to switch the status 
// attribute

// function undoComplete() {
//     // get unique id created by SQL
//     const taskId = $(this).data('id');
//     console.log('undo was clicked');
//     $.ajax({
//         method: 'PUT',
//         url: `/tasks/${taskId}`
//     }).then(function (response) {
//         console.log('Item was updated');
//     }).catch(function (error) {
//         console.log('unable to update');
//     })
//     displayTasks();
// }
