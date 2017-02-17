com.chanjet.gzq.aflowEnd = draw2d.shape.basic.Circle.extend({
	NAME: "com.chanjet.gzq.aflowEnd",
	init: function(){
		this._super();
		
		this.setStroke(3);
		this.setRadius(14);
		this.setBackgroundColor(new draw2d.util.Color("#ffffff"));
		
		var leftLocator = new draw2d.layout.locator.InputPortLocator();
		this.createPort("input",leftLocator);

        this.userData = {
            name: "流程结束",
            id: this.id,
            type: "End",
            color: this.getColor().hex(),
            label: '',
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