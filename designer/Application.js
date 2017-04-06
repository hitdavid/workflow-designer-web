// import Class from 'Class';
// import Class from "../scripts/draw2d/lib/Class.js";

draw2d = draw2d.default;


Application = Class.extend({

	appName: "Application",

	/**
	 * @constructor
	 * 
	 * @param Option param {String} canvasID the id of the DOM element to use as paint container.
	 */
	init: function(canvasID){
		//-- 1. activiti-designer的画布

        var uuid = draw2d.util.UUID.create();

		this.canvas = new Canvas('Canvas');
		this.canvas.userData.id = uuid;

		//-- 2. activiti-designer的连接器(全局)
		draw2d.Connection.createConnection = this.createConnection;
		
		//-- 3. activiti-designer的手风琴导航菜单
		this.accordion = new Accordion(this.canvas);
		
		//-- 4. activiti-designer的工具条
		this.toolbar = new ToolBar(this.canvas);
		
	},
	loadFigure: function(json){

		this.canvas.clear();
		var self = this;

		var elements = [];
		var conns = [];

		this.canvas.userData = json['userData'];

		if(json['canvas'].length == 0) {
		    return;
        }

		json['canvas'].forEach(function (e, i) {

		    var element = eval("new "+e.type+"()");

            var keys = Object.getOwnPropertyNames(e);
            if (e.type == "Connection") {
                conns.push(e);
            }
            else {
		        keys.forEach ( function (k) {
                    if (k.toLowerCase().indexOf("color") >= 0) {
                        element[k] = new draw2d.util.Color(e[k]);
                        // TODO: add a color deserializer here from json for color and bgColor fields
                    }
                    else if (k == "ports") {
                        if (e.type == "BranchTask") {
                            //分支条件，需要初始化多个ports
                            if (e[k].length > 2) {
                                for (var i = e[k].length - 4; i >= 0; i--) {
                                    var rightLocator = new draw2d.layout.locator.OutputPortLocator();
                                    var p = element.createPort("output",rightLocator);
                                    p.setBackgroundColor('#00FF00');
                                    p.setMaxFanOut(1);
                                }
                            }
                        }
                    }
                    else if (k == 'vertices') {

                    }
                    else {
                        element[k] = e[k];
                    }
                });

                element.getOutputPorts().each( function (i, p) {
                        p.setMaxFanOut(1);
                });

                elements.push(element);

                self.canvas.add(element, element.x, element.y);
            }
        });

		conns.forEach ( function (e, i) {

		    var start = null;
		    var end = null;

		    elements.forEach(function (shape, i) {
                if(shape.id == e.source.node) {
                    for (var size = shape.outputPorts.data.length - 1; size >= 0; size --) {
                        if (shape.outputPorts.data[size].name == e.source.port) {
                            start = shape.outputPorts.data[size];
                        }
                    }
                }
                if(shape.id == e.target.node) {
                    for (var size = shape.inputPorts.data.length - 1; size >= 0; size --) {
                        if (shape.inputPorts.data[size].name == e.target.port) {
                            end = shape.inputPorts.data[size];
                        }
                    }
                }
            });

            var cmd = new draw2d.command.CommandConnect(self.canvas, start, end);
            // self.canvas.getCommandStack().execute(cmd);
            cmd.execute();
            cmd.connection.id = e.id;
            cmd.connection.userData = e.userData;
            if (start.parent.cssClass == 'BranchTask') {
                cmd.connection.showExpression();
            }

        });
	},

	createConnection: function(sourcePort, targetPort){

		var conn = new Connection();

        if(sourcePort != null && sourcePort.parent != null) {
            conn.userData['from'] = sourcePort.parent.id;

            if (sourcePort.parent.cssClass == 'BranchTask') {
                conn.userData['expression'] = '';
                conn.setColor('#0000ff');
                conn.userData['help']=
                "条件输入支持：<br />" +
                "逗号分隔的多个条件，同时满足<br />" +
                "<br />" +
                "支持的运算符：<br />" +
                "> 大于<br />" +
                ">= 大于等于<br />" +
                "< 小于<br />" +
                "<= 大于等于<br />" +
                "= 等于<br />"+
                "!= 不等于<br />"+
                "* 缺省条件，不满足其他条件时成立<br />"+
                "<br />" +
                "例子：<br />" +
                ">500, <= 50000<br />" +
                "-表示条件大于500并且小于等于50000<br />" +
                "=1, =2, =3<br />" +
                "-表示条件等于1，2，或者3<br />"+
                "=报销单<br />" +
                "-表示条件等于报销单<br />",
                conn.showExpression();
            }
        }

		if(targetPort != null && targetPort.parent != null) {
            conn.userData['to'] = targetPort.parent.id;
		}

	    return conn;
	},

});