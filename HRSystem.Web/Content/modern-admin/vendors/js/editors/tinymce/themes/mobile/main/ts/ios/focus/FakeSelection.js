"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var Styles_1 = require("../../style/Styles");
var Rectangles_1 = require("../../util/Rectangles");
var ResumeEditing_1 = require("./ResumeEditing");
function default_1(win, frame) {
    var doc = win.document;
    var container = sugar_1.Element.fromTag('div');
    sugar_1.Class.add(container, Styles_1.default.resolve('unfocused-selections'));
    sugar_1.Insert.append(sugar_1.Element.fromDom(doc.documentElement), container);
    var onTouch = sugar_1.DomEvent.bind(container, 'touchstart', function (event) {
        event.prevent();
        ResumeEditing_1.default.resume(win, frame);
        clear();
    });
    var make = function (rectangle) {
        var span = sugar_1.Element.fromTag('span');
        sugar_1.Classes.add(span, [Styles_1.default.resolve('layer-editor'), Styles_1.default.resolve('unfocused-selection')]);
        sugar_1.Css.setAll(span, {
            left: rectangle.left() + 'px',
            top: rectangle.top() + 'px',
            width: rectangle.width() + 'px',
            height: rectangle.height() + 'px'
        });
        return span;
    };
    var update = function () {
        clear();
        var rectangles = Rectangles_1.default.getRectangles(win);
        var spans = katamari_1.Arr.map(rectangles, make);
        sugar_1.InsertAll.append(container, spans);
    };
    var clear = function () {
        sugar_1.Remove.empty(container);
    };
    var destroy = function () {
        onTouch.unbind();
        sugar_1.Remove.remove(container);
    };
    var isActive = function () {
        return sugar_1.Traverse.children(container).length > 0;
    };
    return {
        update: update,
        isActive: isActive,
        destroy: destroy,
        clear: clear
    };
}
exports.default = default_1;
