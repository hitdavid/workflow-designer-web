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
            "type": "com.chanjet.gzq.aflowUserTask",
            "id": "c99891ff-6631-e92e-527a-f3872df86657",
            "x": 598,
            "y": 147,
            "width": 96,
            "height": 64,
            "alpha": 1,
            "userData": {
                "name": "固定人员",
                "id": "c99891ff-6631-e92e-527a-f3872df86657",
                "type": "UserTask",
                "color": "1B1B1B",
                "label": "固定人员"
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
            "type": "com.chanjet.gzq.aflowStart",
            "id": "c451c7dc-2079-e32a-16e7-59329c6740e9",
            "x": 31,
            "y": 116,
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
            "id": "7cc30adb-18a0-e0b4-57e1-2c6844d54bde",
            "x": 873,
            "y": 151,
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
            "type": "com.chanjet.gzq.aflowBranchTask",
            "id": "80f0e15a-08bb-36ae-17ae-49096b9cc49c",
            "x": 274,
            "y": 292,
            "width": 96,
            "height": 96,
            "alpha": 1,
            "userData": {
                "name": "条件分支",
                "id": "80f0e15a-08bb-36ae-17ae-49096b9cc49c",
                "type": "BranchTask",
                "color": "1B1B1B",
                "label": "条件",
                "outputPort": {
                    "case1": "outputPort0",
                    "case2": "outputPort1"
                }
            },
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
                },
                {
                    "name": "output2",
                    "port": "draw2d.OutputPort",
                    "locator": "draw2d.layout.locator.OutputPortLocator"
                }
            ],
            "bgColor": "#FFFFCC",
            "color": "#1B1B1B",
            "stroke": 1,
            "radius": 2,
            "vertices": [
                {
                    "x": 274,
                    "y": 340
                },
                {
                    "x": 370,
                    "y": 292
                },
                {
                    "x": 370,
                    "y": 388
                }
            ]
        },
        {
            "type": "com.chanjet.gzq.aflowUserTask",
            "id": "d54cc33a-4670-465f-6d26-63d22b3f363d",
            "x": 378,
            "y": 102,
            "width": 96,
            "height": 64,
            "alpha": 1,
            "userData": {
                "name": "固定人员",
                "id": "d54cc33a-4670-465f-6d26-63d22b3f363d",
                "type": "UserTask",
                "color": "1B1B1B",
                "label": "固定人员"
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
            "type": "com.chanjet.gzq.aflowRoleTask",
            "id": "be97b5ac-d691-8f86-0174-de06afe90ac1",
            "x": 663,
            "y": 379,
            "width": 96,
            "height": 64,
            "alpha": 1,
            "userData": {
                "name": "上级主管"
            },
            "cssClass": "com_chanjet_gzq_aflowRoleTask",
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
            "id": "3a7767c6-e833-266a-80fa-9b4c1a8aaf66",
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
                "node": "c451c7dc-2079-e32a-16e7-59329c6740e9",
                "port": "output0"
            },
            "target": {
                "node": "80f0e15a-08bb-36ae-17ae-49096b9cc49c",
                "port": "input0"
            }
        },
        {
            "type": "draw2d.Connection",
            "id": "84a04374-35c0-51f6-df25-e4005c2eff27",
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
                "node": "d54cc33a-4670-465f-6d26-63d22b3f363d",
                "port": "output0"
            },
            "target": {
                "node": "c99891ff-6631-e92e-527a-f3872df86657",
                "port": "input0"
            }
        },
        {
            "type": "draw2d.Connection",
            "id": "ea2c8ef7-3796-ef83-e878-5e7cffba1a5f",
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
                "node": "c99891ff-6631-e92e-527a-f3872df86657",
                "port": "output0"
            },
            "target": {
                "node": "7cc30adb-18a0-e0b4-57e1-2c6844d54bde",
                "port": "input0"
            }
        },
        {
            "type": "draw2d.Connection",
            "id": "56fc42de-86d2-6d01-9614-5da5de55c31b",
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
                "node": "80f0e15a-08bb-36ae-17ae-49096b9cc49c",
                "port": "output1"
            },
            "target": {
                "node": "c99891ff-6631-e92e-527a-f3872df86657",
                "port": "input0"
            }
        },
        {
            "type": "draw2d.Connection",
            "id": "8ee31a3d-ae21-d208-cb8b-2929300fd69e",
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
                "node": "80f0e15a-08bb-36ae-17ae-49096b9cc49c",
                "port": "output0"
            },
            "target": {
                "node": "d54cc33a-4670-465f-6d26-63d22b3f363d",
                "port": "input0"
            }
        },
        {
            "type": "draw2d.Connection",
            "id": "c82efec6-dc00-49b8-5786-d2b2a6b837fd",
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
                "node": "80f0e15a-08bb-36ae-17ae-49096b9cc49c",
                "port": "output2"
            },
            "target": {
                "node": "be97b5ac-d691-8f86-0174-de06afe90ac1",
                "port": "input0"
            }
        },
        {
            "type": "draw2d.Connection",
            "id": "cba2bb65-f31d-f097-604d-17d970bbfa1b",
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
                "node": "be97b5ac-d691-8f86-0174-de06afe90ac1",
                "port": "output0"
            },
            "target": {
                "node": "7cc30adb-18a0-e0b4-57e1-2c6844d54bde",
                "port": "input0"
            }
        }
    ];

    response.end(JSON.stringify(data));


}).listen(8888);