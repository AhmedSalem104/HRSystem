"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sketch = exports.makeItems = void 0;
var SizeSlider_1 = require("./SizeSlider");
var ToolbarWidgets = require("./ToolbarWidgets");
var FontSizes_1 = require("../util/FontSizes");
var UiDomFactory = require("../util/UiDomFactory");
var sizes = FontSizes_1.default.candidates();
var makeSlider = function (spec) {
    return SizeSlider_1.default.sketch({
        onChange: spec.onChange,
        sizes: sizes,
        category: 'font',
        getInitialValue: spec.getInitialValue
    });
};
var makeItems = function (spec) {
    return [
        UiDomFactory.spec('<span class="${prefix}-toolbar-button ${prefix}-icon-small-font ${prefix}-icon"></span>'),
        makeSlider(spec),
        UiDomFactory.spec('<span class="${prefix}-toolbar-button ${prefix}-icon-large-font ${prefix}-icon"></span>')
    ];
};
exports.makeItems = makeItems;
var sketch = function (realm, editor) {
    var spec = {
        onChange: function (value) {
            FontSizes_1.default.apply(editor, value);
        },
        getInitialValue: function () {
            return FontSizes_1.default.get(editor);
        }
    };
    return ToolbarWidgets.button(realm, 'font-size', function () {
        return makeItems(spec);
    }, editor);
};
exports.sketch = sketch;
