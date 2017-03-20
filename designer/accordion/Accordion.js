com.chanjet.gzq.aflow.Accordion = Class.extend({
	accordionName: "com.chanjet.gzq.aflow.Accordion",

	init: function(view){
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
			onDrop: function(e,source){
				var nodeType = $(source).attr('nodeType');// 图元类型
				console.log(nodeType);
				
				var x = $(source).draggable('proxy').offset().left;
				var y = $(source).draggable('proxy').offset().top;
				//console.log("["+x+":"+y+"]");
				
				var xOffset = view.getAbsoluteX();
				var yOffset = view.getAbsoluteY();
				//console.log("["+xOffset+":"+yOffset+"]");
				
				var scrollLeft = view.getScrollLeft();
				var scrollTop = view.getScrollTop();
				//console.log("["+scrollLeft+":"+scrollTop+"]");
				
				var shape = eval("new com.chanjet.gzq.aflow."+nodeType+"()");
				//view.add(shape,x,y);
                var command = new draw2d.command.CommandAdd(view,shape,x-xOffset+scrollLeft,y-yOffset+scrollTop);
                view.getCommandStack().execute(command);// 放入堆栈，撤销或者重做

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

                    var cmd = new draw2d.command.CommandConnect(view, sourcePort, shape.inputPorts.data[0]);
                    view.getCommandStack().execute(cmd);// 放入堆栈，撤销或者重做
                    if (sourcePort.parent.cssClass == 'BranchTask') {
                        cmd.connection.showExpression();
                    }
                }

			}
		});

	}
});