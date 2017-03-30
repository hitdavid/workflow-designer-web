# workflow-designer-web

代码修改, 以适应 `审批流程` 编辑,作为审批流程设计器使用.

## 2017-03-30 ver 0.9

支持 BPMN 2.0 XML 输出
支持 Json输出

### 模型组成:

审批模型支持的概念有3, 分别是:

#### 审批节点

- 固定人员审批节点
- 部门主管审批节点

#### 审批条件

- 针对单据某字段
- 针对当前单据制单人

#### 会签

- 全部完成型

### 特性:
- [] 流程向导
- [x] 序列化反序列化：
    * [x] json -> object
- 规则检查算法：

- 属性面板
    - [x] always on

    - [x] 属性设置     
    
    - [x] 双向绑定     

- json生成优化

### 图示：

![](https://raw.githubusercontent.com/hitdavid/workflow-designer-web/dev/demo/demo.png)

demo folder includes a demo server, in server.js

