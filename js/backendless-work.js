function initTasks(){// tested
    _this = this;
    Backendless.Data.of( "Tasks" ).find()
    .then( function( tasks ) { 
      _this.TaskListHolder.setTasks(tasks);
    })
    .catch( function( error ) {
    });
};

function addTask(taskData, task ){// tested
    _this = this;
    _task = task;
    _taskData = taskData;
    Backendless.Data.of( "Tasks" ).save( _taskData )
    .then( ( savedTask ) => {
        _this.tasks.push(_task);
        _this.redraw();
    })
    .catch( function( error ) {
    });
};

function deleteTask(){

};
