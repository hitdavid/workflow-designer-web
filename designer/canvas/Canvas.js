/**
 * Define WorkSpace's Canvas For ProcessDesigner
 *
 * @author RanJi (����Ҳ����)
 * @date 2014-12-09
 */
com.chanjet.gzq.aflowCanvas = draw2d.Canvas.extend({
	canvasName: "com.chanjet.gzq.aflowCanvas",

	init: function(id){
		this._super(id);
		this.setScrollArea("#"+id);
		this.id = id;
		
		//-- �����������м�����һ�������ڵ��ı༭����
		var MyInterceptorPolicy = draw2d.policy.canvas.ConnectionInterceptorPolicy.extend({

			init : function()
			{
				this._super();
			},

			delegateDrop: function(draggedFigure, dropTarget){
				if(draggedFigure instanceof com.chanjet.gzq.aflowUserTask && dropTarget instanceof draw2d.Connection){
					return dropTarget;
				}
				return this._super(draggedFigure, dropTarget);
			}

		});
		this.installEditPolicy(new MyInterceptorPolicy());
	}
});