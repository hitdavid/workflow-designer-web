/**
 * Created by David on 2017/3/28.
 */

var app;

$(window).load(function () {
    //-- 2. activiti-designer的连接器(全局)

    app = new com.chanjet.gzq.aflow.Application();
    load();

    app.canvas.getCommandStack().addEventListener(function (e) {
        if (e.isPostChangeEvent()) {
            // updatePreview(app.canvas);
            displayJSON(app.canvas);
            displayXML(app.canvas);
        }
    });

    app.canvas.on("select, click", function (e, i) {
        console.log("select, click" + i + e);

        if (e.selection.primary == null) {
            $('#propGrid').jqPropertyGrid(app.canvas.userData, options);
            return;
        }

        if(e.selection.primary.userData == null) {
            e.selection.primary.userData = {};
        }
        $('#propGrid').jqPropertyGrid(e.selection.primary.userData, options);
    });

    $('#propGrid').on("change blur", function (e) {

        var id = afterDigit(e.target.id);

        if( app.canvas.selection.primary != null) {
            //tasks
            if( app.canvas.selection.primary.userData != null) {
                app.canvas.selection.primary.userData[id] = e.target.value;

                if (app.canvas.selection.primary.userData['expression'] != null) {
                    app.canvas.selection.primary.showExpression();
                }

                if (app.canvas.selection.primary.userData['avator'] != null) {
                    app.canvas.selection.primary.setImage(e.target.value);
                }
            }
        }
        else {
            // canvas
            app.canvas.userData[id] = e.target.value;
        }
        displayJSON(app.canvas);
        displayXML(app.canvas);
    });

});

function afterDigit(str) {
    for (var i = str.length - 1; i >= 0; i--) {
        if (isDigit(str[i])) {
            return str.substring(i + 1, str.length);
        }
    }
    return str;
}

function isDigit(s)
{
    var patrn = /^[0-9]{1,20}$/;
    if (!patrn.exec(s))
        return false;
    return true;
}

function updatePreview(canvas) {

    var xCoords = [];
    var yCoords = [];
    canvas.getFigures().each(function (i, f) {
        var b = f.getBoundingBox();
        xCoords.push(b.x, b.x + b.w);
        yCoords.push(b.y, b.y + b.h);
    });

    var minX = Math.min.apply(Math, xCoords);
    var minY = Math.min.apply(Math, yCoords);
    var width = Math.max.apply(Math, xCoords) - minX;
    var height = Math.max.apply(Math, yCoords) - minY;

    var writer = new draw2d.io.png.Writer();

    writer.marshal(canvas, function (png) {
        $("#preview").attr("src", png);
    }, new draw2d.geo.Rectangle(minX, minY, width, height));

}
function displayJSON(canvas) {

    var writer = new draw2d.io.json.Writer();
    writer.marshal(canvas, function (json) {
        var jsonText = JSON.stringify(json, null, 2);
        $("#jsonOutput").text(jsonText);
    });
}

function displayXML(canvas) {
    //
    var writer = new draw2d.io.xml.Writer();
    writer.marshal(canvas, function (obj, xml) {
        $("#xmlOutput").text(xml);
    });
}

function save() {
    var jsonArgs;
    var writer = new draw2d.io.json.Writer();
    writer.marshal(app.canvas, function (json) {
        jsonArgs = JSON.stringify(json, null, 2);
    });
    $.post('http://127.0.0.1:8080/aflow/definition', {
        orgId:'123',
        userId:'456',
        name: app.canvas.userData['name'],
        json: jsonArgs ,
    }, function (result) {
        console.log(result);
    })
}

function load() {

    var json;
    $.getJSON("http://localhost:8888/", function (result) {
        json = result;
    }).fail(function () {

        var shape = new com.chanjet.gzq.aflow.Start();
        var command = new draw2d.command.CommandAdd(app.canvas, shape, 100, 300);
        app.canvas.getCommandStack().execute(command);// 放入堆栈，撤销或者重做
        json = null;
        var writer = new draw2d.io.json.Writer();
        writer.marshal(app.canvas, function (json) {
            json = JSON.stringify(json, null, 2);
        });

    }).always(function () {

        if (json != null) {
            app.loadFigure(json);
        }
        // displayJSON(app.canvas);
        updatePreview(app.canvas);
        displayXML(app.canvas);
    });
}

function showWizard() {
    myWizard.style.display="block";
}

function addCase() {
    $("#title").after("<input type='text' placeholder='表单字段' business-meta='case'><br />");
}

