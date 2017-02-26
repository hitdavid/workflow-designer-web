if(typeof com == "undefined")
	var com = {};
com.chanjet = {};
com.chanjet.gzq = {};
com.chanjet.gzq.aflow = {};
com.chanjet.gzq.aflow.Application = Class.extend({

	appName: "com.chanjet.gzq.aflow.Application",

	/**
	 * @constructor
	 * 
	 * @param Option param {String} canvasID the id of the DOM element to use as paint container.
	 */
	init: function(canvasID){
		//-- 1. activiti-designer的画布
		this.canvas = new com.chanjet.gzq.aflow.Canvas('Canvas');
		
		//-- 2. activiti-designer的连接器(全局)
		draw2d.Connection.createConnection = this.createConnection;
		
		//-- 3. activiti-designer的手风琴导航菜单
		this.accordion = new com.chanjet.gzq.aflow.Accordion(this.canvas);
		
		//-- 4. activiti-designer的工具条
		this.toolbar = new com.chanjet.gzq.aflowToolBar(this.canvas);
		
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

		    var element = new (eval(e.type));
		    var keys = Object.getOwnPropertyNames(e);
            if (e.type == "com.chanjet.gzq.aflow.Connection") {
                conns.push(e);
            }
            else {
		        keys.forEach ( function (k) {
                    if (k.toLowerCase().indexOf("color") >= 0) {
                        element[k] = new draw2d.util.Color(e[k]);
                        // TODO: add a color deserializer here from json for color and bgColor fields
                    }
                    else if (k == "ports") {
                        if (e.type == "com.chanjet.gzq.aflow.BranchTask") {
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
                        return;
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

            var element = self.createConnection(start, end);
            element.userData = e.userData;
            if (start.parent.cssClass == 'com_chanjet_gzq_aflow_BranchTask') {
                element.showExpression();
            }

            element.sourcePort = start;
            element.targetPort = end;
            self.canvas.add(element, element.x, element.y);

        });
	},

	createConnection: function(sourcePort, targetPort){

		var conn = new com.chanjet.gzq.aflow.Connection();

        if(sourcePort != null && sourcePort.parent != null) {
            conn.userData['from'] = sourcePort.parent.id;

            if (sourcePort.parent.cssClass == 'com_chanjet_gzq_aflow_BranchTask') {
                conn.userData['operator'] = '';
                conn.userData['expression'] = '';
                conn.setColor('#0000ff');
                conn.showExpression();
            }
        }

		if(targetPort != null && targetPort.parent != null) {
			// console.log("end: " + targetPort.parent.type + "(id:" + targetPort.parent.id + ")");
            conn.userData['to'] = targetPort.parent.id;
		}

	    return conn;
	},

});