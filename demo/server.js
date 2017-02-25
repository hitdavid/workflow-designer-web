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
                "id": "f00b6cae-dd5e-43ae-d2e5-499a07514dbc",
                "x": 34,
                "y": 141,
                "width": 30,
                "height": 30,
                "alpha": 1,
                "userData": {
                    "name": "流程开始",
                    "id": "f00b6cae-dd5e-43ae-d2e5-499a07514dbc",
                    "type": "Start",
                    "color": "1B1B1B",
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
                "bgColor": "#FFFFFF",
                "color": "#1B1B1B",
                "stroke": 1
            },
            {
                "type": "com.chanjet.gzq.aflow.End",
                "id": "9b1df0f1-fb8b-8685-0a2c-dbb9b27a7d27",
                "x": 565,
                "y": 427,
                "width": 30,
                "height": 30,
                "alpha": 1,
                "userData": {
                    "name": "流程结束",
                    "id": "9b1df0f1-fb8b-8685-0a2c-dbb9b27a7d27",
                    "type": "End",
                    "color": "1B1B1B",
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
                "bgColor": "#FFFFFF",
                "color": "#1B1B1B",
                "stroke": 1
            },
            {
                "type": "com.chanjet.gzq.aflow.BranchTask",
                "id": "e7fc127e-6373-611b-5a97-6ef78d194588",
                "x": 97,
                "y": 163,
                "width": 64,
                "height": 96,
                "alpha": 1,
                "userData": {
                    "name": "条件分支",
                    "id": "e7fc127e-6373-611b-5a97-6ef78d194588",
                    "type": "BranchTask",
                    "color": "1B1B1B",
                    "label": "条件",
                    "templateId": "uuid",
                    "templateName": "表单模版名称",
                    "fieldId": "uuid",
                    "fieldName": "表单字段名称",
                    "senderId": "userId or roleId",
                    "branchVariable": "id"
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
                        "x": 97,
                        "y": 211
                    },
                    {
                        "x": 161,
                        "y": 163
                    },
                    {
                        "x": 161,
                        "y": 259
                    }
                ]
            },
            {
                "type": "com.chanjet.gzq.aflow.UserTask",
                "id": "78e912b7-a618-19e4-0ef2-bd3bc07abb56",
                "x": 204,
                "y": 96,
                "width": 96,
                "height": 64,
                "alpha": 1,
                "userData": {
                    "name": "固定人员",
                    "id": "78e912b7-a618-19e4-0ef2-bd3bc07abb56",
                    "type": "UserTask",
                    "color": "1B1B1B",
                    "label": "固定人员",
                    "userIds": ""
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
                "type": "com.chanjet.gzq.aflow.RoleTask",
                "id": "43f081a7-6564-558b-27ba-b9429a3e47b8",
                "x": 218,
                "y": 318,
                "width": 96,
                "height": 64,
                "alpha": 1,
                "userData": {
                    "name": "管理角色",
                    "id": "43f081a7-6564-558b-27ba-b9429a3e47b8",
                    "type": "RoleTask",
                    "color": "1B1B1B",
                    "label": "管理角色",
                    "roleIds": ""
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
                "id": "585f3674-8766-e065-c13d-10a76b7def44",
                "x": 439,
                "y": 217,
                "width": 64,
                "height": 64,
                "alpha": 1,
                "userData": {
                    "name": "会签",
                    "id": "585f3674-8766-e065-c13d-10a76b7def44",
                    "type": "CountersignTask",
                    "color": "1B1B1B",
                    "label": "会签",
                    "roleIds": "",
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
                        "x": 471,
                        "y": 217
                    },
                    {
                        "x": 503,
                        "y": 249
                    },
                    {
                        "x": 471,
                        "y": 281
                    },
                    {
                        "x": 439,
                        "y": 249
                    }
                ]
            },
            {
                "type": "com.chanjet.gzq.aflow.RoleTask",
                "id": "bae5d2a8-be46-5bca-26fd-4b980e2c7c94",
                "x": 215,
                "y": 199,
                "width": 96,
                "height": 64,
                "alpha": 1,
                "userData": {
                    "name": "管理角色",
                    "id": "bae5d2a8-be46-5bca-26fd-4b980e2c7c94",
                    "type": "RoleTask",
                    "color": "1B1B1B",
                    "label": "管理角色",
                    "roleIds": ""
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
                "type": "draw2d.Connection",
                "id": "5d8c6926-2451-905a-06c9-f78b1abb04d9",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "5d8c6926-2451-905a-06c9-f78b1abb04d9",
                    "type": "Connection",
                    "form": "f00b6cae-dd5e-43ae-d2e5-499a07514dbc",
                    "to": "e7fc127e-6373-611b-5a97-6ef78d194588"
                },
                "cssClass": "draw2d_Connection",
                "stroke": 2,
                "color": "#1B1B1B",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "f00b6cae-dd5e-43ae-d2e5-499a07514dbc",
                    "port": "output0"
                },
                "target": {
                    "node": "e7fc127e-6373-611b-5a97-6ef78d194588",
                    "port": "input0"
                }
            },
            {
                "type": "draw2d.Connection",
                "id": "be2d9c62-db83-42b2-22d7-791e93cc583f",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "be2d9c62-db83-42b2-22d7-791e93cc583f",
                    "type": "Connection",
                    "form": "e7fc127e-6373-611b-5a97-6ef78d194588",
                    "operator": "",
                    "expression": "",
                    "to": "78e912b7-a618-19e4-0ef2-bd3bc07abb56"
                },
                "cssClass": "draw2d_Connection",
                "stroke": 2,
                "color": "#0000FF",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "e7fc127e-6373-611b-5a97-6ef78d194588",
                    "port": "output0"
                },
                "target": {
                    "node": "78e912b7-a618-19e4-0ef2-bd3bc07abb56",
                    "port": "input0"
                }
            },
            {
                "type": "draw2d.Connection",
                "id": "a474cfa8-91a7-19fc-eacd-4658c10af208",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "a474cfa8-91a7-19fc-eacd-4658c10af208",
                    "type": "Connection",
                    "form": "e7fc127e-6373-611b-5a97-6ef78d194588",
                    "operator": "",
                    "expression": "",
                    "to": "bae5d2a8-be46-5bca-26fd-4b980e2c7c94"
                },
                "cssClass": "draw2d_Connection",
                "stroke": 2,
                "color": "#0000FF",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "e7fc127e-6373-611b-5a97-6ef78d194588",
                    "port": "output1"
                },
                "target": {
                    "node": "bae5d2a8-be46-5bca-26fd-4b980e2c7c94",
                    "port": "input0"
                }
            },
            {
                "type": "draw2d.Connection",
                "id": "034a537b-7508-15d2-2f8c-6015b394a4d7",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "034a537b-7508-15d2-2f8c-6015b394a4d7",
                    "type": "Connection",
                    "form": "e7fc127e-6373-611b-5a97-6ef78d194588",
                    "operator": "",
                    "expression": "",
                    "to": "43f081a7-6564-558b-27ba-b9429a3e47b8"
                },
                "cssClass": "draw2d_Connection",
                "stroke": 2,
                "color": "#0000FF",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "e7fc127e-6373-611b-5a97-6ef78d194588",
                    "port": "output2"
                },
                "target": {
                    "node": "43f081a7-6564-558b-27ba-b9429a3e47b8",
                    "port": "input0"
                }
            },
            {
                "type": "draw2d.Connection",
                "id": "7a72d3cc-8551-dbe7-69f0-adde375adca2",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "7a72d3cc-8551-dbe7-69f0-adde375adca2",
                    "type": "Connection",
                    "form": "43f081a7-6564-558b-27ba-b9429a3e47b8",
                    "to": "585f3674-8766-e065-c13d-10a76b7def44"
                },
                "cssClass": "draw2d_Connection",
                "stroke": 2,
                "color": "#1B1B1B",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "43f081a7-6564-558b-27ba-b9429a3e47b8",
                    "port": "output0"
                },
                "target": {
                    "node": "585f3674-8766-e065-c13d-10a76b7def44",
                    "port": "input0"
                }
            },
            {
                "type": "draw2d.Connection",
                "id": "e78c54b4-e8a3-455d-78b9-56f1a7372b1c",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "e78c54b4-e8a3-455d-78b9-56f1a7372b1c",
                    "type": "Connection",
                    "form": "bae5d2a8-be46-5bca-26fd-4b980e2c7c94",
                    "to": "585f3674-8766-e065-c13d-10a76b7def44"
                },
                "cssClass": "draw2d_Connection",
                "stroke": 2,
                "color": "#1B1B1B",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "bae5d2a8-be46-5bca-26fd-4b980e2c7c94",
                    "port": "output0"
                },
                "target": {
                    "node": "585f3674-8766-e065-c13d-10a76b7def44",
                    "port": "input0"
                }
            },
            {
                "type": "draw2d.Connection",
                "id": "65871e2e-5107-6bd3-5aaa-7f6739d5d2f3",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "65871e2e-5107-6bd3-5aaa-7f6739d5d2f3",
                    "type": "Connection",
                    "form": "78e912b7-a618-19e4-0ef2-bd3bc07abb56",
                    "to": "585f3674-8766-e065-c13d-10a76b7def44"
                },
                "cssClass": "draw2d_Connection",
                "stroke": 2,
                "color": "#1B1B1B",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "78e912b7-a618-19e4-0ef2-bd3bc07abb56",
                    "port": "output0"
                },
                "target": {
                    "node": "585f3674-8766-e065-c13d-10a76b7def44",
                    "port": "input0"
                }
            },
            {
                "type": "draw2d.Connection",
                "id": "6a2876d3-f97f-fd5e-699e-07ce8e87b2f3",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "6a2876d3-f97f-fd5e-699e-07ce8e87b2f3",
                    "type": "Connection",
                    "form": "585f3674-8766-e065-c13d-10a76b7def44",
                    "to": "9b1df0f1-fb8b-8685-0a2c-dbb9b27a7d27"
                },
                "cssClass": "draw2d_Connection",
                "stroke": 2,
                "color": "#1B1B1B",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "585f3674-8766-e065-c13d-10a76b7def44",
                    "port": "output0"
                },
                "target": {
                    "node": "9b1df0f1-fb8b-8685-0a2c-dbb9b27a7d27",
                    "port": "input0"
                }
            }
        ],
        "userData": {
            "name": "流程模版",
            "id": "Canvas",
            "type": "FlowTemplate",
            "formTemplateId": "uuid",
            "formTemplateName": "表单模版名称"
        }
    };

    response.end(JSON.stringify(data));


}).listen(8888);