/**
 * Created by David on 2017/3/30.
 */

require("./scripts/jquery/plugins/pace/themes/pace-theme-loading-bar.css");
require("./scripts/easyui/themes/gray/easyui.css");

require("./scripts/easyui/themes/gray/easyui.css");
require("./scripts/easyui/themes/icon.css");
require("./scripts/jquery/plugins/contextmenu/jquery.contextmenu.css");
require("./designer/styles/designer.css");
require("./designer/styles/wizard.css");
require("./designer/styles/jqPropertyGrid.css");

document.write(require("./scripts/jquery/plugins/pace/pace.min.js"));
document.write(require("./scripts/jquery/jquery-1.9.1.js"));
document.write(require("./scripts/easyui/jquery.easyui.min.js"));
document.write(require("./scripts/jquery/plugins/touchpunch/jquery-touch_punch.js"));
document.write(require("./scripts/jquery/plugins/autoresize/jquery.autoresize.js"));
document.write(require("./scripts/jquery/plugins/contextmenu/jquery.contextmenu.js"));


document.write(require("./scripts/draw2d/lib/shifty.js"));
document.write(require("./scripts/draw2d/lib/raphael.js"));
document.write(require("./scripts/draw2d/lib/rgbcolor.js"));
document.write(require("./scripts/draw2d/lib/canvg.js"));
document.write(require("./scripts/draw2d/lib/Class.js"));
document.write(require("./scripts/draw2d/lib/json2.js"));
document.write(require("./scripts/draw2d/lib/xml.js"));
document.write(require("./scripts/draw2d/lib/pathfinding-browser.min.js"));


document.write(require("./scripts/draw2d/draw2d.js"));
document.write(require("./scripts/easyui/jquery.easyui.min.js"));
document.write(require("./scripts/bootstrap/bootstrap.min.js"));
document.write(require("./scripts/wizard/wizard.js"));
document.write(require("./designer/properties/operators.js"));

    <!-- 以下JS为应用的整体布局的JS -->
document.write(require("./designer/Application.js"));
document.write(require("./designer/canvas/Canvas.js"));
document.write(require("./designer/accordion/Accordion.js"));
document.write(require("./designer/toolbar/ToolBar.js"));

    <!-- 以下JS为各个节点的JS -->
document.write(require("./designer/figures/Start.js"));
document.write(require("./designer/figures/End.js"));

    <!-- 固定人 -->
document.write(require("./designer/figures/UserTask.js"));
    <!-- 角色 -->
document.write(require("./designer/figures/RoleTask.js"));
    <!-- 会签 -->
document.write(require("./designer/figures/CountersignTask.js"));
    <!-- 分支 -->
document.write(require("./designer/figures/BranchTask.js"));

document.write(require("./designer/figures/Connection.js"));

document.write(require("./designer/properties/propertiesMeta.js"));

document.write(require("./designer/properties/jqPropertyGrid.js"));

document.write(require("./designer/page.js"));


