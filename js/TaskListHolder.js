function TaskListHolder(params) {
    this.tasks = params.tasks !== undefined && params.tasks.length > 0 ? params.tasks : [];
    this.anchor = params.anchor;
};

TaskListHolder.init = function() {
    this.container = $("<div />", {
        class: "task-list__container"
    });
    this.anchor.append(this.container);
    this.drawTasks();
}

TaskListHolder.add = function(task) { 
    var taskData = {
        title: task.title,
        description: task.description
    }
    addTask.call(this, taskData, task);
}

TaskListHolder.redraw = function(task) {
    this.container.html("");
    this.drawTasks();
}

TaskListHolder.drawTasks = function() {
    this.tasks.forEach(task => {
        this.container.append(task.draw());
    });
}

TaskListHolder.setTasks = function(tasks) {
    tasks.forEach((task) => {
        this.tasks.push(new Task(task));
    });
    this.redraw();
}