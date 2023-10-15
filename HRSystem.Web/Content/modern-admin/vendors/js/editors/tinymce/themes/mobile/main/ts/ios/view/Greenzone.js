"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ephox/katamari");
var IosScrolling_1 = require("../scroll/IosScrolling");
var DeviceZones_1 = require("./DeviceZones");
var CursorRefresh_1 = require("../../touch/focus/CursorRefresh");
var scrollIntoView = function (cWin, socket, dropup, top, bottom) {
    var greenzone = DeviceZones_1.default.getGreenzone(socket, dropup);
    var refreshCursor = katamari_1.Fun.curry(CursorRefresh_1.default.refresh, cWin);
    if (top > greenzone || bottom > greenzone) {
        IosScrolling_1.default.moveOnlyScroll(socket, socket.dom().scrollTop - greenzone + bottom).get(refreshCursor);
    }
    else if (top < 0) {
        IosScrolling_1.default.moveOnlyScroll(socket, socket.dom().scrollTop + top).get(refreshCursor);
    }
    else {
    }
};
exports.default = {
    scrollIntoView: scrollIntoView
};
