"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLeaf = exports.toLast = void 0;
var dom_globals_1 = require("@ephox/dom-globals");
var Spot = require("./Spot");
var isText = function (node) { return node.nodeType === dom_globals_1.Node.TEXT_NODE; };
var isElement = function (node) { return node.nodeType === dom_globals_1.Node.ELEMENT_NODE; };
var toLast = function (node) {
    if (isText(node)) {
        return Spot.point(node, node.data.length);
    }
    else {
        var children = node.childNodes;
        return children.length > 0 ? toLast(children[children.length - 1]) : Spot.point(node, children.length);
    }
};
exports.toLast = toLast;
var toLeaf = function (node, offset) {
    var children = node.childNodes;
    if (children.length > 0 && offset < children.length) {
        return toLeaf(children[offset], 0);
    }
    else if (children.length > 0 && isElement(node) && children.length === offset) {
        return toLast(children[children.length - 1]);
    }
    else {
        return Spot.point(node, offset);
    }
};
exports.toLeaf = toLeaf;
