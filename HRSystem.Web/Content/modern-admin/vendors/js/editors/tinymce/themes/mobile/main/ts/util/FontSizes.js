"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var candidates = ['9px', '10px', '11px', '12px', '14px', '16px', '18px', '20px', '24px', '32px', '36px'];
var defaultSize = 'medium';
var defaultIndex = 2;
var indexToSize = function (index) {
    return katamari_1.Option.from(candidates[index]);
};
var sizeToIndex = function (size) {
    return katamari_1.Arr.findIndex(candidates, function (v) {
        return v === size;
    });
};
var getRawOrComputed = function (isRoot, rawStart) {
    var optStart = sugar_1.Node.isElement(rawStart) ? katamari_1.Option.some(rawStart) : sugar_1.Traverse.parent(rawStart).filter(sugar_1.Node.isElement);
    return optStart.map(function (start) {
        var inline = sugar_1.PredicateFind.closest(start, function (elem) { return sugar_1.Css.getRaw(elem, 'font-size').isSome(); }, isRoot)
            .bind(function (elem) { return sugar_1.Css.getRaw(elem, 'font-size'); });
        return inline.getOrThunk(function () {
            return sugar_1.Css.get(start, 'font-size');
        });
    }).getOr('');
};
var getSize = function (editor) {
    var node = editor.selection.getStart();
    var elem = sugar_1.Element.fromDom(node);
    var root = sugar_1.Element.fromDom(editor.getBody());
    var isRoot = function (e) {
        return sugar_1.Compare.eq(root, e);
    };
    var elemSize = getRawOrComputed(isRoot, elem);
    return katamari_1.Arr.find(candidates, function (size) {
        return elemSize === size;
    }).getOr(defaultSize);
};
var applySize = function (editor, value) {
    var currentValue = getSize(editor);
    if (currentValue !== value) {
        editor.execCommand('fontSize', false, value);
    }
};
var get = function (editor) {
    var size = getSize(editor);
    return sizeToIndex(size).getOr(defaultIndex);
};
var apply = function (editor, index) {
    indexToSize(index).each(function (size) {
        applySize(editor, size);
    });
};
exports.default = {
    candidates: katamari_1.Fun.constant(candidates),
    get: get,
    apply: apply
};
