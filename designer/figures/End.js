com.chanjet.gzq.aflow.End = draw2d.shape.basic.Circle.extend({
	NAME: "End",
	init: function(){
		this._super();
		
		this.setStroke(1);
		this.setRadius(15);
		this.setBackgroundColor(new draw2d.util.Color("#FF9999"));

        this.setResizeable(false);
		
		var leftLocator = new draw2d.layout.locator.InputPortLocator();
		this.createPort("input",leftLocator);

        this.userData = {
            name: "流程结束",
            id: this.id,
            type: "End",
            label: '流程结束',
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
        return '<endEvent id="BPMN_'+this.getId()+'" name="'+this.getUserData().name+'"></endEvent>';
    },

    toDiagramElement: function () {
        return '<bpmndi:BPMNShape bpmnElement="BPMN_'+this.getId()+'" id="BPMN_'+this.getId()+'">' +
            '<omgdc:Bounds height="'+this.getHeight()+'" width="'+this.getWidth()+'" x="'+this.getBoundingBox().getTopLeft().getX()+'" y="'+this.getBoundingBox().getTopLeft().getY()+'"></omgdc:Bounds>' +
            '</bpmndi:BPMNShape>';
    },
});