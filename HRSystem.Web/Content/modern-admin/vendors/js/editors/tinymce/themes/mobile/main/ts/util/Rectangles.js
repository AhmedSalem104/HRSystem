"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var COLLAPSED_WIDTH = 2;
var collapsedRect = function (rect) {
    return {
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        width: katamari_1.Fun.constant(COLLAPSED_WIDTH),
        height: rect.height
    };
};
var toRect = function (rawRect) {
    return {
        left: katamari_1.Fun.constant(rawRect.left),
        top: katamari_1.Fun.constant(rawRect.top),
        right: katamari_1.Fun.constant(rawRect.right),
        bottom: katamari_1.Fun.constant(rawRect.bottom),
        width: katamari_1.Fun.constant(rawRect.width),
        height: katamari_1.Fun.constant(rawRect.height)
    };
};
var getRectsFromRange = function (range) {
    if (!range.collapsed) {
        return katamari_1.Arr.map(range.getClientRects(), toRect);
    }
    else {
        var start_1 = sugar_1.Element.fromDom(range.startContainer);
        return sugar_1.Traverse.parent(start_1).bind(function (parent) {
            var selection = sugar_1.Selection.exact(start_1, range.startOffset, parent, sugar_1.Awareness.getEnd(parent));
            var optRect = sugar_1.WindowSelection.getFirstRect(range.startContainer.ownerDocument.defaultView, selection);
            return optRect.map(collapsedRect).map(katamari_1.Arr.pure);
        }).getOr([]);
    }
};
var getRectangles = function (cWin) {
    var sel = cWin.getSelection();
    return sel !== undefined && sel.rangeCount > 0 ? getRectsFromRange(sel.getRangeAt(0)) : [];
};
exports.default = {
    getRectangles: getRectangles
};
