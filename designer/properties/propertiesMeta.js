/**
 * Created by David on 2017/2/20.
 */
var theMeta = {
    id: {
        browsable: true,
        group: "基本属性",
        type: 'text',
        name: "ID",
        readonly: "true",
    },
    type: {
        browsable: true,
        group: "基本属性",
        type: 'text',
        name: "类型",
        readonly: "true",
    },
    color: {
        browsable: true,
        group: "基本属性",
        type: 'color',
        name: "颜色",
        readonly: "true",
    },
    name: {
        browsable: true,
        group: "基本属性",
        type: 'label',
        name: "名称",
        readonly: "true",
    },
    label: {
        browsable: true,
        group: "基本属性",
        type: 'text',
        name: "标签",
        readonly: "true",
    },
    templateId: {
        browsable: true,
        group: "条件属性",
        type: 'text',
        name: "模版ID",
        readonly: "false",
    },
    templateName: {
        browsable: true,
        group: "条件属性",
        type: 'text',
        name: "模版名称",
        readonly: "false",
    },
    fieldId: {
        browsable: true,
        group: "条件属性",
        type: 'text',
        name: "字段ID",
        readonly: "false",
    },
    fieldName: {
        browsable: true,
        group: "条件属性",
        type: 'text',
        name: "字段名称",
        readonly: "false",
    },
    formTemplateName: {
        browsable: true,
        group: "条件属性",
        type: 'text',
        name: "表单模版",
        readonly: "false",
    },
    formTemplateId: {
        browsable: true,
        group: "条件属性",
        type: 'text',
        name: "表单模版ID",
        readonly: "false",
    },


    inputPorts: {
        browsable: true,
        group: "连接",
        type: 'object',
        name: "输入",
    },
    outputPorts: {
        browsable: true,
        group: "连接",
        type: 'outputPorts',
        name: "输出",
    },

    from: {
        browsable: true,
        group: "连接",
        type: 'text',
        name: "起点",
    },
    to: {
        browsable: true,
        group: "连接",
        type: 'text',
        name: "终点",
    },

    operator: {
        browsable: true,
        group: "条件设置",
        type: 'options',
        options: ['', '>', '>=', '<', '<=', '等于', '不等于'],
        name: "运算符",
    },
    expression: {
        browsable: true,
        group: "条件设置",
        type: 'text',
        name: "比较值",
    },
    roleIds: {
        browsable: true,
        group: "审批人设置",
        type: 'text',
        name: "角色",
    },
    userIds: {
        browsable: true,
        group: "审批人设置",
        type: 'text',
        name: "审批人",
}


};
var options = {
    meta: theMeta
};