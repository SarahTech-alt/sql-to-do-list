console.log('client.js');

$(document).ready(onReady);

function onReady() {
    displayTasks();
    $('#task-table').on('click','.markDone',updateTask);
    $('#task-table').on('click','.delete-button',deleteTask);
    $('#add-button').on('click', addTask);
}

function displayTasks() {
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log(response);
        $('#task-table').empty();
        for (const tasks of response) {
        // for each task of the response
        const taskId = tasks.id;
        // add tasks to the DOM with data attribute
        // to be set to unique id
        $('#task-table').append(`
        <tr>
        <td class="taskListed" id="${taskId}">${tasks.taskItem}</td>
        <td><input type="checkbox" class="markDone" data-id="${taskId}"></td>
        <td><button class="delete-button" data-id="${taskId}">Delete</button></td>
        </tr>
        `);
        if (tasks.status === true) {
            // if the id attribute of task is true
            // add class 'done' to task list
            $(`#${taskId}`).addClass('done');
        }
        }
    }).catch(function (error) {
        alert('there was an error displaying tasks', error);
    })
}


// Change status of task to true
function updateTask() {
    const taskId = $(this).data('id');
    // add strikethrough to task text when checkbox clicked
    //$(this).parent().parent().toggleClass('done');
    console.log('button was clicked');
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskId}`
    }).then(function(response) {
        console.log('Item was updated');
    }).catch(function(error){
        console.log('unable to update');
    })
    displayTasks();
}

// Delete task from table
function deleteTask() {
    const taskId = $(this).data('id');
    console.log('button was clicked');
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`
    }).then(function(response) {
        console.log(response);
        console.log('Item was deleted');
    }).catch(function(error){
        console.log('unable to update');
    })
    displayTasks();
}

// When 'add button' is clicked get user input and insert into
// database with a PST method
function addTask(){
    console.log('In add task');
    //get user input
    const taskToAdd = {
        taskItem: $('#add-task').val(),
        status: false
    }
    // send to server
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: taskToAdd
    }).then(function(response) {
        // if successful log success message
        console.log('Success in adding task!');
    }).catch(function(error) {
        // if unsuccesfful log an error message
        console.log('There was an error adding task!');
    });
    displayTasks();
}