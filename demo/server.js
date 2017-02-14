/**
 * Created by David on 17/2/14.
 */

/*

USAGE:  shell# node server.js

 */

var http = require('http');

http.createServer(function (request, response) {

    response.writeHead(200,
        {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
    });

    var data = [
        {
            "type": "com.chanjet.gzq.aflowStart",
            "id": "93425d56-8d7b-bc6d-fe10-80e1a7beb973",
            "x": 135,
            "y": 158,
            "width": 30,
            "height": 30,
            "alpha": 1,
            "userData": {},
            "cssClass": "com_chanjet_gzq_aflowStart",
            "ports": [
                {
                    "name": "output0",
                    "port": "draw2d.OutputPort",
                    "locator": "draw2d.layout.locator.OutputPortLocator"
                }
            ],
            "bgColor": "#FFFFFF",
            "color": "#1B1B1B",
            "stroke": 1
        },
        {
            "type": "com.chanjet.gzq.aflowEnd",
            "id": "4d1a79e0-7411-5c45-94dc-6c41f72537e0",
            "x": 817,
            "y": 139,
            "width": 28,
            "height": 28.000000000000004,
            "alpha": 1,
            "userData": {},
            "cssClass": "com_chanjet_gzq_aflowEnd",
            "ports": [
                {
                    "name": "input0",
                    "port": "draw2d.InputPort",
                    "locator": "draw2d.layout.locator.InputPortLocator"
                }
            ],
            "bgColor": "#FFFFFF",
            "color": "#1B1B1B",
            "stroke": 3
        },
        {
            "type": "com.chanjet.gzq.aflowUserTask",
            "id": "93802465-1122-fac0-9716-98c8fe9486f1",
            "x": 266,
            "y": 124,
            "width": 96,
            "height": 64,
            "alpha": 1,
            "userData": {
                "name": "人工任务"
            },
            "cssClass": "com_chanjet_gzq_aflowUserTask",
            "ports": [
                {
                    "name": "input0",
                    "port": "draw2d.InputPort",
                    "locator": "draw2d.layout.locator.InputPortLocator"
                },
                {
                    "name": "output0",
                    "port": "draw2d.OutputPort",
                    "locator": "draw2d.layout.locator.OutputPortLocator"
                }
            ],
            "bgColor": "#FFFFCC",
            "color": "#1B1B1B",
            "stroke": 1,
            "radius": 5
        },
        {
            "type": "com.chanjet.gzq.aflowBranchTask",
            "id": "4f95b94b-46b1-64b6-fa4f-27ecf0141775",
            "x": 442,
            "y": 124,
            "width": 96,
            "height": 64,
            "alpha": 1,
            "userData": {},
            "cssClass": "com_chanjet_gzq_aflowBranchTask",
            "ports": [
                {
                    "name": "input0",
                    "port": "draw2d.InputPort",
                    "locator": "draw2d.layout.locator.InputPortLocator"
                },
                {
                    "name": "output0",
                    "port": "draw2d.OutputPort",
                    "locator": "draw2d.layout.locator.OutputPortLocator"
                },
                {
                    "name": "output1",
                    "port": "draw2d.OutputPort",
                    "locator": "draw2d.layout.locator.OutputPortLocator"
                }
            ],
            "bgColor": "#FFFFCC",
            "color": "#1B1B1B",
            "stroke": 1,
            "radius": 10
        },
        {
            "type": "com.chanjet.gzq.aflowUserTask",
            "id": "cbd87a51-f284-8c17-d154-86166490aef2",
            "x": 638,
            "y": 44,
            "width": 96,
            "height": 64,
            "alpha": 1,
            "userData": {
                "name": "人工任务"
            },
            "cssClass": "com_chanjet_gzq_aflowUserTask",
            "ports": [
                {
                    "name": "input0",
                    "port": "draw2d.InputPort",
                    "locator": "draw2d.layout.locator.InputPortLocator"
                },
                {
                    "name": "output0",
                    "port": "draw2d.OutputPort",
                    "locator": "draw2d.layout.locator.OutputPortLocator"
                }
            ],
            "bgColor": "#FFFFCC",
            "color": "#1B1B1B",
            "stroke": 1,
            "radius": 5
        },
        {
            "type": "com.chanjet.gzq.aflowUserTask",
            "id": "54b31e4d-0ff3-48ed-13e6-6a8b60f44a22",
            "x": 626,
            "y": 201,
            "width": 96,
            "height": 64,
            "alpha": 1,
            "userData": {
                "name": "人工任务"
            },
            "cssClass": "com_chanjet_gzq_aflowUserTask",
            "ports": [
                {
                    "name": "input0",
                    "port": "draw2d.InputPort",
                    "locator": "draw2d.layout.locator.InputPortLocator"
                },
                {
                    "name": "output0",
                    "port": "draw2d.OutputPort",
                    "locator": "draw2d.layout.locator.OutputPortLocator"
                }
            ],
            "bgColor": "#FFFFCC",
            "color": "#1B1B1B",
            "stroke": 1,
            "radius": 5
        },
        {
            "type": "draw2d.Connection",
            "id": "0dd98aca-fe63-e834-234e-19f417d06257",
            "alpha": 1,
            "userData": {},
            "cssClass": "draw2d_Connection",
            "stroke": 1,
            "color": "#1B1B1B",
            "outlineStroke": 0,
            "outlineColor": "none",
            "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
            "router": "draw2d.layout.connection.SplineConnectionRouter",
            "radius": 2,
            "source": {
                "node": "93425d56-8d7b-bc6d-fe10-80e1a7beb973",
                "port": "output0"
            },
            "target": {
                "node": "93802465-1122-fac0-9716-98c8fe9486f1",
                "port": "input0"
            }
        },
        {
            "type": "draw2d.Connection",
            "id": "ee21146f-d769-24c4-4714-4b4b2b4cbc9c",
            "alpha": 1,
            "userData": {},
            "cssClass": "draw2d_Connection",
            "stroke": 1,
            "color": "#1B1B1B",
            "outlineStroke": 0,
            "outlineColor": "none",
            "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
            "router": "draw2d.layout.connection.SplineConnectionRouter",
            "radius": 2,
            "source": {
                "node": "93802465-1122-fac0-9716-98c8fe9486f1",
                "port": "output0"
            },
            "target": {
                "node": "4f95b94b-46b1-64b6-fa4f-27ecf0141775",
                "port": "input0"
            }
        },
        {
            "type": "draw2d.Connection",
            "id": "f780652e-f1a0-8f4b-859e-a56baf2d57ba",
            "alpha": 1,
            "userData": {},
            "cssClass": "draw2d_Connection",
            "stroke": 1,
            "color": "#1B1B1B",
            "outlineStroke": 0,
            "outlineColor": "none",
            "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
            "router": "draw2d.layout.connection.SplineConnectionRouter",
            "radius": 2,
            "source": {
                "node": "4f95b94b-46b1-64b6-fa4f-27ecf0141775",
                "port": "output0"
            },
            "target": {
                "node": "cbd87a51-f284-8c17-d154-86166490aef2",
                "port": "input0"
            }
        },
        {
            "type": "draw2d.Connection",
            "id": "fccda3d7-394c-1c52-5dcb-66603da6f7bb",
            "alpha": 1,
            "userData": {},
            "cssClass": "draw2d_Connection",
            "stroke": 1,
            "color": "#1B1B1B",
            "outlineStroke": 0,
            "outlineColor": "none",
            "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
            "router": "draw2d.layout.connection.SplineConnectionRouter",
            "radius": 2,
            "source": {
                "node": "4f95b94b-46b1-64b6-fa4f-27ecf0141775",
                "port": "output1"
            },
            "target": {
                "node": "54b31e4d-0ff3-48ed-13e6-6a8b60f44a22",
                "port": "input0"
            }
        },
        {
            "type": "draw2d.Connection",
            "id": "6ff28547-5505-80c6-a337-bd0e6b4ec88f",
            "alpha": 1,
            "userData": {},
            "cssClass": "draw2d_Connection",
            "stroke": 1,
            "color": "#1B1B1B",
            "outlineStroke": 0,
            "outlineColor": "none",
            "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
            "router": "draw2d.layout.connection.SplineConnectionRouter",
            "radius": 2,
            "source": {
                "node": "cbd87a51-f284-8c17-d154-86166490aef2",
                "port": "output0"
            },
            "target": {
                "node": "4d1a79e0-7411-5c45-94dc-6c41f72537e0",
                "port": "input0"
            }
        },
        {
            "type": "draw2d.Connection",
            "id": "31bd628a-3785-da70-ff60-55525e7a15bd",
            "alpha": 1,
            "userData": {},
            "cssClass": "draw2d_Connection",
            "stroke": 1,
            "color": "#1B1B1B",
            "outlineStroke": 0,
            "outlineColor": "none",
            "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
            "router": "draw2d.layout.connection.SplineConnectionRouter",
            "radius": 2,
            "source": {
                "node": "54b31e4d-0ff3-48ed-13e6-6a8b60f44a22",
                "port": "output0"
            },
            "target": {
                "node": "4d1a79e0-7411-5c45-94dc-6c41f72537e0",
                "port": "input0"
            }
        }
    ];

    response.end(JSON.stringify(data));


}).listen(8888);