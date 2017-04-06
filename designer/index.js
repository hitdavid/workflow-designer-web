/**
 * Created by David on 2017/4/5.
 */

import '../scripts/easyui/themes/gray/easyui.css';
import "../scripts/easyui/themes/icon.css";
import "../scripts/jquery/plugins/contextmenu/jquery.contextmenu.css";
import "./styles/designer.css";
import "./styles/wizard.css";
import "./styles/jqPropertyGrid.css";

import $ from "../scripts/jquery/jquery-1.9.1.js";
window.$ = $;
import "../scripts/easyui/jquery.easyui.min.js";
import "../scripts/jquery/plugins/touchpunch/jquery-touch_punch.js";
import "../scripts/jquery/plugins/autoresize/jquery.autoresize.js";
import "../scripts/jquery/plugins/contextmenu/jquery.contextmenu.js";
import "../scripts/draw2d/lib/shifty.js";
import eve from 'eve';
import "../scripts/draw2d/lib/raphael.js";
import "../scripts/draw2d/lib/rgbcolor.js";
import "../scripts/draw2d/lib/canvg.js";
import "../scripts/draw2d/lib/Class.js";
import "../scripts/draw2d/lib/json2.js";
import "../scripts/draw2d/lib/xml.js";
import "../scripts/draw2d/lib/pathfinding-browser.min.js";
import "../scripts/draw2d/draw2d.js";
import "../scripts/easyui/jquery.easyui.min.js";
import "../scripts/bootstrap/bootstrap.min.js";
import "../scripts/wizard/wizard.js";
import "./properties/operators.js";

import "./Application.js";
import "./canvas/Canvas.js";
import "./accordion/Accordion.js";
import "./toolbar/ToolBar.js";
import "./figures/Start.js";
import "./figures/End.js";
import "./figures/UserTask.js";
import "./figures/RoleTask.js";
import "./figures/CountersignTask.js";
import "./figures/BranchTask.js";
import "./figures/Connection.js";
import "./properties/propertiesMeta.js";
import "./properties/jqPropertyGrid.js";
import "./page.js";

window.onload = function(){
    var myWizard = $('#myWizard').wizard();
};