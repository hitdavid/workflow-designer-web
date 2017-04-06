draw2d = draw2d.default;

Start = draw2d.shape.basic.Circle.extend({
	NAME: "Start",
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

    toProcessElement: function () {
        return '<startEvent id="BPMN_'+this.getId()+'" name="'+this.getUserData().name+'"></startEvent>';
    },

    toDiagramElement: function () {
        return '<bpmndi:BPMNShape bpmnElement="BPMN_'+this.getId()+'" id="BPMN_'+this.getId()+'">' +
            '<omgdc:Bounds height="'+this.getHeight()+'" width="'+this.getWidth()+'" x="'+this.getBoundingBox().getTopLeft().getX()+'" y="'+this.getBoundingBox().getTopLeft().getY()+'"></omgdc:Bounds>' +
            '</bpmndi:BPMNShape>';
    },
});