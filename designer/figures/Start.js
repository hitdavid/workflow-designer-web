com.chanjet.gzq.aflow.Start = draw2d.shape.basic.Circle.extend({
	NAME: "com.chanjet.gzq.aflow.Start",
	init: function(){
		this._super();
		
		this.setStroke(1);
		this.setRadius(15);
		this.setBackgroundColor(new draw2d.util.Color("#99FF99"));

        this.setResizeable(false);
		
		var rightLocator = new draw2d.layout.locator.OutputPortLocator();
		var p = this.createPort("output",rightLocator);
        p.setMaxFanOut(1);

        this.userData = {
            name: "流程开始",
            id: this.id,
            type: "Start",
            label: '流程开始',
        };
	},

    onDoubleClick: function() {},

    onContextMenu:function(x,y){
        $.contextMenu({
            selector: "body",
            events:
                {
                    hide:function(){ $.contextMenu( 'destroy' ); }
                },
            callback: $.proxy(function(key, options)
            {
                switch(key){
                    case "delete":
                        var cmd = new draw2d.command.CommandDelete(this);
                        this.getCanvas().getCommandStack().execute(cmd);
                    default:
                        break;
                }

            },this),
            x:x,
            y:y,
            items:
                {
                    "delete": {name: "Delete", icon: "delete"}
                }
        });
    },
});