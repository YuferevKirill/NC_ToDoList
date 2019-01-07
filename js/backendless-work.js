function initTasks() {// tested
    let _this = this;

    Backendless.Data.of("Tasks").find()
        .then(function (tasks) {
            _this.TaskListHolder.setTasks(tasks);
        })
        .catch(function (error) {
        });
};

function addTask(taskData, task) {// tested
    let _this = this;
    let _task = task;
    let _taskData = taskData;

    Backendless.Data.of("Tasks").save(_taskData)
        .then((savedTask) => {
            _this.tasks.push(_task);
            _this.redraw();
        })
        .catch(function (error) {
        });
};

function deleteTask(task) {// untested (unused)
    let _task = task
    let objID = _task.objectId;
    Backendless.Data.of("Tasks").remove({ objectId: "XXXX-XXXX-XXXX-XXXX" })
        .then(function (timestamp) {
        })
        .catch(function (error) {
        });
};
