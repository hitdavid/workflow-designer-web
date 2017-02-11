com.chanjet.gzq.aflowEnd = draw2d.shape.basic.Circle.extend({
	NAME: "com.chanjet.gzq.aflowEnd",
	init: function(){
		this._super();
		
		this.setStroke(3);
		this.setRadius(14);
		this.setBackgroundColor(new draw2d.util.Color("#ffffff"));
		
		var leftLocator = new draw2d.layout.locator.InputPortLocator();
		this.createPort("input",leftLocator);
		
		//this.getInputPort(0).setAlpha(0);
	}
});