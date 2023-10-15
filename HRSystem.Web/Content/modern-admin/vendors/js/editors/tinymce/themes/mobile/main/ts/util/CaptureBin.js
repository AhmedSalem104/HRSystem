"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sugar_1 = require("@ephox/sugar");
var input = function (parent, operation) {
    var input = sugar_1.Element.fromTag('input');
    sugar_1.Css.setAll(input, {
        opacity: '0',
        position: 'absolute',
        top: '-1000px',
        left: '-1000px'
    });
    sugar_1.Insert.append(parent, input);
    sugar_1.Focus.focus(input);
    operation(input);
    sugar_1.Remove.remove(input);
};
exports.default = {
    input: input
};
