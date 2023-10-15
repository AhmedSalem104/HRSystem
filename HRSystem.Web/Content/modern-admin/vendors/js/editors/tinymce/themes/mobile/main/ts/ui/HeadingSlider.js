"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sketch = void 0;
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var Buttons_1 = require("../ui/Buttons");
var SizeSlider_1 = require("./SizeSlider");
var ToolbarWidgets = require("./ToolbarWidgets");
var headings = ['p', 'h3', 'h2', 'h1'];
var makeSlider = function (spec) {
    return SizeSlider_1.default.sketch({
        category: 'heading',
        sizes: headings,
        onChange: spec.onChange,
        getInitialValue: spec.getInitialValue
    });
};
var sketch = function (realm, editor) {
    var spec = {
        onChange: function (value) {
            editor.execCommand('FormatBlock', null, headings[value].toLowerCase());
        },
        getInitialValue: function () {
            var node = editor.selection.getStart();
            var elem = sugar_1.Element.fromDom(node);
            var heading = sugar_1.PredicateFind.closest(elem, function (e) {
                var nodeName = sugar_1.Node.name(e);
                return katamari_1.Arr.contains(headings, nodeName);
            }, function (e) {
                return sugar_1.Compare.eq(e, sugar_1.Element.fromDom(editor.getBody()));
            });
            return heading.bind(function (elm) { return katamari_1.Arr.indexOf(headings, sugar_1.Node.name(elm)); }).getOr(0);
        }
    };
    return ToolbarWidgets.button(realm, 'heading', function () {
        return [
            Buttons_1.default.getToolbarIconButton('small-heading', editor),
            makeSlider(spec),
            Buttons_1.default.getToolbarIconButton('large-heading', editor)
        ];
    }, editor);
};
exports.sketch = sketch;
