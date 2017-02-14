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
            "userData": {
                "c35c8634-aae2-9406-8f62-fd46848da8da": [
                    "f98679f6-09ef-476b-294c-cddbc03988d4"
                ]
            },
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
            "userData": {
                "8f1309a5-cfe2-633a-11dc-392f53dfe56e": [
                    "5f1057ee-f327-b7a8-445b-8dfa96711d3d",
                    "eba353e0-0168-14a0-68a9-80ce6bea7a8b",
                    "7fa5d3cf-31db-6d7f-b25e-a332083242fe"
                ]
            },
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
                "name": "人工任务",
                "cb5f8dd5-85c4-d3d7-1ad7-b237f17b0dbf": [
                    "f98679f6-09ef-476b-294c-cddbc03988d4"
                ],
                "c6a8fc29-29b3-824d-a6b5-e73f51283f25": [
                    "d5730861-382e-08dd-988e-235cbb5acebd"
                ]
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
            "userData": {
                "0f6218c1-42cd-3103-5370-b204517d92d7": [
                    "d5730861-382e-08dd-988e-235cbb5acebd"
                ],
                "666dd458-dd42-3a26-880a-13730493b5ec": [
                    "11744897-4b4b-d6a6-0bac-c08237e53698"
                ],
                "ecf93dc9-6dd0-ef3c-cd1a-428693d63e66": [
                    "50a9318f-4519-b905-6654-7bd17c8e4459",
                    "7fa5d3cf-31db-6d7f-b25e-a332083242fe"
                ]
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
                "name": "人工任务",
                "0e5f801f-e910-fc45-00fc-7b9377f226ae": [
                    "11744897-4b4b-d6a6-0bac-c08237e53698"
                ],
                "41af4972-1fc0-f660-992c-8cb07432bc93": [
                    "5f1057ee-f327-b7a8-445b-8dfa96711d3d"
                ]
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
                "name": "人工任务",
                "35916a39-ed90-4dff-8d71-2d0eca656c06": [
                    "50a9318f-4519-b905-6654-7bd17c8e4459"
                ],
                "830fe9f7-afd9-756a-7a69-0c87fd0fd231": [
                    "eba353e0-0168-14a0-68a9-80ce6bea7a8b"
                ]
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
            "id": "f98679f6-09ef-476b-294c-cddbc03988d4",
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
            "id": "d5730861-382e-08dd-988e-235cbb5acebd",
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
            "id": "11744897-4b4b-d6a6-0bac-c08237e53698",
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
            "id": "50a9318f-4519-b905-6654-7bd17c8e4459",
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
            "id": "5f1057ee-f327-b7a8-445b-8dfa96711d3d",
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
            "id": "eba353e0-0168-14a0-68a9-80ce6bea7a8b",
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
        },
        {
            "type": "draw2d.Connection",
            "id": "7fa5d3cf-31db-6d7f-b25e-a332083242fe",
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
                "node": "4d1a79e0-7411-5c45-94dc-6c41f72537e0",
                "port": "input0"
            }
        }
    ];

    response.end(JSON.stringify(data));


}).listen(8888);