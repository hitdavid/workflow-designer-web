com.chanjet.gzq.aflow.CountersignTEXT = draw2d.shape.basic.Text.extend({
    NAME: "CountersignTEXT",

    init: function(text){
        this._super();
        this.setText(text);
        this.setFontFamily("微软雅黑");
        this.setStroke(0);

        this.installEditor(new draw2d.ui.LabelInplaceEditor({
            onCommit: $.proxy(function(value){
                this.getParent().userData.name = value;
            },this),
            onCancel: function(){
            }
        }));
    }
});

com.chanjet.gzq.aflow.CountersignTask = draw2d.shape.basic.Diamond.extend({
	NAME: "com.chanjet.gzq.aflow.CountersignTask",

	init: function(){
		this._super();

        this.setStroke(1);
        this.setDimension(64,64);
        this.setBackgroundColor(new draw2d.util.Color("#ffffcc"));
        this.setRadius(5);

        this.setResizeable(false);

		var CountersignTEXT = new com.chanjet.gzq.aflow.CountersignTEXT("会签");
		var CountersignTEXTLocation = new draw2d.layout.locator.CenterLocator();
		this.add(CountersignTEXT, CountersignTEXTLocation, 1);
		
		var leftLocator = new draw2d.layout.locator.InputPortLocator();
		this.createPort("input", leftLocator);

		var rightLocator = new draw2d.layout.locator.OutputPortLocator();
		var p = this.createPort("output", rightLocator);
        p.setMaxFanOut(1);

        this.userData = {
            name: "会签",
            id: this.id,
            type: "CountersignTask",
            label: CountersignTEXT.getText(),
            roleIds: '',
            userIds: '',
        };
	},
	
	 /**
     *
     *  Called if the user drop this element onto the dropTarget. 
     * 
     *  will create a "smart insert" of an existing connection.
     * 	COOL and fast network editing.
     * 
     * @param {draw2d.Figure} dropTarget The drop target.
     * @param {Number} x the x coordinate of the drop
     * @param {Number} y the y coordinate of the drop
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @private
     **/
	onDrop: function(dropTarget,x,y,shiftKey,ctrlKey){
		// Activate a "smart insert" If the user drop this figure on connection
    	if(dropTarget instanceof draw2d.Connection){
		
			var oldSource = dropTarget.getSource();
			
			dropTarget.setSource(this.getOutputPort(0));

			var cmd = new draw2d.command.CommandConnect(this.getCanvas(),oldSource,this.getInputPort(0));
			this.getCanvas().getCommandStack().execute(cmd);
			
    	}
	},
	
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
                   // without undo/redo support
              //     this.getCanvas().remove(this);
                   
                   // with undo/redo support
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
	}


	
});









