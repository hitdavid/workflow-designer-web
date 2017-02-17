var theMeta = {
    _super: {
        browsable: false
    },
    dasharray: {
        browsable: false
    },
    glowIsActive: {
        browsable: false
    },
    portRelayoutRequired: {
        browsable: false
    },
    setterWhitelist: {
        browsable: false
    },
    getterWhitelist: {
        browsable: false
    },
    isResizeHandle: {
        browsable: false
    },
    command: {
        browsable: false
    },
    canvas: {
        browsable: false
    },
    shape: {
        browsable: false
    },
    children: {
        browsable: false
    },
    canSnapToHelper: {
        browsable: false
    },
    editPolicy: {
        browsable: false
    },
    timerId: {
        browsable: false
    },
    timerInterval: {
        browsable: false
    },
    parent: {
        browsable: false
    },
    composite: {
        browsable: false
    },
    userData: {
        browsable: false
    },
    cssClass: {
        browsable: false
    },
    isInDragDrop: {
        browsable: false
    },
    repaintBlocked: {
        browsable: false
    },
    lastAppliedAttributes: {
        browsable: false
    },
    selectionHandles: {
        browsable: false
    },
    eventSubscriptions: {
        browsable: false
    },
    _inEvent: {
        browsable: false
    },
    lastAppliedRotation: {
        browsable: false
    },
    originalAlpha: {
        browsable: false
    },
    isMoving: {
        browsable: false
    },
    oldPoint: {
        browsable: false
    },
    sourceDecorator: {
        browsable: false
    },
    targetDecorator: {
        browsable: false
    },
    sourceDecoratorNode: {
        browsable: false
    },
    targetDecoratorNode: {
        browsable: false
    },
    svgPathString: {
        browsable: false
    },
    router: {
        browsable: false
    },
    routingRequired: {
        browsable: false
    },
    lineSegments: {
        browsable: false
    },
    corona: {
        browsable: false
    },
    isGlowing: {
        browsable: false
    },
    outlineVisible: {
        browsable: false
    },
    vertices: {
        browsable: false
    },
    snapToGridAnchor: {
        browsable: false
    },
    strokeBeforeGlow: {
        browsable: false
    },
    persistPorts: {
        browsable: false
    },



    x: {
        browsable: true,
        group: "布局",
        type: 'text'
    },
    y: {
        browsable: true,
        group: "布局",
        type: 'text'
    },
    ox: {
        browsable: true,
        group: "布局",
        type: 'text'
    },
    oy: {
        browsable: true,
        group: "布局",
        type: 'text'
    },
    width: {
        browsable: true,
        group: "布局",
        type: 'text'
    },
    height: {
        browsable: true,
        group: "布局",
        type: 'text'
    },
    minHeight: {
        browsable: true,
        group: "布局",
        type: 'text'
    },
    minWidth: {
        browsable: true,
        group: "布局",
        type: 'text'
    },
    rotationAngle: {
        browsable: true,
        group: "布局",
        type: 'text'
    },
    keepAspectRatio: {
        browsable: true,
        group: "布局",
        type: 'boolean'
    },
    minX: {
        browsable: true,
        group: "布局",
        type: 'text'
    },
    minY: {
        browsable: true,
        group: "布局",
        type: 'text'
    },
    maxX: {
        browsable: true,
        group: "布局",
        type: 'text'
    },
    maxY: {
        browsable: true,
        group: "布局",
        type: 'text'
    },





    alpha: {
        browsable: true,
        group: "样式",
        type: 'text'
    },
    visible: {
        browsable: true,
        group: "样式"
    },
    color: {
        browsable: true,
        group: "样式",
        type: "color"
    },
    bgColor: {
        browsable: true,
        group: "样式",
        type: "color"
    },
    lineColor: {
        browsable: true,
        group: "样式",
        type: "color"
    },
    outlineColor: {
        browsable: true,
        group: "样式",
        type: "color"
    },
    stroke: {
        browsable: true,
        group: "样式",
        type: 'text'
    },
    outlineStroke: {
        browsable: true,
        group: "样式",
        type: 'text'
    },
    radius: {
        browsable: true,
        group: "样式",
        type: 'text'
    },



    type: {
        browsable: true,
        group: "基本属性",
        type: 'text'
    },
    id: {
        browsable: true,
        group: "基本属性",
        type: 'text'
    },



    selectable: {
        browsable: true,
        group: "行为"
    },
    deleteable: {
        browsable: true,
        group: "行为"
    },
    resizeable: {
        browsable: true,
        group: "行为"
    },
    draggable: {
        browsable: true,
        group: "行为"
    },



    inputPorts: {
        browsable: true,
        group: "连接",
        type: 'object'
    },
    outputPorts: {
        browsable: true,
        group: "连接",
        type: 'object'
    },
    hybridPorts: {
        browsable: true,
        group: "连接",
        type: 'object'
    },
    cachedPorts: {
        browsable: true,
        group: "连接",
        type: 'object'
    },
    sourcePort: {
        browsable: true,
        group: "连接",
        type: 'object'
    },
    targetPort: {
        browsable: true,
        group: "连接",
        type: 'object'
    },
    start: {
        browsable: true,
        group: "连接",
        type: 'object'
    },
    end: {
        browsable: true,
        group: "连接",
        type: 'object'
    },


};

var options = {
    meta: theMeta
};



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
                        element[k] = new draw2d.util.Color(e[k]);
                        // TODO: add a color deserializer here from json for color and bgColor fields
                        // element[k].red = element.bgColor.__proto__.hex2rgb(e[k])[0];
                        // element[k].green = element.bgColor.__proto__.hex2rgb(e[k])[1];
                        // element[k].blue = element.bgColor.__proto__.hex2rgb(e[k])[2];
                        // element[k] = e[k];

                        //return;
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

        if(sourcePort != null && sourcePort.parent != null) {
            console.log("from :" + sourcePort.parent.type + "(id:" + sourcePort.parent.id + ")");
        }

		if(targetPort != null && targetPort.parent != null) {
			console.log("end: " + targetPort.parent.type + "(id:" + targetPort.parent.id + ")");
		}

        conn.installEditPolicy(policy);

	    return conn;
	},

    checkGraph: function() {

	    /*
	    TODO: 规则检查算法：
	    1，每个 port （ 无论 source 还是 target ）都必须有连接线连接。
	    2，每个 sourcePort （不包含会签）只允许一条连接线连出。
	    3，通知 节点不受上述 第2条 限制，允许从任意 sourcePort 引出。
	    4，每个 会签 下方的 sourcePort 可以允许 1+ 个引出线。
	    5，每个 条件分支 节点允许 1+ 个 targetPort 和 1+ 个 sourcePort， 并且每个 sourcePort 都有附加的条件表达式（userData）。
	    6，每个图有且仅有 1 个 开始节点 和 1 个 结束节点。
	    7，任意节点的 驳回，撤销 等业务操作都不在图中表现。
	    8，一个完整的图中，任意一条路径都是起点到终点的路径的一部分，这张图一定是单向无环图。
	    */

    }
});