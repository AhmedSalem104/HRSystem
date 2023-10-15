"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resize = exports.getDimensions = exports.calcCappedSize = exports.ResizeTypes = void 0;
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var Settings_1 = require("../../api/Settings");
var Events_1 = require("../../api/Events");
var Utils_1 = require("./Utils");
var ResizeTypes;
(function (ResizeTypes) {
    ResizeTypes[ResizeTypes["None"] = 0] = "None";
    ResizeTypes[ResizeTypes["Both"] = 1] = "Both";
    ResizeTypes[ResizeTypes["Vertical"] = 2] = "Vertical";
})(ResizeTypes = exports.ResizeTypes || (exports.ResizeTypes = {}));
var calcCappedSize = function (originalSize, delta, minSize, maxSize) {
    var newSize = originalSize + delta;
    var minOverride = minSize.filter(function (min) { return newSize < min; });
    var maxOverride = maxSize.filter(function (max) { return newSize > max; });
    return minOverride.or(maxOverride).getOr(newSize);
};
exports.calcCappedSize = calcCappedSize;
var getDimensions = function (editor, deltas, resizeType, originalHeight, originalWidth) {
    var dimensions = {};
    dimensions.height = (0, exports.calcCappedSize)(originalHeight, deltas.top(), (0, Settings_1.getMinHeightSetting)(editor), (0, Settings_1.getMaxHeightSetting)(editor));
    if (resizeType === ResizeTypes.Both) {
        dimensions.width = (0, exports.calcCappedSize)(originalWidth, deltas.left(), (0, Settings_1.getMinWidthSetting)(editor), (0, Settings_1.getMaxWidthSetting)(editor));
    }
    return dimensions;
};
exports.getDimensions = getDimensions;
var resize = function (editor, deltas, resizeType) {
    var container = sugar_1.Element.fromDom(editor.getContainer());
    var dimensions = (0, exports.getDimensions)(editor, deltas, resizeType, sugar_1.Height.get(container), sugar_1.Width.get(container));
    katamari_1.Obj.each(dimensions, function (val, dim) { return sugar_1.Css.set(container, dim, Utils_1.default.numToPx(val)); });
    Events_1.default.fireResizeEditor(editor);
};
exports.resize = resize;
