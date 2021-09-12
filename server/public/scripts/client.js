console.log('client.js');

$(document).ready(onReady);

function onReady() {
    displayTasks();
    $('#task-table').on('click','.markDone',updateTask);
    $('#task-table').on('click','.delete-button',deleteTask);
}

function displayTasks() {
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log(response);
        $('#task-table').empty();
        for (tasks of response) {
            $('#task-table').append(`
        <tr>
        <td class="taskListed" "done" id="${tasks.id}">${tasks.taskItem}</td>
        <td><input type="checkbox" class="markDone" data-id="${tasks.id}"></td>
        <td><button class="delete-button" data-id="${tasks.id}">Delete</button></td>
        </tr>
        `);
        }
    }).catch(function (error) {
        alert('there was an error displaying tasks', error);
    })
}


// Change status of task to true
function updateTask() {
    const taskId = $(this).data('id');
    // add strikethrough to task text when checkbox clicked
    $(this).parent().parent().toggleClass('done');
    console.log('button was clicked');
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskId}`
    }).then(function(response) {
        console.log('Item was updated');
    }).catch(function(error){
        console.log('unable to update');
    })
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