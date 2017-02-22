# workflow-designer-web

代码修改, 以适应 `审批流程` 编辑,作为审批流程设计器使用.

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

### TODO:
- [x] 序列化反序列化：
    * [x] json -> object
- 规则检查算法：
    1. 每个 port （ 无论 source 还是 target ）都必须有连接线连接。
    2. 每个 sourcePort （不包含会签）只允许一条连接线连出。
    3. 通知 节点不受上述 第2条 限制，允许从任意 sourcePort 引出。
    4. 每个 会签 下方的 sourcePort 可以允许 1+ 个引出线。
    5. 每个 条件分支 节点允许 1+ 个 targetPort 和 1+ 个 sourcePort， 并且每个 sourcePort 都有附加的条件表达式（userData）。
    6. 每个图有且仅有 1 个 开始节点 和 1 个 结束节点。
    7. 任意节点的 驳回，撤销 等业务操作都不在图中表现。
    8. 一个完整的图中，任意一条路径都是起点到终点的路径的一部分，这张图一定是单向无环图。

- 属性面板
    - [x] always on    
    
    - [x] 属性设置     
    
    - [x] 双向绑定     

- json生成优化(暂时不做)

### 图示：

![](https://raw.githubusercontent.com/hitdavid/workflow-designer-web/master/demo/demo.png)

demo folder includes a demo server, in server.js

