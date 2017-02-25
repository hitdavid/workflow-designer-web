com.chanjet.gzq.aflow.RoleTaskText = draw2d.shape.basic.Text.extend({
	NAME: "aflowRoleTaskText",
	
	init: function(text){
		this._super();
		this.setText(text);
		this.setFontFamily("微软雅黑");
		this.setStroke(0);
		
		this.installEditor(new draw2d.ui.LabelInplaceEditor({
		   onCommit: $.proxy(function(value){
			   //-- 更新数据
			   this.getParent().userData.name = value;
			   this.getParent().userData.id = 3;
			   
			   if(this.getWidth()>96)
				this.getParent().setWidth(this.getWidth());
			   else{
				this.getParent().setWidth(96);
			   }
			   this.getParent().setHeight(64);
		   },this),
		   onCancel: function(){
		   }
		}));
	}
});

com.chanjet.gzq.aflow.RoleTask = draw2d.shape.basic.Rectangle.extend({
	NAME: "com.chanjet.gzq.aflow.RoleTask",

	init: function(){
		this._super();
		
		this.setStroke(1);
		this.setDimension(96,64);
		this.setBackgroundColor(new draw2d.util.Color("#ffffcc"));
		this.setRadius(5);
		
		var roleTaskText = new com.chanjet.gzq.aflow.RoleTaskText("管理角色");
		var roleTaskTextLocation = new draw2d.layout.locator.CenterLocator();
		this.add(roleTaskText, roleTaskTextLocation,1);
		
		var leftLocator = new draw2d.layout.locator.InputPortLocator();
		this.createPort("input",leftLocator);
		
		
		var rightLocator = new draw2d.layout.locator.OutputPortLocator();
		p = this.createPort("output",rightLocator);
        p.setMaxFanOut(1);

        this.userData = {
            name: "管理角色",
            id: this.id,
            type: "RoleTask",
            label: roleTaskText.getText(),
            roleIds:'',
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
                   //this.setColor('#f3546a');
				   this.openPropertiesPanel();
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
	},

	openPropertiesPanel: function(){
		var eastPanel = $("#bpm-layout").layout('panel','east');
		if(eastPanel.panel('options').collapsed)
			$("#bpm-layout").layout('expand','east');
		eastPanel.panel('refresh','properties/manualTaskProperties.html');
	},
	
	toXML: function(){
		return '<manualTask id="'+this.userData.id+'" name="'+this.userData.name+'" activiti:assignee="${applyUserID}">'
		+'</manualTask>';
	}
	
});









