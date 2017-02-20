com.chanjet.gzq.aflow.End = draw2d.shape.basic.Circle.extend({
	NAME: "com.chanjet.gzq.aflow.End",
	init: function(){
		this._super();
		
		this.setStroke(1);
		this.setRadius(15);
		this.setBackgroundColor(new draw2d.util.Color("#ffffff"));
		
		var leftLocator = new draw2d.layout.locator.InputPortLocator();
		this.createPort("input",leftLocator);

        this.userData = {
            name: "流程结束",
            id: this.id,
            type: "End",
            color: this.getColor().hex(),
            label: '流程结束',
            outputPort: [
            ],
            inputPort: [
                {
                    name: 'input0',
                    port: 'draw2d.InputPort',
                    locator: 'draw2d.layout.locator.InputPortLocator',
                }
            ],
        };
	}
});