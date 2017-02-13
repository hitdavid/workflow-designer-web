
if(typeof com == "undefined")
	var com = {};
com.chanjet = {};
com.chanjet.gzq = {};
com.chanjet.gzq.aflow = {};
com.chanjet.gzq.aflowApplication = Class.extend({
	appName: "com.chanjet.gzq.aflowApplication",

	/**
	 * @constructor
	 * 
	 * @param Option param {String} canvasID the id of the DOM element to use as paint container.
	 */
	init: function(canvasID){
		//-- 1. activiti-designer的画布
		this.canvas = new com.chanjet.gzq.aflowCanvas('activitiCanvas');
		
		//-- 2. activiti-designer的连接器(全局)
		draw2d.Connection.createConnection = this.createConnection;
		
		//-- 3. activiti-designer的手风琴导航菜单
		this.accordion = new com.chanjet.gzq.aflowAccordion(this.canvas);
		
		//-- 4. activiti-designer的工具条
		this.toolbar = new com.chanjet.gzq.aflowToolBar(this.canvas);
		
	},
	loadFigure: function(json){

		this.canvas.clear();
		var self = this;

		var elements = [];
		var conns = [];

		json.forEach(function (e, i) {

		    var element = new (eval(e.type));
		    var keys = Object.getOwnPropertyNames(e);
            if (e.type == "draw2d.Connection") {
                conns.push(e);
            }
            else {
		        keys.forEach ( function (k) {
                    if (k.toLowerCase().indexOf("color") >= 0) {
                        return;
                    }
                    else if (k == "ports") {
                        if (e.type == "com.chanjet.gzq.aflowBranchTask") {
                            //分支条件，需要初始化多个ports
                            if (e[k].length > 2) {
                                for (var i = e[k].length - 3; i >= 0; i--) {
                                    var rightLocator = new draw2d.layout.locator.OutputPortLocator();
                                    element.createPort("output",rightLocator);
                                }
                            }
                        }
                    }
                    else {
                        element[k] = e[k];
                    }
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
            element.sourcePort = start;
            element.targetPort = end;
            self.canvas.add(element, element.x, element.y);

        });

		//this.canvas.add(new com.chanjet.gzq.aflowStart(),200,80);
		// this.canvas.add(new com.chanjet.gzq.aflowEnd(),350,250);
		
		
	},	
	createConnection: function(sourcePort, targetPort){
		//-- 1. 连接
		//var conn = new draw2d.Connection();
		var conn = new draw2d.Connection(new draw2d.policy.line.VertexSelectionFeedbackPolicy());
		conn.setStroke(1);
		
		//-- 2. 设置连接的锚
		var targetDecorator = new draw2d.decoration.connection.ArrowDecorator(12,12);
		targetDecorator.setBackgroundColor("#000000");
		conn.setTargetDecorator(targetDecorator);
		
		//-- 3. 设置路由
	    //conn.setRouter(new draw2d.layout.connection.VertexRouter());
		conn.setRouter(new draw2d.layout.connection.SplineConnectionRouter());

		var policy = new draw2d.policy.line.VertexSelectionFeedbackPolicy();

        policy.__proto__.__proto__.onSelectCallBack = function (canvas, figure, isPrimarySelection) {
            console.log("break");
        }

        if(sourcePort != null && sourcePort.parent != null) {
            console.log("from :" + sourcePort.parent.cssClass)
        }

		if(targetPort != null && targetPort.parent != null) {
			console.log("end: " + targetPort.parent.cssClass)
		}

        conn.installEditPolicy(policy);

	    return conn;
	}
});