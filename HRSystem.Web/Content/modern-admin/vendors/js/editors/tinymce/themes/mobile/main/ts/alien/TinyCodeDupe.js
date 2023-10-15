"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dom_globals_1 = require("@ephox/dom-globals");
var openLink = function (target) {
    var link = dom_globals_1.document.createElement('a');
    link.target = '_blank';
    link.href = target.href;
    link.rel = 'noreferrer noopener';
    var nuEvt = dom_globals_1.document.createEvent('MouseEvents');
    nuEvt.initMouseEvent('click', true, true, dom_globals_1.window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    dom_globals_1.document.body.appendChild(link);
    link.dispatchEvent(nuEvt);
    dom_globals_1.document.body.removeChild(link);
};
exports.default = {
    openLink: openLink
};
