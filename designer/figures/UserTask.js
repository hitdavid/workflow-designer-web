com.chanjet.gzq.aflow.UserTaskText = draw2d.shape.basic.Text.extend({
	NAME: "UserTaskText",
	
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

com.chanjet.gzq.aflow.UserTaskImage = draw2d.shape.basic.Image.extend({
    NAME: "UserTaskImage",

    init: function(path){
        this._super();
        this.setPath(path);
    }
});

com.chanjet.gzq.aflow.UserTask = draw2d.shape.basic.Rectangle.extend({
	NAME: "UserTask",

    image:null,

	init: function(){
		this._super();
		
		this.setStroke(1);
		this.setDimension(60,60);
		// this.setRadius(32);
		this.setBackgroundColor(new draw2d.util.Color("#ffffcc"));
		this.setRadius(1);

        this.setResizeable(false);

		var userTaskText = new com.chanjet.gzq.aflow.UserTaskText("固定人员");
		var userTaskTextLocation = new draw2d.layout.locator.BottomLocator();
		this.add(userTaskText, userTaskTextLocation,1);

        image = new com.chanjet.gzq.aflow.UserTaskImage("");
        var userTaskImageLocation = new draw2d.layout.locator.CenterLocator();
        this.add(image, userTaskImageLocation,1);
		
		var leftLocator = new draw2d.layout.locator.InputPortLocator();
		this.createPort("input",leftLocator);

		var rightLocator = new draw2d.layout.locator.OutputPortLocator();
		var p = this.createPort("output",rightLocator);
        p.setMaxFanOut(1);
		
		this.userData = {
			name: "固定人员",
			id: this.id,
			type: "UserTask",
            label: userTaskText.getText(),
            userIds:'',
		};
	},

    setImage: function (url) {
	    image.setPath(url);
    },

	onDrop: function(dropTarget,x,y,shiftKey,ctrlKey){
		// Activate a "smart insert" If the user drop this figure on connection
    	if(dropTarget instanceof draw2d.Connection){
		
			var oldSource = dropTarget.getSource();
			
			dropTarget.setSource(this.getOutputPort(0));

			var cmd = new draw2d.command.CommandConnect(this.getCanvas(),oldSource,this.getInputPort(0));
			this.getCanvas().getCommandStack().execute(cmd);
    	}
	},

    onDoubleClick: function() {
        this.onContextMenu(x, y);
	},
	
	onContextMenu:function(x,y){
		 $.contextMenu({
			 selector: "body",
			 events: {
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
					 case "convertToRoleTask":
					 	 app.canvas.convertTaskType(this, "RoleTask");
                         break;
                     default:
                        break;
                 }
            
             },this),
             x:x,
             y:y,
             items: {
                "delete": {name: "删除", icon: "delete"},
                 "sep1":   "---------",
                "appendUserTask": {name: "添加一个固定审批人员节点", icon: ""},
                "appendRoleTask": {name: "添加一个上级主管节点", icon: ""},
                 "sep2":   "---------",
                "convertToRoleTask": {name: "节点变更为上级主管节点", icon: ""},
             }
		 });
	},
	
});
