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

		json['canvas'].forEach(function (e, i) {

		    var element = new (eval(e.type));
		    var keys = Object.getOwnPropertyNames(e);
            if (e.type == "draw2d.Connection") {
                conns.push(e);
            }
            else {
		        keys.forEach ( function (k) {
                    if (k.toLowerCase().indexOf("color") >= 0) {
                        element[k] = new draw2d.util.Color(e[k]);
                        // TODO: add a color deserializer here from json for color and bgColor fields
                    }
                    else if (k == "ports") {
                        if (e.type == "com.chanjet.gzq.aflowBranchTask") {
                            //分支条件，需要初始化多个ports
                            if (e[k].length > 2) {
                                for (var i = e[k].length - 4; i >= 0; i--) {
                                    var rightLocator = new draw2d.layout.locator.OutputPortLocator();
                                    var p = element.createPort("output",rightLocator);
                                    p.setBackgroundColor('#00A8F0');
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

        this.checkGraph();
	},	
	createConnection: function(sourcePort, targetPort){
		//-- 1. 连接
		//var conn = new draw2d.Connection();
		var conn = new draw2d.Connection(new draw2d.policy.line.VertexSelectionFeedbackPolicy());
		conn.setStroke(1);
		
		//-- 2. 设置连接的锚
		var targetDecorator = new draw2d.decoration.connection.ArrowDecorator(5,5);
		targetDecorator.setBackgroundColor("#000000");
		conn.setTargetDecorator(targetDecorator);
		
		//-- 3. 设置路由
	    //conn.setRouter(new draw2d.layout.connection.VertexRouter());
		conn.setRouter(new draw2d.layout.connection.SplineConnectionRouter());

		var policy = new draw2d.policy.line.VertexSelectionFeedbackPolicy();

        policy.__proto__.__proto__.onSelectCallBack = function (canvas, figure, isPrimarySelection) {
            console.log("conn selected: start from " +
                figure.sourcePort.parent.type + "(id:" +
                figure.sourcePort.parent.id + "), to " +
                figure.targetPort.parent.type + "(id:" +
                figure.targetPort.parent.id + ")"
            );
        }

        conn.userData = {
            name: "连接线",
            id: conn.id,
            type: "Connection",
        };

        if(sourcePort != null && sourcePort.parent != null) {
            console.log("from :" + sourcePort.parent.type + "(id:" + sourcePort.parent.id + ")");
            conn.userData['form'] = sourcePort.parent.id;
            if (sourcePort.parent.cssClass == 'com_chanjet_gzq_aflow_BranchTask') {
                conn.userData['operator'] = '';
                conn.userData['expression'] = '';
            }
        }

		if(targetPort != null && targetPort.parent != null) {
			console.log("end: " + targetPort.parent.type + "(id:" + targetPort.parent.id + ")");
            conn.userData['to'] = targetPort.parent.id;
		}

        conn.installEditPolicy(policy);

	    return conn;
	},

    checkGraph: function() {

	    /*
	    TODO: 规则检查算法：
	    1，每个 port （ 无论 source 还是 target ）都必须有连接线连接。
	    2，每个 sourcePort （不包含会签）只允许一条连接线连出。
	    3，通知 节点不受上述 第2条 限制，允许从任意 sourcePort 引出。（作废）
	    4，每个 会签 下方的 sourcePort 可以允许 1+ 个引出线。
	    5，每个 条件分支 节点允许 1 个 targetPort 和 1+ 个 sourcePort， 并且每个 sourcePort 都有附加的条件表达式（userData）。
	    6，每个图有且仅有 1 个 开始节点 和 1 个 结束节点。
	    7，任意节点的 驳回，撤销 等业务操作都不在图中表现。
	    8，一个完整的图中，任意一条路径都是起点到终点的路径的一部分，这张图一定是单向无环图。
	    */

    }
});