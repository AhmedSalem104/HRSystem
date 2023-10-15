"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var matchTargetWith = function (elem, toolbars) {
    return katamari_1.Options.findMap(toolbars, function (toolbarApi) {
        return toolbarApi.predicate(elem.dom()) ? katamari_1.Option.some({ toolbarApi: toolbarApi, elem: elem }) : katamari_1.Option.none();
    });
};
var lookup = function (scopes, editor) {
    var isRoot = function (elem) { return elem.dom() === editor.getBody(); };
    var startNode = sugar_1.Element.fromDom(editor.selection.getNode());
    return matchTargetWith(startNode, scopes.inNodeScope).orThunk(function () {
        return matchTargetWith(startNode, scopes.inEditorScope).orThunk(function () {
            return sugar_1.TransformFind.ancestor(startNode, function (elem) {
                return matchTargetWith(elem, scopes.inNodeScope);
            }, isRoot);
        });
    });
};
exports.default = {
    lookup: lookup
};
