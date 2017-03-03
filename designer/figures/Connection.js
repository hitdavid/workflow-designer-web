/**
 * Created by David on 2017/2/25.
 */

com.chanjet.gzq.aflow.ConnectionTEXT = draw2d.shape.basic.Text.extend({
    NAME: "ConnectionTEXT",

    init: function(text){
        this._super();
        this.setText(text);
        this.setFontFamily("微软雅黑");
        this.setStroke(0);
        this.setWidth(100);

        // this.installEditor(new draw2d.ui.LabelInplaceEditor({
        //     onCommit: $.proxy(function(value){
        //         this.getParent().userData.name = value;
        //     },this),
        //     onCancel: function(){
        //     }
        // }));
    }
});

com.chanjet.gzq.aflow.Connection = draw2d.Connection.extend({

    NAME: "Connection",

    init: function(){
        this._super();

        this.setStroke(2);

        var targetDecorator = new draw2d.decoration.connection.ArrowDecorator(12,12);
        targetDecorator.setBackgroundColor("#000000");
        this.setTargetDecorator(targetDecorator);

        var ConnectionTEXT = new com.chanjet.gzq.aflow.ConnectionTEXT("同意");
        var ConnectionTEXTLocation = new draw2d.layout.locator.ParallelMidpointLocator();
        this.add(ConnectionTEXT, ConnectionTEXTLocation, 1);


        // this.setRouter(new draw2d.layout.connection.DirectRouter());
        // this.setRouter(new draw2d.layout.connection.MuteableManhattanConnectionRouter());
        this.setRouter(new draw2d.layout.connection.SplineConnectionRouter());

        this.userData = {
            name: "连接线",
            id: this.id,
            type: "Connection",
            from: null,
            to: null,

        };

        this.installEditPolicy(new draw2d.policy.line.VertexSelectionFeedbackPolicy());
    },

    showExpression: function() {

        if(this.userData['expression'] != '') {
            this.setText(this.userData['expression']);
        }
        else {
            this.setText('设置条件');
        }

    },

    setText: function (text) {
        this.children.each( function (i, c) {
            if(c.figure.cssClass == 'ConnectionTEXT') {
                c.figure.setText(text);
            }
        })
    },

    onRightMouseDown: function (figure, x, y, shiftKey, ctrlKey) {
        //super.onRightMouseDown(figure, x, y, shiftKey, ctrlKey);
        this.onContextMenu(x, y);
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

    // setStartPoint: function (x, y) {
    //     this._super.setStartPoint(x, y);
    //     var bb = this.getBoundingBox();
    //     this.setWidth(bb.getWidth());
    // },
    //
    // setEndPoint: function (x, y) {
    //     this._super.setEndPoint(x, y);
    //     var bb = this.getBoundingBox();
    //     this.setWidth(bb.getWidth());
    // },

});