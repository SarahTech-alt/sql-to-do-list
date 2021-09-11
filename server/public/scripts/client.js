console.log('client.js');

$(document).ready(onReady);

function onReady() {
    displayTasks();
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
        <td><input type="checkbox" data-id=${tasks.id}"></td>
        </tr>
        `);
        }
    }).catch(function (error) {
        alert('there was an error displaying tasks', error);
    })
}