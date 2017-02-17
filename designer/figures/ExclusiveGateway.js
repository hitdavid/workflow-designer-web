com.chanjet.gzq.aflowExclusiveGatewayICON = draw2d.shape.icon.Cross.extend({
	NAME: "ExclusiveGatewayICON",
	
	init: function(){
		this._super();
		this.setStroke(0);
		this.setDimension(16,16);
	}
});


com.chanjet.gzq.aflowExclusiveGateway = draw2d.shape.basic.Diamond.extend({
	NAME: "com.chanjet.gzq.aflowExclusiveGateway",
	init: function(){
		this._super();
		
		this.setStroke(1);
		this.setDimension(48,48);
		this.setBackgroundColor(new draw2d.util.Color("#ffffcc"));
		this.setRadius(2);
		
		var ExclusiveGatewayICON = new com.chanjet.gzq.aflowExclusiveGatewayICON();
		var ExclusiveGatewayICONLocation = new draw2d.layout.locator.CenterLocator();
		
		
		this.add(ExclusiveGatewayICON,ExclusiveGatewayICONLocation,0);
		
		var leftLocator = new draw2d.layout.locator.InputPortLocator();
		this.createPort("input",leftLocator);
		
		
		var rightLocator = new draw2d.layout.locator.OutputPortLocator();
        var p = this.createPort("output",rightLocator);
        p.setMaxFanOut(1);
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
			
			
			//var additionalConnection = draw2d.Connection.createConnection();
			//this.getCanvas().add(additionalConnection);
			
			//additionalConnection.setSource(oldSource);
			//additionalConnection.setTarget(this.getInputPort(0));
			
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
               case "red":
                   this.setColor('#f3546a');
                   break;
               case "green":
                   this.setColor('#b9dd69');
                   break;
               case "blue":
                   this.setColor('#00A8F0');
                   break;
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
                "red":    {name: "Red", icon: "edit"},
                "green":  {name: "Green", icon: "cut"},
                "blue":   {name: "Blue", icon: "copy"},
                "sep1":   "---------",
                "delete": {name: "Delete", icon: "delete"}
            }
        });
	} 
	
});









