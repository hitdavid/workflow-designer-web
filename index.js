/**
 * Created by David on 2017/4/5.
 */

import './scripts/jquery/plugins/pace/themes/pace-theme-loading-bar.css';
import './scripts/easyui/themes/gray/easyui.css';


import Pace from "./scripts/jquery/plugins/pace/pace.min.js";
// import $ from "./scripts/jquery/jquery-1.9.1.js";
// window.$ = $;

import "./scripts/easyui/jquery.easyui.min.js";

window.paceOptions = {
    elements: true
};

window.onload = function () {
    Pace.stop();
};

