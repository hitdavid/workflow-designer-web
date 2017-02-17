com.chanjet.gzq.aflowStart = draw2d.shape.basic.Circle.extend({
	NAME: "com.chanjet.gzq.aflowStart",
	init: function(){
		this._super();
		
		this.setStroke(1);
		this.setRadius(15);
		this.setBackgroundColor(new draw2d.util.Color("#ffffff"));
		
		var rightLocator = new draw2d.layout.locator.OutputPortLocator();
		var p = this.createPort("output",rightLocator);
        p.setMaxFanOut(1);

        this.userData = {
            name: "流程开始",
            id: this.id,
            type: "Start",
            color: this.getColor().hex(),
            label: '',
            outputPort: [
                {
                    name: 'output0',
                    port: 'draw2d.OutputPort',
                    locator: 'draw2d.layout.locator.OutputPortLocator',
                },
            ],
            inputPort: [
            ],
        };
	}
});