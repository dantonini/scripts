css = ".working_time { font-size: 0.9em; }"
$('<style>').html(css).appendTo('head')

updateTask = (task) =>
  task = task.model
  $task = $('#task_' + task.attributes.id)
  if($task)
    if $task.find('.working_time').length > 0
      $task.find('.working_time').text(moment(task.attributes.updated_at).fromNow())
    else
      $task.find('.status_pane').prepend('<span class="working_time">' + moment(task.attributes.updated_at).fromNow() + '</span>')

updateTasks = () =>
  window.board.tasks.forEach (task) =>
    updateTask(task)

setTimeout(updateTasks, 1000)
setInterval(updateTasks, 60000)
window.board.on('task:render', updateTask);