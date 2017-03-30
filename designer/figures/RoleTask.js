com.chanjet.gzq.aflow.RoleTaskText = draw2d.shape.basic.Text.extend({
	NAME: "aflowRoleTaskText",
	
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

com.chanjet.gzq.aflow.RoleTaskImage = draw2d.shape.basic.Image.extend({
    NAME: "RoleTaskImage",

    init: function(path){
        this._super();
        this.setPath(path);
    }
});

com.chanjet.gzq.aflow.RoleTask = draw2d.shape.basic.Rectangle.extend({

	NAME: "RoleTask",
    IMAGE: null,

	init: function(){
		this._super();
		
		this.setStroke(1);
		this.setDimension(60,60);
		this.setBackgroundColor(new draw2d.util.Color("#ffffff"));
		// this.setRadius(32);


        this.setResizeable(false);
		
		var roleTaskText = new com.chanjet.gzq.aflow.RoleTaskText("管理角色");
		var roleTaskTextLocation = new draw2d.layout.locator.BottomLocator();
		this.add(roleTaskText, roleTaskTextLocation, 1);

        this.IMAGE = new com.chanjet.gzq.aflow.UserTaskImage("styles/icons/role.png");
        var userTaskImageLocation = new draw2d.layout.locator.CenterLocator();
        this.add(this.IMAGE, userTaskImageLocation,1);
		
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
            avator:'',
        };
	},

    setImage: function(url) {
        this.IMAGE.setPath(url);
    },

    onDoubleClick: function() {},
	
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
             callback: $.proxy(function(key, options) {
                 switch(key){
                     case "delete":
                         var cmd = new draw2d.command.CommandDelete(this);
                         this.getCanvas().getCommandStack().execute(cmd);
                         break;
                     case "appendUserTask":
                         app.canvas.appendTask(this, 'UserTask');
                         break;
                     case "appendRoleTask":
                         app.canvas.appendTask(this, 'RoleTask');
                         break;
                     case "convertToUserTask":
                         app.canvas.convertTaskType(this, "UserTask");
                         break;
                     default:
                         break;
                 }

             },this),
            x:x,
            y:y,
            items: 
            {
                "delete": {name: "删除", icon: "delete"},
                "sep1":   "---------",
                "appendUserTask": {name: "添加一个固定审批人员节点", icon: ""},
                "appendRoleTask": {name: "添加一个上级主管节点", icon: ""},
                "sep2":   "---------",
                "convertToUserTask": {name: "节点变更为固定审批人员节点", icon: ""},
            }
        });
	},
	
});









