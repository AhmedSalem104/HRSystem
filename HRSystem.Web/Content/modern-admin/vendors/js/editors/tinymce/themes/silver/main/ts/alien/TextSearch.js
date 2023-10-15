"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repeatRight = exports.repeatLeft = void 0;
var dom_globals_1 = require("@ephox/dom-globals");
var katamari_1 = require("@ephox/katamari");
var TreeWalker_1 = require("tinymce/core/api/dom/TreeWalker");
var isText = function (node) { return node.nodeType === dom_globals_1.Node.TEXT_NODE; };
var outcome = katamari_1.Adt.generate([
    { aborted: [] },
    { edge: ['element'] },
    { success: ['info'] }
]);
var phase = katamari_1.Adt.generate([
    { abort: [] },
    { kontinue: [] },
    { finish: ['info'] }
]);
var repeat = function (dom, node, offset, process, walker, recent) {
    var terminate = function () {
        return recent.fold(outcome.aborted, outcome.edge);
    };
    var recurse = function () {
        var next = walker();
        if (next) {
            return repeat(dom, next, katamari_1.Option.none(), process, walker, katamari_1.Option.some(node));
        }
        else {
            return terminate();
        }
    };
    if (dom.isBlock(node)) {
        return terminate();
    }
    else if (!isText(node)) {
        return recurse();
    }
    else {
        var text = node.textContent;
        return process(phase, node, text, offset).fold(outcome.aborted, function () { return recurse(); }, outcome.success);
    }
};
var repeatLeft = function (dom, node, offset, process, rootNode) {
    var walker = new TreeWalker_1.default(node, rootNode || dom.getRoot());
    return repeat(dom, node, katamari_1.Option.some(offset), process, walker.prev, katamari_1.Option.none());
};
exports.repeatLeft = repeatLeft;
var repeatRight = function (dom, node, offset, process, rootNode) {
    var walker = new TreeWalker_1.default(node, rootNode || dom.getRoot());
    return repeat(dom, node, katamari_1.Option.some(offset), process, walker.next, katamari_1.Option.none());
};
exports.repeatRight = repeatRight;
