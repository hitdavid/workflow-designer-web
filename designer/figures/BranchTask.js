/**
 * Created by David on 17/2/11.
 */

org.ranji.activiti.BranchTaskICON = draw2d.shape.icon.Check.extend({
    NAME: "BranchTaskICON",

    init: function(){
        this._super();
        this.setDimension(16,16);
    }
});

org.ranji.activiti.BranchTaskText = draw2d.shape.basic.Text.extend({
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

org.ranji.activiti.BranchTask = draw2d.shape.basic.Rectangle.extend({
    NAME: "org.ranji.activiti.BranchTask",
    init: function(){
        this._super();

        this.setStroke(1);
        this.setDimension(96,64);
        this.setBackgroundColor(new draw2d.util.Color("#ffffcc"));
        this.setRadius(10);

        var BranchTaskICON = new org.ranji.activiti.BranchTaskICON();
        var BranchTaskText = new org.ranji.activiti.BranchTaskText("条件分支");

        var BranchTaskICONLocation = new draw2d.layout.locator.XYRelPortLocator(5,5);
        var BranchTaskTextLocation = new draw2d.layout.locator.CenterLocator();


        this.add(BranchTaskICON, BranchTaskICONLocation,0);
        this.add(BranchTaskText, BranchTaskTextLocation,1);

        var leftLocator = new draw2d.layout.locator.InputPortLocator();
        this.createPort("input",leftLocator);


        var rightLocator = new draw2d.layout.locator.OutputPortLocator();
        this.createPort("output",rightLocator);
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
                        this.createPort("output",rightLocator);
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
                "AddBranch": {name: "AddBranch", icon: ""}
            }
        });
    }

});










