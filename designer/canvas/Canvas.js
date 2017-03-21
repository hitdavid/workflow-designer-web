com.chanjet.gzq.aflow.Canvas = draw2d.Canvas.extend({
	canvasName: "com.chanjet.gzq.aflow.Canvas",

	init: function(id){
		this._super(id);
		this.setScrollArea("#"+id);
		this.id = id;

		var MyInterceptorPolicy = draw2d.policy.canvas.ConnectionInterceptorPolicy.extend({

			init : function()
			{
				this._super();
			},

			delegateDrop: function(draggedFigure, dropTarget){
				return this._super(draggedFigure, dropTarget);
			}

		});
		this.installEditPolicy(new MyInterceptorPolicy());

        this.userData = {
            name: "流程模版",
            id: this.id,
            type: "FlowDefinition",
            formTemplateId: 'uuid',
            formTemplateName: '表单模版名称',
        };
	},

	insertTask: function (connection, taskType) {

        var x = connection.getBoundingBox().getTopLeft().getX() + (connection.getBoundingBox().getWidth() / 2) - 48;
        var y = thisTask.getBoundingBox().getCenter().getY();

        var sourcePort = connection.getSource();
        var targetPort = connection.getTarget();

        var cmd = new draw2d.command.CommandDelete(connection);
        this.getCommandStack().execute(cmd);

        var shape = eval("new com.chanjet.gzq.aflow."+taskType+"()");
        var command = new draw2d.command.CommandAdd(this, shape, x, y);
        this.getCommandStack().execute(command);

        var cmd = new draw2d.command.CommandConnect(this, sourcePort, shape.inputPorts.data[0]);
        // cmd.execute();
        this.getCommandStack().execute(cmd);
        if (sourcePort.parent.cssClass == 'BranchTask') {
            connection.showExpression();
        }

        cmd = new draw2d.command.CommandConnect(this, shape.outputPorts.data[0], targetPort);
        // cmd.execute();
        this.getCommandStack().execute(cmd);
    },

    appendTask: function (thisTask, taskType, value, xPos, yPos) {

	    var emptyPort = null;
	    thisTask.outputPorts.data.forEach(function (e, i) {
            if(e.connections.data.length == 0) {
                emptyPort = e;
            }
        });

        if(emptyPort == null) {
	        return;
        }

        var x = xPos != null? xPos : thisTask.getBoundingBox().getTopLeft().getX() + 96 + 100;
        var y = yPos != null? yPos : thisTask.getBoundingBox().getCenter().getY();

        var shape = eval("new com.chanjet.gzq.aflow."+taskType+"()");

        if(taskType == "UserTask") {
            shape.userData['userIds'] = value;
        }
        else if(taskType == "RoleTask") {
            shape.userData['roleIds'] = value;
        }
        else {
            console.log(value);
        }


        var command = new draw2d.command.CommandAdd(this, shape, x, y - shape.getHeight() / 2);
        this.getCommandStack().execute(command);

        var cmd = new draw2d.command.CommandConnect(this, emptyPort, shape.inputPorts.data[0]);
        // cmd.execute();
        this.getCommandStack().execute(cmd);

        if (thisTask.cssClass == 'BranchTask') {
            cmd.connection.showExpression();
        }

        return shape;
    },

    convertTaskType: function (thisTask, newTaskType, value) {

        var shape = eval("new com.chanjet.gzq.aflow."+newTaskType+"()");

        if(taskType == "UserTask") {
            shape.userData['userIds'] = value;
        }
        else if(taskType == "RoleTask") {
            shape.userData['roleIds'] = value;
        }
        else {
            console.log(value);
        }

        var command = new draw2d.command.CommandAdd(this, shape, thisTask.x, thisTask.y);
        this.getCommandStack().execute(command);

        command = new draw2d.command.CommandDelete(connection);
        this.getCommandStack().execute(command);


        var emptyPort = null;
        thisTask.outputPorts.data.forEach(function (e, i) {
            if(e.connections.data.length == 0) {
                emptyPort = e;
            }
        });

        if(emptyPort == null) {
            return;
        }

        var x = thisTask.getBoundingBox().getTopLeft().getX() + 96 + 100;
        var y = thisTask.getBoundingBox().getTopLeft().getY();



        var cmd = new draw2d.command.CommandConnect(this, emptyPort, shape.inputPorts.data[0]);
        // cmd.execute();
        this.getCommandStack().execute(cmd);

        if (thisTask.cssClass == 'BranchTask') {
            cmd.connection.showExpression();
        }

        return shape;
    },

    appendBranchTaskFromWizard: function (thisTask, value) {

        var padding = 50;
        var heightOfTaskFigure = 32;

        var shape = new com.chanjet.gzq.aflow.BranchTask();
        var emptyPort = null;
        thisTask.outputPorts.data.forEach(function (e, i) {
            if(e.connections.data.length == 0) {
                emptyPort = e;
            }
        });

        if(emptyPort == null) {
            return;
        }

        var x = thisTask.getBoundingBox().getTopLeft().getX() + 96 + 100;
        var y = thisTask.getBoundingBox().getCenter().getY();

        var command = new draw2d.command.CommandAdd(this, shape, x, y - shape.getHeight()/2);
        this.getCommandStack().execute(command);

        var cmd = new draw2d.command.CommandConnect(this, emptyPort, shape.inputPorts.data[0]);
        // cmd.execute();
        this.getCommandStack().execute(cmd);

        if (thisTask.cssClass == 'BranchTask') {
            cmd.connection.showExpression();
        }

        for(var i = value.length - 2; i > 0; i--) {
            shape.addCase();
        }

        var totalHeight = (heightOfTaskFigure + padding) * value.length;

        value.forEach(function (element, index) {

            app.canvas.appendTask(shape, 'UserTask', "", shape.getBoundingBox().getTopLeft().getX() + 250,
                shape.getBoundingBox().getTopLeft().getY() + totalHeight/2 - (heightOfTaskFigure + padding) * index);
        });

        shape.outputPorts.data.forEach(function (port, index) {
            port.connections.data.forEach(function (connection, i) {
                connection.userData['expression'] = value[index];
                connection.showExpression();
                return;
            });
        });

        return shape;
    },

    getLastTask: function () {

        var sourcePort;

        app.canvas.figures.data.forEach(function (e, i) {
            if (e.cssClass != "Connection")  {
                e.getOutputPorts().each( function (i, p) {
                    p.setMaxFanOut(1);
                    if(p.connections.data.length==0) {
                        sourcePort = p;
                    }
                });
            }
        });

        return sourcePort.parent;

    },

});