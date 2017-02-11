
//-- declare the namespace for this app
if(typeof com == "undefined")
	var com = {};
com.chanjet = {};
com.chanjet.gzq = {};
com.chanjet.gzq.aflow = {};

/**
 *
 *	Init App Layout
 *	
 *	@author RanJi
 *  @date 2014-12-03
 */
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
	
	loadFigure: function(){
		this.canvas.clear();
	
		this.canvas.add(new com.chanjet.gzq.aflowStart(),200,80);
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
		
		conn.installEditPolicy(new draw2d.policy.line.VertexSelectionFeedbackPolicy());
		
	    return conn;
	}
});