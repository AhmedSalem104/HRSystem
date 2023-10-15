"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sugar_1 = require("@ephox/sugar");
var CursorRefresh_1 = require("../../touch/focus/CursorRefresh");
var resume = function (cWin, frame) {
    sugar_1.Focus.active().each(function (active) {
        if (!sugar_1.Compare.eq(active, frame)) {
            sugar_1.Focus.blur(active);
        }
    });
    cWin.focus();
    sugar_1.Focus.focus(sugar_1.Element.fromDom(cWin.document.body));
    CursorRefresh_1.default.refresh(cWin);
};
exports.default = {
    resume: resume
};
