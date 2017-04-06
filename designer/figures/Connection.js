/**
 * Created by David on 2017/2/25.
 */

draw2d = draw2d.default;

ConnectionTEXT = draw2d.shape.basic.Text.extend({
    NAME: "ConnectionTEXT",

    init: function(text){
        this._super();
        this.setText(text);
        this.setFontFamily("微软雅黑");
        this.setStroke(0);
        // this.setWidth(100);
    }
});

Connection = draw2d.Connection.extend({

    NAME: "Connection",

    init: function(){
        this._super();

        this.setStroke(2);

        var targetDecorator = new draw2d.decoration.connection.ArrowDecorator(12,12);
        targetDecorator.setBackgroundColor("#000000");
        this.setTargetDecorator(targetDecorator);

        var ConnectionTEXT = new ConnectionTEXT("同意");
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

    onDrag: function (dx, dy, dx2, dy2) {
        this._super(dx, dy, dx2, dy2);
    },

    onDragLeave: function (draggedFigure) {
   	    this.setGlow(false);
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
                    case "insertUser":
                        app.canvas.insertTask(this, 'UserTask');
                    case "insertRole":
                        app.canvas.insertTask(this, 'RoleTask');
                    default:
                        break;
                }

            },this),
            x:x,
            y:y,
            items:
                {
                    "delete": {name: "删除", icon: ""},
                    "insertUser": {name: "插入固定人员", icon: ""},
                    "insertRole": {name: "插入上级主管", icon: ""},
                }
        });
    },

    toProcessElement: function () {
        var xml = '<sequenceFlow id="BPMN_'+this.getId()+'" name="'+this.getUserData().name+'" sourceRef="BPMN_'+this.getUserData().from+'" targetRef="BPMN_'+this.getUserData().to+'">';
        if(this.getSource().parent.cssClass == 'BranchTask') {
            xml += '<conditionExpression xsi:type="tFormalExpression">'+
                   '<![CDATA[${'+this.getSource().getParent().getUserData().templateId+'; '+this.getSource().getParent().getUserData().fieldId+'; '+this.userData['expression']+'}]]>'+
                   '</conditionExpression>';
        }
        xml += '</sequenceFlow>';

        return xml;
    },

    toDiagramElement: function () {
        return  '<bpmndi:BPMNShape bpmnElement="BPMN_'+this.getId()+'" id="BPMN_'+this.getId()+'">' +
                '<bpmndi:BPMNLabel>' +
                '<omgdc:Bounds height="'+this.getHeight()+'" width="'+this.getWidth()+'" x="'+this.getBoundingBox().getTopLeft().getX()+'" y="'+this.getBoundingBox().getTopLeft().getY()+'"></omgdc:Bounds>' +
                '</bpmndi:BPMNLabel>' +
                '</bpmndi:BPMNShape>';
    },
});

module.exports = Connection;