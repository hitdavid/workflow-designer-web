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
                "id": "020b2f15-f4f7-304f-a2f0-df0fe7c6ebf7",
                "x": 156,
                "y": 176,
                "width": 30,
                "height": 30,
                "alpha": 1,
                "userData": {
                    "name": "流程开始",
                    "id": "020b2f15-f4f7-304f-a2f0-df0fe7c6ebf7",
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
                "type": "UserTask",
                "id": "ef1131f2-360c-faf8-2536-1d6938a6080a",
                "x": 301,
                "y": 159,
                "width": 96,
                "height": 64,
                "alpha": 1,
                "userData": {
                    "name": "固定人员",
                    "id": "ef1131f2-360c-faf8-2536-1d6938a6080a",
                    "type": "UserTask",
                    "label": "22",
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
                "id": "fc413a5d-5ee6-3593-2388-422cd4342006",
                "x": 486,
                "y": 159,
                "width": 96,
                "height": 64,
                "alpha": 1,
                "userData": {
                    "name": "管理角色",
                    "id": "fc413a5d-5ee6-3593-2388-422cd4342006",
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
                "type": "BranchTask",
                "id": "82c5f8d9-9352-fdf0-9199-7ca37bcdd54b",
                "x": 675,
                "y": 143,
                "width": 64,
                "height": 96,
                "alpha": 1,
                "userData": {
                    "name": "条件分支",
                    "id": "82c5f8d9-9352-fdf0-9199-7ca37bcdd54b",
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
                        "x": 675,
                        "y": 191
                    },
                    {
                        "x": 739,
                        "y": 143
                    },
                    {
                        "x": 739,
                        "y": 239
                    }
                ]
            },
            {
                "type": "End",
                "id": "d60e15d3-cd79-c89a-c20e-99ae5b7551c3",
                "x": 1003,
                "y": 159,
                "width": 30,
                "height": 30,
                "alpha": 1,
                "userData": {
                    "name": "流程结束",
                    "id": "d60e15d3-cd79-c89a-c20e-99ae5b7551c3",
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
                "id": "d0cb76a0-9ffe-4a7c-da75-4bca29ee45fb",
                "x": 834,
                "y": 367,
                "width": 96,
                "height": 64,
                "alpha": 1,
                "userData": {
                    "name": "固定人员",
                    "id": "d0cb76a0-9ffe-4a7c-da75-4bca29ee45fb",
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
                "id": "e1bff94d-9da2-7fcc-2f3e-39ba67319184",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "e1bff94d-9da2-7fcc-2f3e-39ba67319184",
                    "type": "Connection",
                    "from": "020b2f15-f4f7-304f-a2f0-df0fe7c6ebf7",
                    "to": "ef1131f2-360c-faf8-2536-1d6938a6080a"
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
                    "node": "020b2f15-f4f7-304f-a2f0-df0fe7c6ebf7",
                    "port": "output0"
                },
                "target": {
                    "node": "ef1131f2-360c-faf8-2536-1d6938a6080a",
                    "port": "input0"
                }
            },
            {
                "type": "Connection",
                "id": "2af8e9e7-9ec4-3acb-a576-7bc7a01efed3",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "2af8e9e7-9ec4-3acb-a576-7bc7a01efed3",
                    "type": "Connection",
                    "from": "ef1131f2-360c-faf8-2536-1d6938a6080a",
                    "to": "fc413a5d-5ee6-3593-2388-422cd4342006"
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
                    "node": "ef1131f2-360c-faf8-2536-1d6938a6080a",
                    "port": "output0"
                },
                "target": {
                    "node": "fc413a5d-5ee6-3593-2388-422cd4342006",
                    "port": "input0"
                }
            },
            {
                "type": "Connection",
                "id": "c78dfac6-4cd8-7add-7236-7c35af9edd49",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "c78dfac6-4cd8-7add-7236-7c35af9edd49",
                    "type": "Connection",
                    "from": "fc413a5d-5ee6-3593-2388-422cd4342006",
                    "to": "82c5f8d9-9352-fdf0-9199-7ca37bcdd54b"
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
                    "node": "fc413a5d-5ee6-3593-2388-422cd4342006",
                    "port": "output0"
                },
                "target": {
                    "node": "82c5f8d9-9352-fdf0-9199-7ca37bcdd54b",
                    "port": "input0"
                }
            },
            {
                "type": "Connection",
                "id": "27b93744-cfed-8e3a-26cf-817f41f9f0fd",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "27b93744-cfed-8e3a-26cf-817f41f9f0fd",
                    "type": "Connection",
                    "from": "82c5f8d9-9352-fdf0-9199-7ca37bcdd54b",
                    "to": "d60e15d3-cd79-c89a-c20e-99ae5b7551c3",
                    "expression": "<3",
                    "help": "条件输入支持：<br />逗号分隔的多个条件，同时满足<br /><br />支持的运算符：<br />> 大于<br />>= 大于等于<br />< 小于<br /><= 大于等于<br />= 等于<br />!= 不等于<br />* 缺省条件，不满足其他条件时成立<br /><br />例子：<br />>500, <= 50000<br />-表示条件大于500并且小于等于50000<br />=1, =2, =3<br />-表示条件等于1，2，或者3<br />=报销单<br />-表示条件等于报销单<br />"
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
                    "node": "82c5f8d9-9352-fdf0-9199-7ca37bcdd54b",
                    "port": "output0"
                },
                "target": {
                    "node": "d60e15d3-cd79-c89a-c20e-99ae5b7551c3",
                    "port": "input0"
                }
            },
            {
                "type": "Connection",
                "id": "ed315a71-40ac-2dc3-af72-136bc7f5dd80",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "ed315a71-40ac-2dc3-af72-136bc7f5dd80",
                    "type": "Connection",
                    "from": "82c5f8d9-9352-fdf0-9199-7ca37bcdd54b",
                    "to": "d0cb76a0-9ffe-4a7c-da75-4bca29ee45fb",
                    "expression": ">=3",
                    "help": "条件输入支持：<br />逗号分隔的多个条件，同时满足<br /><br />支持的运算符：<br />> 大于<br />>= 大于等于<br />< 小于<br /><= 大于等于<br />= 等于<br />!= 不等于<br />* 缺省条件，不满足其他条件时成立<br /><br />例子：<br />>500, <= 50000<br />-表示条件大于500并且小于等于50000<br />=1, =2, =3<br />-表示条件等于1，2，或者3<br />=报销单<br />-表示条件等于报销单<br />"
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
                    "node": "82c5f8d9-9352-fdf0-9199-7ca37bcdd54b",
                    "port": "output1"
                },
                "target": {
                    "node": "d0cb76a0-9ffe-4a7c-da75-4bca29ee45fb",
                    "port": "input0"
                }
            },
            {
                "type": "Connection",
                "id": "cc15ed7c-e084-09af-25a4-148397b3d932",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "cc15ed7c-e084-09af-25a4-148397b3d932",
                    "type": "Connection",
                    "from": "d0cb76a0-9ffe-4a7c-da75-4bca29ee45fb",
                    "to": "d60e15d3-cd79-c89a-c20e-99ae5b7551c3"
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
                    "node": "d0cb76a0-9ffe-4a7c-da75-4bca29ee45fb",
                    "port": "output0"
                },
                "target": {
                    "node": "d60e15d3-cd79-c89a-c20e-99ae5b7551c3",
                    "port": "input0"
                }
            }
        ],
        "userData": {
            "name": "流程模版",
            "id": "96ee4442-97b0-83dc-b751-1166a33d5733",
            "type": "FlowDefinition",
            "formTemplateId": "uuid",
            "formTemplateName": "表单模版名称"
        }
    };


    response.end(JSON.stringify(data));


}).listen(8888);