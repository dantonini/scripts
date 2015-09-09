(function() {
    var css, updateTask, updateTasks,
        _this = this;

    css = ".working_time { font-size: 0.9em; }";

    $('<style>').html(css).appendTo('head');

    updateTask = function(task) {
        var $task;
        task = task.model;
        $task = $('#task_' + task.attributes.id);
        if ($task) {
            if ($task.find('.working_time').length > 0) {
                return $task.find('.working_time').text(moment(task.attributes.updated_at).fromNow());
            } else {
                return $task.find('.status_pane').prepend('<span class="working_time">' + moment(task.attributes.updated_at).fromNow() + '</span>');
            }
        }
    };

    updateTasks = function() {
        return window.board.tasks.forEach(function(task) {
            return updateTask(task);
        });
    };

    setTimeout(updateTasks, 1000);

    setInterval(updateTasks, 60000);

    window.board.on('task:render', updateTask);

}).call(this);
