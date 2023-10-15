"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInlineBounds = exports.getIframeBounds = exports.getDistractionFreeBounds = void 0;
var alloy_1 = require("@ephox/alloy");
var dom_globals_1 = require("@ephox/dom-globals");
var sugar_1 = require("@ephox/sugar");
var getHorizontalBounds = function (editor, scroll, contentAreaBox) {
    var x = Math.max(scroll.left(), contentAreaBox.x());
    var contentBoxWidth = contentAreaBox.right() - x;
    var maxViewportWidth = dom_globals_1.window.innerWidth - (x - scroll.left());
    var width = Math.min(contentBoxWidth, maxViewportWidth);
    return { x: x, width: width };
};
var getIframeBounds = function (editor, scroll, contentAreaBox) {
    var _a = getHorizontalBounds(editor, scroll, contentAreaBox), x = _a.x, width = _a.width;
    var containerBox = alloy_1.Boxes.box(sugar_1.Element.fromDom(editor.getContainer()));
    var y = Math.max(scroll.top(), contentAreaBox.y());
    var contentBoxHeight = containerBox.bottom() - y;
    var maxViewportHeight = dom_globals_1.window.innerHeight - (y - scroll.top());
    var height = Math.min(contentBoxHeight, maxViewportHeight);
    return alloy_1.Boxes.bounds(x, y, width, height);
};
exports.getIframeBounds = getIframeBounds;
var getInlineBounds = function (editor, scroll, contentAreaBox) {
    var _a = getHorizontalBounds(editor, scroll, contentAreaBox), x = _a.x, width = _a.width;
    var containerBox = alloy_1.Boxes.box(sugar_1.Element.fromDom(editor.getContainer()));
    var windowHeight = dom_globals_1.window.innerHeight;
    var scrollTop = scroll.top();
    if (containerBox.y() >= contentAreaBox.bottom()) {
        var bottom = Math.min(windowHeight + scrollTop, containerBox.y());
        var height = bottom - scrollTop;
        return alloy_1.Boxes.bounds(x, scrollTop, width, height);
    }
    else {
        var y = Math.max(scrollTop, containerBox.bottom());
        var height = windowHeight - (y - scrollTop);
        return alloy_1.Boxes.bounds(x, y, width, height);
    }
};
exports.getInlineBounds = getInlineBounds;
var getDistractionFreeBounds = function (editor, scroll, contentAreaBox) {
    var _a = getHorizontalBounds(editor, scroll, contentAreaBox), x = _a.x, width = _a.width;
    return alloy_1.Boxes.bounds(x, scroll.top(), width, dom_globals_1.window.innerHeight);
};
exports.getDistractionFreeBounds = getDistractionFreeBounds;
