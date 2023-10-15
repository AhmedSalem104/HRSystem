"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sugar_1 = require("@ephox/sugar");
var Delay_1 = require("tinymce/core/api/util/Delay");
var setSelectionAtTouch = function (editorApi, touchEvent) {
    sugar_1.Focus.focus(editorApi.body());
    var touch = touchEvent.raw().changedTouches[0];
    sugar_1.WindowSelection.getAtPoint(editorApi.win(), touch.pageX, touch.pageY).each(function (raw) {
        editorApi.setSelection(raw.start(), raw.soffset(), raw.finish(), raw.foffset());
    });
};
var onOrientationReady = function (outerWindow, refreshView) {
    var scrollNotZero = Delay_1.default.setInterval(function () {
        if (outerWindow.pageYOffset === 0) {
            Delay_1.default.clearInterval(scrollNotZero);
            refreshView();
        }
    }, 100);
};
exports.default = {
    setSelectionAtTouch: setSelectionAtTouch,
    onOrientationReady: onOrientationReady
};
