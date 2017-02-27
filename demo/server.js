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

    var data = {
        "canvas": [
            {
                "type": "com.chanjet.gzq.aflow.Start",
                "id": "0e5e2253-404b-77ce-5e6e-50a6e57af0c2",
                "x": 44,
                "y": 362,
                "width": 30,
                "height": 30,
                "alpha": 1,
                "userData": {
                    "name": "流程开始",
                    "id": "0e5e2253-404b-77ce-5e6e-50a6e57af0c2",
                    "type": "Start",
                    "label": "流程开始"
                },
                "cssClass": "com_chanjet_gzq_aflow_Start",
                "ports": [
                    {
                        "name": "output0",
                        "port": "draw2d.OutputPort",
                        "locator": "draw2d.layout.locator.OutputPortLocator"
                    }
                ],
                "bgColor": "#99FF99",
                "color": "#1B1B1B",
                "stroke": 1
            },
            {
                "type": "com.chanjet.gzq.aflow.End",
                "id": "34be98a9-195e-2c04-d31d-6555a196c7b8",
                "x": 1185,
                "y": 346,
                "width": 30,
                "height": 30,
                "alpha": 1,
                "userData": {
                    "name": "流程结束",
                    "id": "34be98a9-195e-2c04-d31d-6555a196c7b8",
                    "type": "End",
                    "label": "流程结束"
                },
                "cssClass": "com_chanjet_gzq_aflow_End",
                "ports": [
                    {
                        "name": "input0",
                        "port": "draw2d.InputPort",
                        "locator": "draw2d.layout.locator.InputPortLocator"
                    }
                ],
                "bgColor": "#FF9999",
                "color": "#1B1B1B",
                "stroke": 1
            },
            {
                "type": "com.chanjet.gzq.aflow.RoleTask",
                "id": "06e3d9d2-f801-9bac-9505-26af445b525e",
                "x": 137,
                "y": 345,
                "width": 96,
                "height": 64,
                "alpha": 1,
                "userData": {
                    "name": "管理角色",
                    "id": "06e3d9d2-f801-9bac-9505-26af445b525e",
                    "type": "RoleTask",
                    "label": "管理角色",
                    "roleIds": "rid"
                },
                "cssClass": "com_chanjet_gzq_aflow_RoleTask",
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
                "type": "com.chanjet.gzq.aflow.BranchTask",
                "id": "6e2b9fcc-d312-e7c9-789d-aae7fa196124",
                "x": 280,
                "y": 329,
                "width": 64,
                "height": 96,
                "alpha": 1,
                "userData": {
                    "name": "条件分支",
                    "id": "6e2b9fcc-d312-e7c9-789d-aae7fa196124",
                    "type": "BranchTask",
                    "label": "条件",
                    "templateId": "uuid",
                    "templateName": "报销单",
                    "fieldId": "uuid",
                    "fieldName": "科目"
                },
                "cssClass": "com_chanjet_gzq_aflow_BranchTask",
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
                "radius": 2,
                "vertices": [
                    {
                        "x": 280,
                        "y": 377
                    },
                    {
                        "x": 344,
                        "y": 329
                    },
                    {
                        "x": 344,
                        "y": 425
                    }
                ]
            },
            {
                "type": "com.chanjet.gzq.aflow.UserTask",
                "id": "da514a7b-ff1f-15bb-1ed3-9fe5ab770298",
                "x": 996,
                "y": 329,
                "width": 96,
                "height": 64,
                "alpha": 1,
                "userData": {
                    "name": "固定人员",
                    "id": "da514a7b-ff1f-15bb-1ed3-9fe5ab770298",
                    "type": "UserTask",
                    "label": "固定人员",
                    "userIds": "uid,uid,uid"
                },
                "cssClass": "com_chanjet_gzq_aflow_UserTask",
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
                "type": "com.chanjet.gzq.aflow.BranchTask",
                "id": "a832e33a-9375-5493-794f-8cb46eaf2617",
                "x": 495,
                "y": 477,
                "width": 64,
                "height": 96,
                "alpha": 1,
                "userData": {
                    "name": "条件分支",
                    "id": "a832e33a-9375-5493-794f-8cb46eaf2617",
                    "type": "BranchTask",
                    "label": "条件",
                    "templateId": "uuid",
                    "templateName": "报销单",
                    "fieldId": "uuid",
                    "fieldName": "合计金额"
                },
                "cssClass": "com_chanjet_gzq_aflow_BranchTask",
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
                "radius": 2,
                "vertices": [
                    {
                        "x": 495,
                        "y": 525
                    },
                    {
                        "x": 559,
                        "y": 477
                    },
                    {
                        "x": 559,
                        "y": 573
                    }
                ]
            },
            {
                "type": "com.chanjet.gzq.aflow.RoleTask",
                "id": "563c111f-0c44-3af7-a3c3-1e0f145a2d40",
                "x": 728,
                "y": 412,
                "width": 96,
                "height": 64,
                "alpha": 1,
                "userData": {
                    "name": "管理角色",
                    "id": "563c111f-0c44-3af7-a3c3-1e0f145a2d40",
                    "type": "RoleTask",
                    "label": "管理角色",
                    "roleIds": "rid"
                },
                "cssClass": "com_chanjet_gzq_aflow_RoleTask",
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
                "type": "com.chanjet.gzq.aflow.CountersignTask",
                "id": "69221b85-31f1-4995-8865-c32157cb2582",
                "x": 777,
                "y": 560,
                "width": 64,
                "height": 64,
                "alpha": 1,
                "userData": {
                    "name": "会签",
                    "id": "69221b85-31f1-4995-8865-c32157cb2582",
                    "type": "CountersignTask",
                    "label": "会签",
                    "roleIds": "uid,uid,uid",
                    "userIds": ""
                },
                "cssClass": "com_chanjet_gzq_aflow_CountersignTask",
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
                "radius": 5,
                "vertices": [
                    {
                        "x": 809,
                        "y": 560
                    },
                    {
                        "x": 841,
                        "y": 592
                    },
                    {
                        "x": 809,
                        "y": 624
                    },
                    {
                        "x": 777,
                        "y": 592
                    }
                ]
            },
            {
                "type": "com.chanjet.gzq.aflow.Connection",
                "id": "386a4ccb-e60f-d42f-a1fc-6acedff1f5b5",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "386a4ccb-e60f-d42f-a1fc-6acedff1f5b5",
                    "type": "Connection",
                    "from": "0e5e2253-404b-77ce-5e6e-50a6e57af0c2",
                    "to": "06e3d9d2-f801-9bac-9505-26af445b525e"
                },
                "cssClass": "com_chanjet_gzq_aflow_Connection",
                "stroke": 2,
                "color": "#1B1B1B",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "0e5e2253-404b-77ce-5e6e-50a6e57af0c2",
                    "port": "output0"
                },
                "target": {
                    "node": "06e3d9d2-f801-9bac-9505-26af445b525e",
                    "port": "input0"
                }
            },
            {
                "type": "com.chanjet.gzq.aflow.Connection",
                "id": "203db889-d3aa-aa7d-d1b3-d0660fac59b4",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "203db889-d3aa-aa7d-d1b3-d0660fac59b4",
                    "type": "Connection",
                    "from": "06e3d9d2-f801-9bac-9505-26af445b525e",
                    "to": "6e2b9fcc-d312-e7c9-789d-aae7fa196124"
                },
                "cssClass": "com_chanjet_gzq_aflow_Connection",
                "stroke": 2,
                "color": "#1B1B1B",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "06e3d9d2-f801-9bac-9505-26af445b525e",
                    "port": "output0"
                },
                "target": {
                    "node": "6e2b9fcc-d312-e7c9-789d-aae7fa196124",
                    "port": "input0"
                }
            },
            {
                "type": "com.chanjet.gzq.aflow.Connection",
                "id": "fe22870b-4b2e-ff42-c1ce-f0f7b0665124",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "fe22870b-4b2e-ff42-c1ce-f0f7b0665124",
                    "type": "Connection",
                    "from": "6e2b9fcc-d312-e7c9-789d-aae7fa196124",
                    "to": "da514a7b-ff1f-15bb-1ed3-9fe5ab770298",
                    "operator": "5",
                    "expression": "内勤报销"
                },
                "cssClass": "com_chanjet_gzq_aflow_Connection",
                "stroke": 2,
                "color": "#0000FF",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "6e2b9fcc-d312-e7c9-789d-aae7fa196124",
                    "port": "output0"
                },
                "target": {
                    "node": "da514a7b-ff1f-15bb-1ed3-9fe5ab770298",
                    "port": "input0"
                }
            },
            {
                "type": "com.chanjet.gzq.aflow.Connection",
                "id": "1da50b60-faec-ef40-2d7b-0e55806398fd",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "1da50b60-faec-ef40-2d7b-0e55806398fd",
                    "type": "Connection",
                    "from": "6e2b9fcc-d312-e7c9-789d-aae7fa196124",
                    "to": "a832e33a-9375-5493-794f-8cb46eaf2617",
                    "operator": "5",
                    "expression": "外勤报销"
                },
                "cssClass": "com_chanjet_gzq_aflow_Connection",
                "stroke": 2,
                "color": "#0000FF",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "6e2b9fcc-d312-e7c9-789d-aae7fa196124",
                    "port": "output1"
                },
                "target": {
                    "node": "a832e33a-9375-5493-794f-8cb46eaf2617",
                    "port": "input0"
                }
            },
            {
                "type": "com.chanjet.gzq.aflow.Connection",
                "id": "a15c9055-2dff-a5b2-07f7-b44507a5650d",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "a15c9055-2dff-a5b2-07f7-b44507a5650d",
                    "type": "Connection",
                    "from": "a832e33a-9375-5493-794f-8cb46eaf2617",
                    "to": "563c111f-0c44-3af7-a3c3-1e0f145a2d40",
                    "operator": "3",
                    "expression": "5000"
                },
                "cssClass": "com_chanjet_gzq_aflow_Connection",
                "stroke": 2,
                "color": "#0000FF",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "a832e33a-9375-5493-794f-8cb46eaf2617",
                    "port": "output0"
                },
                "target": {
                    "node": "563c111f-0c44-3af7-a3c3-1e0f145a2d40",
                    "port": "input0"
                }
            },
            {
                "type": "com.chanjet.gzq.aflow.Connection",
                "id": "614e0d79-2827-213b-c1e9-e61fd352a054",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "614e0d79-2827-213b-c1e9-e61fd352a054",
                    "type": "Connection",
                    "from": "da514a7b-ff1f-15bb-1ed3-9fe5ab770298",
                    "to": "34be98a9-195e-2c04-d31d-6555a196c7b8"
                },
                "cssClass": "com_chanjet_gzq_aflow_Connection",
                "stroke": 2,
                "color": "#1B1B1B",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "da514a7b-ff1f-15bb-1ed3-9fe5ab770298",
                    "port": "output0"
                },
                "target": {
                    "node": "34be98a9-195e-2c04-d31d-6555a196c7b8",
                    "port": "input0"
                }
            },
            {
                "type": "com.chanjet.gzq.aflow.Connection",
                "id": "2d7b6dcb-7ef3-b116-fe53-603c8a8b8f7b",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "2d7b6dcb-7ef3-b116-fe53-603c8a8b8f7b",
                    "type": "Connection",
                    "from": "563c111f-0c44-3af7-a3c3-1e0f145a2d40",
                    "to": "34be98a9-195e-2c04-d31d-6555a196c7b8"
                },
                "cssClass": "com_chanjet_gzq_aflow_Connection",
                "stroke": 2,
                "color": "#1B1B1B",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "563c111f-0c44-3af7-a3c3-1e0f145a2d40",
                    "port": "output0"
                },
                "target": {
                    "node": "da514a7b-ff1f-15bb-1ed3-9fe5ab770298",
                    "port": "input0"
                }
            },
            {
                "type": "com.chanjet.gzq.aflow.Connection",
                "id": "c32d50c2-50bd-ed34-6750-55449afac21e",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "c32d50c2-50bd-ed34-6750-55449afac21e",
                    "type": "Connection",
                    "from": "a832e33a-9375-5493-794f-8cb46eaf2617",
                    "to": "69221b85-31f1-4995-8865-c32157cb2582",
                    "operator": "2",
                    "expression": "5000"
                },
                "cssClass": "com_chanjet_gzq_aflow_Connection",
                "stroke": 2,
                "color": "#0000FF",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "a832e33a-9375-5493-794f-8cb46eaf2617",
                    "port": "output1"
                },
                "target": {
                    "node": "69221b85-31f1-4995-8865-c32157cb2582",
                    "port": "input0"
                }
            },
            {
                "type": "com.chanjet.gzq.aflow.Connection",
                "id": "1e57f18a-bbd4-54ae-1af2-832a2cf7148e",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "1e57f18a-bbd4-54ae-1af2-832a2cf7148e",
                    "type": "Connection",
                    "from": "69221b85-31f1-4995-8865-c32157cb2582",
                    "to": "34be98a9-195e-2c04-d31d-6555a196c7b8"
                },
                "cssClass": "com_chanjet_gzq_aflow_Connection",
                "stroke": 2,
                "color": "#1B1B1B",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "69221b85-31f1-4995-8865-c32157cb2582",
                    "port": "output0"
                },
                "target": {
                    "node": "da514a7b-ff1f-15bb-1ed3-9fe5ab770298",
                    "port": "input0"
                }
            }
        ],
        "userData": {
            "name": "流程模版",
            "id": "Canvas",
            "type": "FlowTemplate",
            "formTemplateId": "uuid",
            "formTemplateName": "报销单"
        }
    };


    response.end(JSON.stringify(data));


}).listen(8888);