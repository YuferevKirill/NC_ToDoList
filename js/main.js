(function($) {
    function Task(params) {
        this.title = params.title;
        this.description = params.description;
        this.createHtml();
    };
    function ControlPanel(params) {
        this.controls = params.controls;
    };
    function TaskListHolder(params) {
        this.tasks = params.tasks !== undefined && params.tasks.length > 0 ? params.tasks : [];
        this.anchor = params.anchor;
    };
    function Button(params) {
        this.title = params.title;
        this.clickHandler = params.clickHandler;
        this.createHtml();
        this.html.on("click", this.clickHandler);
    };

    function Popup(params) {
        this.title = params.title;
        this.model = params.model;
        this.context = params.model.context;
        this.customCssClass = params.customCssClass;
        this.createHtml();
    };

    function Form(params) {
        this.model = params;
        this.context = params.context;
        this.create();
    };



    Button.prototype.draw = function() {
        return this.html;
    }

    Button.prototype.createHtml = function() {
        var _this = this;
        var button = $("<a />", {
            class: "task-list__control-panel-button",
            text: _this.title
        });
        this.html = button;
    }



    Task.prototype.createHtml = function() {
        var _this = this;
        var task = $("<div />", {
            class: "task-list__container-task",
            text: _this.title
        });
        this.html = task;
    }

    Task.prototype.draw = function() {
        return this.html;
    }



    TaskListHolder.prototype.init = function() {
        this.container = $("<div />", {
            class: "task-list__container"
        });
        this.anchor.append(this.container);
        this.drawTasks();
    }

    TaskListHolder.prototype.add = function(task) { 
        var taskData = {
            title: task.title,
            description: task.description
        }
        addTask.call(this, taskData, task);
    }

    TaskListHolder.prototype.redraw = function(task) {
        this.container.html("");
        this.drawTasks();
    }

    TaskListHolder.prototype.drawTasks = function() {
        this.tasks.forEach(task => {
            this.container.append(task.draw());
        });
    }

    TaskListHolder.prototype.setTasks = function(tasks) {
        tasks.forEach((task) => {
            this.tasks.push(new Task(task));
        });
        this.redraw();
    }



    Popup.prototype.show = function() {
        $("body").append(this.popup);
        this.popup.show();
    }

    Popup.prototype.createHtml = function() {
        var content = new Form(this.model);
        var popup = $("<div />", {
            class: "popup"
        });
        popup.append(content.getContent());
        this.popup = popup;
    }



    Form.FieldTypes = {
        input: "input",
        select: "select",
        TaskButton: "TaskButton",
        closeButton: "closeButton",
        description: "description"
    }

    Form.prototype.create = function() {
        var form = $("<form />", {
            class: "popup__form"
        });
        this.model.fields.forEach((field) => {
            var fieldDOM;
            if(field.type == Form.FieldTypes.input) {
                fieldDOM = $("<input />", {
                    class: "popup__form-input"
                });
                form.append(fieldDOM);
            }
            if(field.type == Form.FieldTypes.input) {
                fieldDOM = $("<input />", {
                    class: "popup__form-description"
                });
                form.append(fieldDOM);
            } 
            if(field.type == Form.FieldTypes.TaskButton) {
                fieldDOM = $("<button />", {
                    class: "popup__form-TaskButton"
                });
                form.append(fieldDOM);
                fieldDOM.on("click", this.context.createNewTask.bind(this.context));
            }
            if(field.type == Form.FieldTypes.closeButton) {
                fieldDOM = $("<a />", {
                    class: "popup__form-closeButton",
                    text:"x"
                });
                // fieldDOM.on("click", 
                //     this.context.openedPopup.remove());
                form.append(fieldDOM);
            } 
        });
        this.form = form;
    }

    Form.getFieldTypes = function() {
        return this.FieldTypes;
    }

    Form.prototype.getContent = function() {
        return this.form;
    }



    var TaskList = {
        init: function() {
            this.rootElement = $("#application");
            this.initializeApplication();
            this.drawApplication();
            this.addEventListeners();
        },

        initializeApplication: function() {
            var _this = this;
            this.TaskListHolder = new TaskListHolder({
                anchor: _this.rootElement
            });
            initTasks.call(_this);  
        },

        addEventListeners: function() {
        },

        showCreateNewTaskPopup: function() {
            var model = {
                model: {
                    context: this,
                    customCssClass: "task-list_new-task",
                    fields: [
                        {
                            type: Form.getFieldTypes().input
                        },
                        {
                            type: Form.getFieldTypes().description
                        },
                        {
                            type: Form.getFieldTypes().TaskButton
                        },
                        {
                            type: Form.getFieldTypes().closeButton
                        }
                    ]
                }                
            }

            var popup = new Popup(model);
            popup.show();
            this.openedPopup = popup;
        },

        createNewTask: function() {
            var task = new Task({
                title: this.openedPopup.popup.find(".popup__form-input").val(),
                description: this.openedPopup.popup.find(".popup__form-description").val()
            });
            this.TaskListHolder.add(task);
            this.openedPopup.popup.remove();
        },

        drawApplication: function() {
            this.rootElement.append(this.createControlPanel());
            this.TaskListHolder.init();           
        },

        createNewTaskButton: function() {
            var _this = this;
            var button = new Button({
                title: "Create Task",
                clickHandler: _this.showCreateNewTaskPopup.bind(this)
            });
            return button.draw();
        },

        createControlPanel: function() {
            var controlPanel = $("<div />", {
                class: "task-list__control-panel"
            });
            controlPanel.append(this.createNewTaskButton());
            return controlPanel;
        }
    }

    $(document).ready(function() {
        TaskList.init();
    });

})(jQuery);