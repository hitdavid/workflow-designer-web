com.chanjet.gzq.aflow.Accordion = Class.extend({
	accordionName: "com.chanjet.gzq.aflow.Accordion",

    thisAccordion:null,

	init: function(view){
        thisAccordion = this;
		this.view = view;
		$('.easyui-accordion .easyui-linkbutton').draggable({
			// 代理
			proxy:function(source){
				var p = $('<div class="draggable-model-proxy"></div>');
				p.html($(source).html()).appendTo('body');
				return p;
			},
			deltaX: -5,// 拖拽元素相对于光标的位置X
			deltaY: -5,// 拖拽元素相对于光标的位置Y
			revert: true,// 设置为true,拖拽结束后元素返回起始位置
			cursor: 'pointer',// 手形
			onStartDrag: function(){
				$(this).draggable('options').cursor = "not-allowed";
			},
			onStopDrag: function(){
				$(this).draggable('options').cursor = "pointer";
			}
		});
		
		$('#'+view.id).droppable({
			accept: '.easyui-linkbutton',
			onDragEnter: function(e,source){
				$(source).draggable('options').cursor = 'move';
			},
			onDragLeave: function(e,source){
				$(source).draggable('options').cursor = 'not-allowed';
			},
			onDrop: function(e, source){
				var nodeType = $(source).attr('nodeType');// 图元类型

				var x = $(source).draggable('proxy').offset().left;
				var y = $(source).draggable('proxy').offset().top;

				var xOffset = view.getAbsoluteX();
				var yOffset = view.getAbsoluteY();

				var scrollLeft = view.getScrollLeft();
				var scrollTop = view.getScrollTop();

                thisAccordion.addNode(nodeType, x-xOffset+scrollLeft,y-yOffset+scrollTop);
			}
		});
	},

    addNode: function(nodeType, x, y) {

        var shape = eval("new com.chanjet.gzq.aflow."+nodeType+"()");
        //view.add(shape,x,y);
        var command = new draw2d.command.CommandAdd(app.canvas, shape, x, y);
        app.canvas.getCommandStack().execute(command);// 放入堆栈，撤销或者重做

        var count = 0;
        var sourcePort;
        if (shape.cssClass != 'Connection') {
            app.canvas.figures.data.forEach(function (e, i) {
                if (e.cssClass != "Connection" && e.id != shape.id)  {
                    e.getOutputPorts().each( function (i, p) {
                        p.setMaxFanOut(1);
                        if(p.connections.data.length==0) {
                            count += 1;
                            sourcePort = p;
                        }
                    });
                }
            });
        }
        if(count == 1) {
            var cmd = new draw2d.command.CommandConnect(app.canvas, sourcePort, shape.inputPorts.data[0]);
            app.canvas.getCommandStack().execute(cmd);// 放入堆栈，撤销或者重做
            if (sourcePort.parent.cssClass == 'BranchTask') {
                cmd.connection.showExpression();
            }
        }
    },
});