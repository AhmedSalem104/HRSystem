"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rangeFromPoints = exports.point = void 0;
var dom_globals_1 = require("@ephox/dom-globals");
var point = function (element, offset) {
    return {
        element: element,
        offset: offset
    };
};
exports.point = point;
var rangeFromPoints = function (startSpot, endSpot) {
    var rng = dom_globals_1.document.createRange();
    rng.setStart(startSpot.element, startSpot.offset);
    rng.setEnd(endSpot.element, endSpot.offset);
    return rng;
};
exports.rangeFromPoints = rangeFromPoints;
