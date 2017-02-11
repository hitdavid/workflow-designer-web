com.chanjet.gzq.aflowStart = draw2d.shape.basic.Circle.extend({
	NAME: "com.chanjet.gzq.aflowStart",
	init: function(){
		this._super();
		
		this.setStroke(1);
		this.setRadius(15);
		this.setBackgroundColor(new draw2d.util.Color("#ffffff"));
		
		var rightLocator = new draw2d.layout.locator.OutputPortLocator();
		
		this.createPort("output",rightLocator);
		
		//this.getOutputPort(0).setAlpha(0.2);
		
	}
});