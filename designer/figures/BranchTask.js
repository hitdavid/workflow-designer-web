com.chanjet.gzq.aflow.BranchTaskText = draw2d.shape.basic.Text.extend({
    NAME: "BranchTaskText",

    init: function(text){
        this._super();
        this.setText(text);
        this.setFontFamily("微软雅黑");
        this.setStroke(0);

        this.installEditor(new draw2d.ui.LabelInplaceEditor({
            onCommit: $.proxy(function(value){
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

com.chanjet.gzq.aflow.BranchTask = draw2d.shape.basic.Triangle.extend({
    NAME: "com.chanjet.gzq.aflow.BranchTask",

    init: function(){
        this._super();

        this.setStroke(1);
        this.setDimension(96, 96);
        this.setBackgroundColor(new draw2d.util.Color("#ffffcc"));
        this.setRadius(2);

        var BranchTaskText = new com.chanjet.gzq.aflow.BranchTaskText("条件");
        var BranchTaskTextLocation = new draw2d.layout.locator.CenterLocator();
        this.add(BranchTaskText, BranchTaskTextLocation,1);

        var leftLocator = new draw2d.layout.locator.InputPortLocator();
        this.createPort("input", leftLocator);

        var rightLocator0 = new draw2d.layout.locator.OutputPortLocator();
        var outputPort0 = this.createPort("output", rightLocator0);
        outputPort0.setBackgroundColor('#00A8F0');
        outputPort0.setMaxFanOut(1);

        var rightLocator1 = new draw2d.layout.locator.OutputPortLocator();
        var outputPort1 = this.createPort("output", rightLocator1);
        outputPort1.setBackgroundColor('#00A8F0');
        outputPort1.setMaxFanOut(1);


        this.userData = {
            name: "条件分支",
            id: this.id,
            type: "BranchTask",
            color: this.getColor().hex(),
            label: BranchTaskText.getText(),
            inputPort: [
                {
                    name: 'input0',
                    port: 'draw2d.InputPort',
                    locator: 'draw2d.layout.locator.InputPortLocator',
                }
            ],
            outputPort: [
                {
                    name: 'output0',
                    port: 'draw2d.OutputPort',
                    locator: 'draw2d.layout.locator.OutputPortLocator',
                    operator: '',
                    expression: '',
                },
                {
                    name: 'output1',
                    port: 'draw2d.OutputPort',
                    locator: 'draw2d.layout.locator.OutputPortLocator',
                    operator: '',
                    expression: '',
                },
            ],
            templateId: 'uuid',
            templateName: '表单模版名称',
            fieldId: 'uuid',
            fieldName: '表单字段名称',
            documentMakerId: 'userId or roleId',
            branchVariable: 'id',
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
                        this.setColor('#f3546a');
                        break;
                    case "green":
                        this.setColor('#b9dd69');
                        break;
                    case "blue":
                        this.setColor('#00A8F0');
                        break;
                    case "AddBranch":
                        var rightLocator = new draw2d.layout.locator.OutputPortLocator();
                        var p = this.createPort("output",rightLocator);
                        p.setBackgroundColor('#00A8F0');
                        p.setMaxFanOut(1);
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
                "delete": {name: "Delete", icon: "delete"},
                "AddBranch": {name: "AddBranch", icon: "copy"}
            }
        });
    }

});










