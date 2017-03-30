com.chanjet.gzq.aflow.BranchTaskText = draw2d.shape.basic.Text.extend({
    NAME: "BranchTaskText",

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

com.chanjet.gzq.aflow.BranchTask = draw2d.shape.basic.Triangle.extend({
    NAME: "BranchTask",

    init: function(){
        this._super();

        this.setStroke(1);
        this.setDimension(64, 96);
        this.setBackgroundColor(new draw2d.util.Color("#ffffff"));
        this.setRadius(2);

        this.setResizeable(false);

        var BranchTaskText = new com.chanjet.gzq.aflow.BranchTaskText("条件");
        var BranchTaskTextLocation = new draw2d.layout.locator.CenterLocator();
        this.add(BranchTaskText, BranchTaskTextLocation,1);

        var leftLocator = new draw2d.layout.locator.InputPortLocator();
        this.createPort("input", leftLocator);

        var rightLocator0 = new draw2d.layout.locator.OutputPortLocator();
        var outputPort0 = this.createPort("output", rightLocator0);
        outputPort0.setBackgroundColor('#00FF00');
        outputPort0.setMaxFanOut(1);

        var rightLocator1 = new draw2d.layout.locator.OutputPortLocator();
        var outputPort1 = this.createPort("output", rightLocator1);
        outputPort1.setBackgroundColor('#00FF00');
        outputPort1.setMaxFanOut(1);


        this.userData = {
            name: "条件分支",
            id: this.id,
            type: "BranchTask",
            label: BranchTaskText.getText(),

            templateId: 'uuid',
            templateName: '表单模版名称',
            fieldId: 'uuid',
            fieldName: '表单字段名称',
            // caseNumber: 2,
        };

    },

    onDoubleClick: function() {},

    addCase: function () {
        var rightLocator = new draw2d.layout.locator.OutputPortLocator();
        var p = this.createPort("output",rightLocator);
        p.setBackgroundColor('#00FF00');
        p.setMaxFanOut(1);
        // this.userData['caseNumber'] += 1;
    },

    delCase: function () {

        var outputPorts = this.getOutputPorts();
        outputPorts.each(function (i, p) {
            if (p.getConnections().data.length == 0) {
                p.parent.removePort(p);
                return false;
            }
        });
        // this.userData['caseNumber'] -= 1;
        this.repaint();
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
                    case "AddCase":
                        this.addCase();
                        break;
                    case "DelCase":
                        this.delCase();
                        break;
                    case "delete":
                        var cmd = new draw2d.command.CommandDelete(this);
                        this.getCanvas().getCommandStack().execute(cmd);
                        break;
                    default:
                        break;
                }

            },this),
            x:x,
            y:y,
            items:
            {
                "delete": {name: "Delete", icon: "delete"},
                "sep1":   "---------",
                "AddCase": {name: "AddCase", icon: "edit"},
                "DelCase": {name: "DelCase", icon: "delete"},
            }
        });
    },

    toProcessElement: function () {
        return '<exclusiveGateway id="BPMN_'+this.getId()+'" name="'+this.getUserData().name+'"></exclusiveGateway>';
    },

    toDiagramElement: function () {
        return '<bpmndi:BPMNShape bpmnElement="BPMN_'+this.getId()+'" id="BPMN_'+this.getId()+'">' +
            '<omgdc:Bounds height="'+this.getHeight()+'" width="'+this.getWidth()+'" x="'+this.getBoundingBox().getTopLeft().getX()+'" y="'+this.getBoundingBox().getTopLeft().getY()+'"></omgdc:Bounds>' +
            '</bpmndi:BPMNShape>';
    },

});










