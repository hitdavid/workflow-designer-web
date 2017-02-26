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
                "id": "3a88d54f-70aa-97e9-c240-60d58b0e91f9",
                "x": 35,
                "y": 205,
                "width": 30,
                "height": 30,
                "alpha": 1,
                "userData": {
                    "name": "流程开始",
                    "id": "3a88d54f-70aa-97e9-c240-60d58b0e91f9",
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
                "type": "com.chanjet.gzq.aflow.RoleTask",
                "id": "560b00e9-2351-68af-7506-64dda6ee055e",
                "x": 149,
                "y": 188,
                "width": 96,
                "height": 64,
                "alpha": 1,
                "userData": {
                    "name": "管理角色",
                    "id": "560b00e9-2351-68af-7506-64dda6ee055e",
                    "type": "RoleTask",
                    "label": "管理角色",
                    "roleIds": "123"
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
                "id": "9d08427a-443f-5899-4001-e39e8fb60747",
                "x": 90,
                "y": 328,
                "width": 64,
                "height": 96,
                "alpha": 1,
                "userData": {
                    "name": "条件分支",
                    "id": "9d08427a-443f-5899-4001-e39e8fb60747",
                    "type": "BranchTask",
                    "label": "条件",
                    "templateId": "12345",
                    "templateName": "报销单",
                    "fieldId": "67890",
                    "fieldName": "报销类型"
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
                        "x": 90,
                        "y": 376
                    },
                    {
                        "x": 154,
                        "y": 328
                    },
                    {
                        "x": 154,
                        "y": 424
                    }
                ]
            },
            {
                "type": "com.chanjet.gzq.aflow.RoleTask",
                "id": "220096ad-9c4b-5fa9-6527-691e10dd4fbe",
                "x": 428,
                "y": 284,
                "width": 96,
                "height": 64,
                "alpha": 1,
                "userData": {
                    "name": "管理角色",
                    "id": "220096ad-9c4b-5fa9-6527-691e10dd4fbe",
                    "type": "RoleTask",
                    "label": "管理角色",
                    "roleIds": "123"
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
                "type": "com.chanjet.gzq.aflow.RoleTask",
                "id": "81de3a82-ccad-404b-85e7-fe21ac9679bd",
                "x": 294,
                "y": 519,
                "width": 96,
                "height": 64,
                "alpha": 1,
                "userData": {
                    "name": "管理角色",
                    "id": "81de3a82-ccad-404b-85e7-fe21ac9679bd",
                    "type": "RoleTask",
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
                "type": "com.chanjet.gzq.aflow.BranchTask",
                "id": "f0eada93-f795-824b-95aa-163645d6b8d3",
                "x": 464,
                "y": 401,
                "width": 64,
                "height": 96,
                "alpha": 1,
                "userData": {
                    "name": "条件分支",
                    "id": "f0eada93-f795-824b-95aa-163645d6b8d3",
                    "type": "BranchTask",
                    "label": "条件",
                    "templateId": "12345",
                    "templateName": "报销单",
                    "fieldId": "67890",
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
                        "x": 464,
                        "y": 449
                    },
                    {
                        "x": 528,
                        "y": 401
                    },
                    {
                        "x": 528,
                        "y": 497
                    }
                ]
            },
            {
                "type": "com.chanjet.gzq.aflow.CountersignTask",
                "id": "27668396-5401-2a81-34f8-53a484d9734d",
                "x": 747,
                "y": 474,
                "width": 64,
                "height": 64,
                "alpha": 1,
                "userData": {
                    "name": "会签",
                    "id": "27668396-5401-2a81-34f8-53a484d9734d",
                    "type": "CountersignTask",
                    "label": "会签",
                    "roleIds": "",
                    "userIds": "111, 222, 333"
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
                        "x": 779,
                        "y": 474
                    },
                    {
                        "x": 811,
                        "y": 506
                    },
                    {
                        "x": 779,
                        "y": 538
                    },
                    {
                        "x": 747,
                        "y": 506
                    }
                ]
            },
            {
                "type": "com.chanjet.gzq.aflow.End",
                "id": "19f30999-3c10-964c-eeab-9856137ccbf6",
                "x": 985,
                "y": 307,
                "width": 30,
                "height": 30,
                "alpha": 1,
                "userData": {
                    "name": "流程结束",
                    "id": "19f30999-3c10-964c-eeab-9856137ccbf6",
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
                "id": "4885c240-479e-6ed7-4ca3-7ab9d68d9d5e",
                "x": 731,
                "y": 365,
                "width": 96,
                "height": 64,
                "alpha": 1,
                "userData": {
                    "name": "管理角色",
                    "id": "4885c240-479e-6ed7-4ca3-7ab9d68d9d5e",
                    "type": "RoleTask",
                    "label": "管理角色",
                    "roleIds": "123"
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
                "type": "com.chanjet.gzq.aflow.Connection",
                "id": "49a3b7b8-46b6-9cf8-3644-ecbad70cab12",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "49a3b7b8-46b6-9cf8-3644-ecbad70cab12",
                    "type": "Connection",
                    "from": "3a88d54f-70aa-97e9-c240-60d58b0e91f9",
                    "to": "560b00e9-2351-68af-7506-64dda6ee055e"
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
                    "node": "3a88d54f-70aa-97e9-c240-60d58b0e91f9",
                    "port": "output0"
                },
                "target": {
                    "node": "560b00e9-2351-68af-7506-64dda6ee055e",
                    "port": "input0"
                }
            },
            {
                "type": "com.chanjet.gzq.aflow.Connection",
                "id": "60e9427b-895a-9c1d-b413-1b9ec7d16c5f",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "60e9427b-895a-9c1d-b413-1b9ec7d16c5f",
                    "type": "Connection",
                    "from": "560b00e9-2351-68af-7506-64dda6ee055e",
                    "to": "9d08427a-443f-5899-4001-e39e8fb60747"
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
                    "node": "560b00e9-2351-68af-7506-64dda6ee055e",
                    "port": "output0"
                },
                "target": {
                    "node": "9d08427a-443f-5899-4001-e39e8fb60747",
                    "port": "input0"
                }
            },
            {
                "type": "com.chanjet.gzq.aflow.Connection",
                "id": "91ac00be-edbf-4763-d253-795cea6fa4b0",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "91ac00be-edbf-4763-d253-795cea6fa4b0",
                    "type": "Connection",
                    "from": "9d08427a-443f-5899-4001-e39e8fb60747",
                    "to": "220096ad-9c4b-5fa9-6527-691e10dd4fbe",
                    "operator": "等于",
                    "expression": "日常费用报销"
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
                    "node": "9d08427a-443f-5899-4001-e39e8fb60747",
                    "port": "output0"
                },
                "target": {
                    "node": "220096ad-9c4b-5fa9-6527-691e10dd4fbe",
                    "port": "input0"
                }
            },
            {
                "type": "com.chanjet.gzq.aflow.Connection",
                "id": "8a526032-d931-bb92-0911-0f7c5c8d3697",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "8a526032-d931-bb92-0911-0f7c5c8d3697",
                    "type": "Connection",
                    "from": "9d08427a-443f-5899-4001-e39e8fb60747",
                    "to": "81de3a82-ccad-404b-85e7-fe21ac9679bd",
                    "operator": "不等于",
                    "expression": "日常费用报销"
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
                    "node": "9d08427a-443f-5899-4001-e39e8fb60747",
                    "port": "output1"
                },
                "target": {
                    "node": "81de3a82-ccad-404b-85e7-fe21ac9679bd",
                    "port": "input0"
                }
            },
            {
                "type": "com.chanjet.gzq.aflow.Connection",
                "id": "0365341d-cb6a-562a-81be-f191f6778fac",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "0365341d-cb6a-562a-81be-f191f6778fac",
                    "type": "Connection",
                    "from": "81de3a82-ccad-404b-85e7-fe21ac9679bd",
                    "to": "f0eada93-f795-824b-95aa-163645d6b8d3"
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
                    "node": "81de3a82-ccad-404b-85e7-fe21ac9679bd",
                    "port": "output0"
                },
                "target": {
                    "node": "f0eada93-f795-824b-95aa-163645d6b8d3",
                    "port": "input0"
                }
            },
            {
                "type": "com.chanjet.gzq.aflow.Connection",
                "id": "5f391211-d7cb-7916-15dc-d582d561a37c",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "5f391211-d7cb-7916-15dc-d582d561a37c",
                    "type": "Connection",
                    "from": "f0eada93-f795-824b-95aa-163645d6b8d3",
                    "to": "27668396-5401-2a81-34f8-53a484d9734d",
                    "operator": ">",
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
                    "node": "f0eada93-f795-824b-95aa-163645d6b8d3",
                    "port": "output1"
                },
                "target": {
                    "node": "27668396-5401-2a81-34f8-53a484d9734d",
                    "port": "input0"
                }
            },
            {
                "type": "com.chanjet.gzq.aflow.Connection",
                "id": "551e3b15-97f1-cdb1-1eab-75cf04b443d4",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "551e3b15-97f1-cdb1-1eab-75cf04b443d4",
                    "type": "Connection",
                    "from": "f0eada93-f795-824b-95aa-163645d6b8d3",
                    "to": "4885c240-479e-6ed7-4ca3-7ab9d68d9d5e",
                    "operator": "<=",
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
                    "node": "f0eada93-f795-824b-95aa-163645d6b8d3",
                    "port": "output0"
                },
                "target": {
                    "node": "4885c240-479e-6ed7-4ca3-7ab9d68d9d5e",
                    "port": "input0"
                }
            },
            {
                "type": "com.chanjet.gzq.aflow.Connection",
                "id": "47328344-f385-6df9-ac7c-68f3dc1cacef",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "47328344-f385-6df9-ac7c-68f3dc1cacef",
                    "type": "Connection",
                    "from": "220096ad-9c4b-5fa9-6527-691e10dd4fbe",
                    "to": "19f30999-3c10-964c-eeab-9856137ccbf6"
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
                    "node": "220096ad-9c4b-5fa9-6527-691e10dd4fbe",
                    "port": "output0"
                },
                "target": {
                    "node": "19f30999-3c10-964c-eeab-9856137ccbf6",
                    "port": "input0"
                }
            },
            {
                "type": "com.chanjet.gzq.aflow.Connection",
                "id": "f54a0f99-ac54-0913-6d54-c6079f99d4c1",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "f54a0f99-ac54-0913-6d54-c6079f99d4c1",
                    "type": "Connection",
                    "from": "4885c240-479e-6ed7-4ca3-7ab9d68d9d5e",
                    "to": "19f30999-3c10-964c-eeab-9856137ccbf6"
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
                    "node": "4885c240-479e-6ed7-4ca3-7ab9d68d9d5e",
                    "port": "output0"
                },
                "target": {
                    "node": "19f30999-3c10-964c-eeab-9856137ccbf6",
                    "port": "input0"
                }
            },
            {
                "type": "com.chanjet.gzq.aflow.Connection",
                "id": "6b6de62c-fbe9-997c-3dab-a326169bb284",
                "alpha": 1,
                "userData": {
                    "name": "连接线",
                    "id": "6b6de62c-fbe9-997c-3dab-a326169bb284",
                    "type": "Connection",
                    "from": "27668396-5401-2a81-34f8-53a484d9734d",
                    "to": "19f30999-3c10-964c-eeab-9856137ccbf6"
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
                    "node": "27668396-5401-2a81-34f8-53a484d9734d",
                    "port": "output0"
                },
                "target": {
                    "node": "19f30999-3c10-964c-eeab-9856137ccbf6",
                    "port": "input0"
                }
            }
        ],
        "userData": {
            "name": "流程模版",
            "id": "uuid-12345",
            "type": "FlowDefinition",
            "formTemplateId": "12345",
            "formTemplateName": "报销单"
        }
    };

    response.end(JSON.stringify(data));


}).listen(8888);