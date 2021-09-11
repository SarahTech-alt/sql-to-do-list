console.log('client.js');

$(document).ready(onReady);

function onReady() {
    displayTasks();
    $('#task-table').on('click','.markDone',updateTask);
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
        <td>${tasks.taskItem}</td>
        <td><input type="checkbox" class="markDone" data-id="${tasks.id}"></td>
        </tr>
        `);
        }
    }).catch(function (error) {
        alert('there was an error displaying tasks', error);
    })
}

// Change status of task to true
function updateTask() {
    console.log($(this).data('id'));
    const taskId = $(this).data('id');
    console.log('button was clicked');
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskId}`
    }).then(function(response) {
        console.log(response);
        
        console.log('Item was updated');
    }).catch(function(error){
        console.log('unable to update');
    })
}