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
                "id": "7f127acf-0982-ae3c-299f-79e3bd5bcf49",
                "x": 66,
                "y": 165,
                "width": 30,
                "height": 30,
                "alpha": 1,
                "userData": {
                    "name": "流程开始",
                    "id": "7f127acf-0982-ae3c-299f-79e3bd5bcf49",
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
                "id": "d6d966e7-2b45-6d00-2fef-e59c64d605ad",
                "x": 554,
                "y": 183,
                "width": 30,
                "height": 30,
                "alpha": 1,
                "userData": {
                    "name": "流程结束",
                    "id": "d6d966e7-2b45-6d00-2fef-e59c64d605ad",
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
                "type": "com.chanjet.gzq.aflow.UserTask",
                "id": "d5921775-643d-444c-b7c4-bbd84d2015b0",
                "x": 349,
                "y": 76,
                "width": 96,
                "height": 64,
                "alpha": 1,
                "userData": {
                    "name": "固定人员",
                    "id": "d5921775-643d-444c-b7c4-bbd84d2015b0",
                    "type": "UserTask",
                    "color": "1B1B1B",
                    "label": "固定人员",
                    "userIds": ''
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
                "id": "d8b547d7-6473-66d2-9f75-e8278dc30170",
                "x": 351,
                "y": 254,
                "width": 96,
                "height": 64,
                "alpha": 1,
                "userData": {
                    "name": "审批角色",
                    "id": "d8b547d7-6473-66d2-9f75-e8278dc30170",
                    "type": "RoleTask",
                    "color": "1B1B1B",
                    "label": "审批角色",
                    "roleIds": ''
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
                "id": "330e80d0-4dfc-7084-cd3f-5f86b6e1ebbc",
                "x": 136,
                "y": 125,
                "width": 96,
                "height": 96,
                "alpha": 1,
                "userData": {
                    "name": "条件分支",
                    "id": "330e80d0-4dfc-7084-cd3f-5f86b6e1ebbc",
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
                    }
                ],
                "bgColor": "#FFFFCC",
                "color": "#1B1B1B",
                "stroke": 1,
                "radius": 2,
                "vertices": [
                    {
                        "x": 136,
                        "y": 173
                    },
                    {
                        "x": 232,
                        "y": 125
                    },
                    {
                        "x": 232,
                        "y": 221
                    }
                ]
            },
            {
                "type": "draw2d.Connection",
                "id": "01984ab1-5dc7-6585-fd5d-5df080462a2c",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "01984ab1-5dc7-6585-fd5d-5df080462a2c",
                    "type": "Connection",
                    "form": "d8b547d7-6473-66d2-9f75-e8278dc30170",
                    "to": "d6d966e7-2b45-6d00-2fef-e59c64d605ad"
                },
                "cssClass": "draw2d_Connection",
                "stroke": 1,
                "color": "#1B1B1B",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "d8b547d7-6473-66d2-9f75-e8278dc30170",
                    "port": "output0"
                },
                "target": {
                    "node": "d6d966e7-2b45-6d00-2fef-e59c64d605ad",
                    "port": "input0"
                }
            },
            {
                "type": "draw2d.Connection",
                "id": "5c630a1d-f7a7-cbde-96df-8417235f535f",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "5c630a1d-f7a7-cbde-96df-8417235f535f",
                    "type": "Connection",
                    "form": "d5921775-643d-444c-b7c4-bbd84d2015b0",
                    "to": "d6d966e7-2b45-6d00-2fef-e59c64d605ad"
                },
                "cssClass": "draw2d_Connection",
                "stroke": 1,
                "color": "#1B1B1B",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "d5921775-643d-444c-b7c4-bbd84d2015b0",
                    "port": "output0"
                },
                "target": {
                    "node": "d6d966e7-2b45-6d00-2fef-e59c64d605ad",
                    "port": "input0"
                }
            },
            {
                "type": "draw2d.Connection",
                "id": "ed4267c2-e2fe-bfe9-dfd8-be3896aaf2cf",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "ed4267c2-e2fe-bfe9-dfd8-be3896aaf2cf",
                    "type": "Connection",
                    "form": "7f127acf-0982-ae3c-299f-79e3bd5bcf49",
                    "to": "330e80d0-4dfc-7084-cd3f-5f86b6e1ebbc"
                },
                "cssClass": "draw2d_Connection",
                "stroke": 1,
                "color": "#1B1B1B",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "7f127acf-0982-ae3c-299f-79e3bd5bcf49",
                    "port": "output0"
                },
                "target": {
                    "node": "330e80d0-4dfc-7084-cd3f-5f86b6e1ebbc",
                    "port": "input0"
                }
            },
            {
                "type": "draw2d.Connection",
                "id": "03c8e085-1742-eb40-e2c0-0923e4f7a7c7",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "03c8e085-1742-eb40-e2c0-0923e4f7a7c7",
                    "type": "Connection",
                    "form": "330e80d0-4dfc-7084-cd3f-5f86b6e1ebbc",
                    "operator": "",
                    "expression": "",
                    "to": "d5921775-643d-444c-b7c4-bbd84d2015b0"
                },
                "cssClass": "draw2d_Connection",
                "stroke": 1,
                "color": "#1B1B1B",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "330e80d0-4dfc-7084-cd3f-5f86b6e1ebbc",
                    "port": "output0"
                },
                "target": {
                    "node": "d5921775-643d-444c-b7c4-bbd84d2015b0",
                    "port": "input0"
                }
            },
            {
                "type": "draw2d.Connection",
                "id": "75736f75-18e5-1703-e1df-ccbdeb144a3b",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "75736f75-18e5-1703-e1df-ccbdeb144a3b",
                    "type": "Connection",
                    "form": "330e80d0-4dfc-7084-cd3f-5f86b6e1ebbc",
                    "operator": "",
                    "expression": "",
                    "to": "d8b547d7-6473-66d2-9f75-e8278dc30170"
                },
                "cssClass": "draw2d_Connection",
                "stroke": 1,
                "color": "#1B1B1B",
                "outlineStroke": 0,
                "outlineColor": "none",
                "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
                "router": "draw2d.layout.connection.SplineConnectionRouter",
                "radius": 2,
                "source": {
                    "node": "330e80d0-4dfc-7084-cd3f-5f86b6e1ebbc",
                    "port": "output1"
                },
                "target": {
                    "node": "d8b547d7-6473-66d2-9f75-e8278dc30170",
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