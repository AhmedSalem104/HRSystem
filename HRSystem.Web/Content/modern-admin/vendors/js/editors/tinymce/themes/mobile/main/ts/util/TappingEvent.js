"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alloy_1 = require("@ephox/alloy");
var sugar_1 = require("@ephox/sugar");
var monitor = function (editorApi) {
    var tapEvent = alloy_1.TapEvent.monitor({
        triggerEvent: function (type, evt) {
            editorApi.onTapContent(evt);
        }
    });
    var onTouchend = function () {
        return sugar_1.DomEvent.bind(editorApi.body(), 'touchend', function (evt) {
            tapEvent.fireIfReady(evt, 'touchend');
        });
    };
    var onTouchmove = function () {
        return sugar_1.DomEvent.bind(editorApi.body(), 'touchmove', function (evt) {
            tapEvent.fireIfReady(evt, 'touchmove');
        });
    };
    var fireTouchstart = function (evt) {
        tapEvent.fireIfReady(evt, 'touchstart');
    };
    return {
        fireTouchstart: fireTouchstart,
        onTouchend: onTouchend,
        onTouchmove: onTouchmove
    };
};
exports.default = {
    monitor: monitor
};
