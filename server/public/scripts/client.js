console.log('client.js');

$(document).ready(onReady);

function onReady(){
    displayTasks();
}

function displayTasks(){
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function(response) {
        for(tasks of response){
        $('#task-table').append(`
        <tr>
        <td>${tasks.item}</td>
        <td><input type="checkbox" data-id=${tasks.id}"></td>
        </tr>
        `)}
    }).catch(function(error) {
        alert('there was an error displaying tasks', error);
    })
}