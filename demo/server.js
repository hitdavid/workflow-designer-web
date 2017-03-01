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
                "type": "Start",
                "id": "35c6be08-1fe9-abbf-09af-55f82a8b8799",
                "x": 138,
                "y": 89,
                "width": 30,
                "height": 30,
                "alpha": 1,
                "userData": {
                    "name": "流程开始",
                    "id": "35c6be08-1fe9-abbf-09af-55f82a8b8799",
                    "type": "Start",
                    "label": "流程开始"
                },
                "cssClass": "Start",
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
                "type": "End",
                "id": "d408ac38-3f57-0ca3-4e79-44893147bdea",
                "x": 865,
                "y": 72,
                "width": 30,
                "height": 30,
                "alpha": 1,
                "userData": {
                    "name": "流程结束",
                    "id": "d408ac38-3f57-0ca3-4e79-44893147bdea",
                    "type": "End",
                    "label": "流程结束"
                },
                "cssClass": "End",
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
                "type": "UserTask",
                "id": "b5e543c8-f246-f379-95e3-4398d46c1b8b",
                "x": 143,
                "y": 281,
                "width": 96,
                "height": 64,
                "alpha": 1,
                "userData": {
                    "name": "固定人员",
                    "id": "b5e543c8-f246-f379-95e3-4398d46c1b8b",
                    "type": "UserTask",
                    "label": "固定人员",
                    "userIds": ""
                },
                "cssClass": "UserTask",
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
                "type": "RoleTask",
                "id": "8b829c55-03aa-80b0-bc4e-b4a6d5c1b49e",
                "x": 759,
                "y": 350,
                "width": 96,
                "height": 64,
                "alpha": 1,
                "userData": {
                    "name": "管理角色",
                    "id": "8b829c55-03aa-80b0-bc4e-b4a6d5c1b49e",
                    "type": "RoleTask",
                    "label": "管理角色",
                    "roleIds": ""
                },
                "cssClass": "RoleTask",
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
                "type": "CountersignTask",
                "id": "a45ba3ba-59e9-e19b-2b35-516bee0fd80b",
                "x": 570,
                "y": 383,
                "width": 64,
                "height": 64,
                "alpha": 1,
                "userData": {
                    "name": "会签",
                    "id": "a45ba3ba-59e9-e19b-2b35-516bee0fd80b",
                    "type": "CountersignTask",
                    "label": "会签",
                    "roleIds": "",
                    "userIds": ""
                },
                "cssClass": "CountersignTask",
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
                        "x": 602,
                        "y": 383
                    },
                    {
                        "x": 634,
                        "y": 415
                    },
                    {
                        "x": 602,
                        "y": 447
                    },
                    {
                        "x": 570,
                        "y": 415
                    }
                ]
            },
            {
                "type": "BranchTask",
                "id": "577501f5-48c3-cca2-337a-5c72e06ca052",
                "x": 313,
                "y": 264,
                "width": 64,
                "height": 96,
                "alpha": 1,
                "userData": {
                    "name": "条件分支",
                    "id": "577501f5-48c3-cca2-337a-5c72e06ca052",
                    "type": "BranchTask",
                    "label": "条件",
                    "templateId": "uuid",
                    "templateName": "表单模版名称",
                    "fieldId": "uuid",
                    "fieldName": "表单字段名称"
                },
                "cssClass": "BranchTask",
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
                        "x": 313,
                        "y": 312
                    },
                    {
                        "x": 377,
                        "y": 264
                    },
                    {
                        "x": 377,
                        "y": 360
                    }
                ]
            },
            {
                "type": "UserTask",
                "id": "dc4277af-f9d4-e9ee-fe4a-2ec5fd2d8603",
                "x": 572,
                "y": 185,
                "width": 96,
                "height": 64,
                "alpha": 1,
                "userData": {
                    "name": "固定人员",
                    "id": "dc4277af-f9d4-e9ee-fe4a-2ec5fd2d8603",
                    "type": "UserTask",
                    "label": "固定人员",
                    "userIds": ""
                },
                "cssClass": "UserTask",
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
                "type": "Connection",
                "id": "47c06c96-4eda-b8e3-6c24-397b882127ba",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "47c06c96-4eda-b8e3-6c24-397b882127ba",
                    "type": "Connection",
                    "from": "35c6be08-1fe9-abbf-09af-55f82a8b8799",
                    "to": "b5e543c8-f246-f379-95e3-4398d46c1b8b"
                },
                "cssClass": "Connection",
                "stroke": 2,
                "color": "#1B1B1B",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "35c6be08-1fe9-abbf-09af-55f82a8b8799",
                    "port": "output0"
                },
                "target": {
                    "node": "b5e543c8-f246-f379-95e3-4398d46c1b8b",
                    "port": "input0"
                }
            },
            {
                "type": "Connection",
                "id": "ce6893d3-0769-cbe6-777c-17ceb7963ac6",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "ce6893d3-0769-cbe6-777c-17ceb7963ac6",
                    "type": "Connection",
                    "from": "b5e543c8-f246-f379-95e3-4398d46c1b8b",
                    "to": "d408ac38-3f57-0ca3-4e79-44893147bdea"
                },
                "cssClass": "Connection",
                "stroke": 2,
                "color": "#1B1B1B",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "8b829c55-03aa-80b0-bc4e-b4a6d5c1b49e",
                    "port": "output0"
                },
                "target": {
                    "node": "d408ac38-3f57-0ca3-4e79-44893147bdea",
                    "port": "input0"
                }
            },
            {
                "type": "Connection",
                "id": "df0d5e4d-6ce6-471d-ea9a-529f10be0ad8",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "df0d5e4d-6ce6-471d-ea9a-529f10be0ad8",
                    "type": "Connection",
                    "from": "b5e543c8-f246-f379-95e3-4398d46c1b8b",
                    "to": "577501f5-48c3-cca2-337a-5c72e06ca052"
                },
                "cssClass": "Connection",
                "stroke": 2,
                "color": "#1B1B1B",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "b5e543c8-f246-f379-95e3-4398d46c1b8b",
                    "port": "output0"
                },
                "target": {
                    "node": "577501f5-48c3-cca2-337a-5c72e06ca052",
                    "port": "input0"
                }
            },
            {
                "type": "Connection",
                "id": "93b73e23-4202-545a-1ef2-5d8572f8f871",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "93b73e23-4202-545a-1ef2-5d8572f8f871",
                    "type": "Connection",
                    "from": "577501f5-48c3-cca2-337a-5c72e06ca052",
                    "to": "a45ba3ba-59e9-e19b-2b35-516bee0fd80b",
                    "operator": "",
                    "expression": ""
                },
                "cssClass": "Connection",
                "stroke": 2,
                "color": "#0000FF",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "577501f5-48c3-cca2-337a-5c72e06ca052",
                    "port": "output1"
                },
                "target": {
                    "node": "a45ba3ba-59e9-e19b-2b35-516bee0fd80b",
                    "port": "input0"
                }
            },
            {
                "type": "Connection",
                "id": "0c5c91d3-a1ea-9303-a977-4fcf6b54c60d",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "0c5c91d3-a1ea-9303-a977-4fcf6b54c60d",
                    "type": "Connection",
                    "from": "a45ba3ba-59e9-e19b-2b35-516bee0fd80b",
                    "to": "8b829c55-03aa-80b0-bc4e-b4a6d5c1b49e"
                },
                "cssClass": "Connection",
                "stroke": 2,
                "color": "#1B1B1B",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "a45ba3ba-59e9-e19b-2b35-516bee0fd80b",
                    "port": "output0"
                },
                "target": {
                    "node": "8b829c55-03aa-80b0-bc4e-b4a6d5c1b49e",
                    "port": "input0"
                }
            },
            {
                "type": "Connection",
                "id": "b7e41124-18f6-5c8b-9f8d-1932a13cea4f",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "b7e41124-18f6-5c8b-9f8d-1932a13cea4f",
                    "type": "Connection",
                    "from": "577501f5-48c3-cca2-337a-5c72e06ca052",
                    "to": "dc4277af-f9d4-e9ee-fe4a-2ec5fd2d8603",
                    "operator": "",
                    "expression": ""
                },
                "cssClass": "Connection",
                "stroke": 2,
                "color": "#0000FF",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "577501f5-48c3-cca2-337a-5c72e06ca052",
                    "port": "output0"
                },
                "target": {
                    "node": "dc4277af-f9d4-e9ee-fe4a-2ec5fd2d8603",
                    "port": "input0"
                }
            },
            {
                "type": "Connection",
                "id": "4bc5860b-6fc6-b506-a4c4-cc9470ad5036",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "4bc5860b-6fc6-b506-a4c4-cc9470ad5036",
                    "type": "Connection",
                    "from": "dc4277af-f9d4-e9ee-fe4a-2ec5fd2d8603",
                    "to": "d408ac38-3f57-0ca3-4e79-44893147bdea"
                },
                "cssClass": "Connection",
                "stroke": 2,
                "color": "#1B1B1B",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "dc4277af-f9d4-e9ee-fe4a-2ec5fd2d8603",
                    "port": "output0"
                },
                "target": {
                    "node": "d408ac38-3f57-0ca3-4e79-44893147bdea",
                    "port": "input0"
                }
            }
        ],
        "userData": {
            "name": "流程模版",
            "id": "df91c65d-87b3-25a7-1a3a-c92877dbbd07",
            "type": "FlowDefinition",
            "formTemplateId": "uuid",
            "formTemplateName": "表单模版名称"
        }
    };


    response.end(JSON.stringify(data));


}).listen(8888);