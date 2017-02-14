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
            "x": 36,
            "y": 130,
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
            "x": 719,
            "y": 116,
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
            "x": 99,
            "y": 113,
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
            "x": 233,
            "y": 113,
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
            "radius": 10
        },
        {
            "type": "com.chanjet.gzq.aflowUserTask",
            "id": "cbd87a51-f284-8c17-d154-86166490aef2",
            "x": 451,
            "y": 33,
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
            "x": 451,
            "y": 190,
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
            "type": "com.chanjet.gzq.aflowUserTask",
            "id": "96915e45-b4d5-31e6-1279-cfb25ebc6e4d",
            "x": 531,
            "y": 322,
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
            "id": "19e804cc-c854-e723-6b4d-7e038d1740af",
            "x": 407,
            "y": 322,
            "width": 96,
            "height": 64,
            "alpha": 1,
            "userData": {
                "name": "固定人员",
                "id": 3
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
            "id": "d7a2da79-d3bb-17b5-b44f-cb4c81eb368f",
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
            "id": "0891ef93-17ca-5159-22aa-cab1106bf6e0",
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
            "id": "2a93835d-4e86-b396-e46f-e87525f804ae",
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
            "id": "189f2a12-1afa-febd-5577-a0ac692636fd",
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
            "id": "d8fcf029-4731-a2fc-a819-176eb2ea87eb",
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
            "id": "ca9203bb-ee8d-0062-3b93-f8aa7b545a03",
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
            "id": "d4d7ccda-4574-493c-1f79-9bbcfef395b3",
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
                "port": "output2"
            },
            "target": {
                "node": "19e804cc-c854-e723-6b4d-7e038d1740af",
                "port": "input0"
            }
        },
        {
            "type": "draw2d.Connection",
            "id": "5db48c96-cb67-aeaa-51a4-477f062b1f03",
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
                "node": "96915e45-b4d5-31e6-1279-cfb25ebc6e4d",
                "port": "output0"
            },
            "target": {
                "node": "4d1a79e0-7411-5c45-94dc-6c41f72537e0",
                "port": "input0"
            }
        },
        {
            "type": "draw2d.Connection",
            "id": "bb01d517-278b-8c4c-ecdd-ab6026f08949",
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
                "node": "19e804cc-c854-e723-6b4d-7e038d1740af",
                "port": "output0"
            },
            "target": {
                "node": "96915e45-b4d5-31e6-1279-cfb25ebc6e4d",
                "port": "input0"
            }
        }
    ];

    response.end(JSON.stringify(data));


}).listen(8888);