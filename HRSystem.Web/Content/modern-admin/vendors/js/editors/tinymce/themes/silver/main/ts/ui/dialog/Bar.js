"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderBar = void 0;
var katamari_1 = require("@ephox/katamari");
var renderBar = function (spec, backstage) {
    return {
        dom: {
            tag: 'div',
            classes: ['tox-bar', 'tox-form__controls-h-stack']
        },
        components: katamari_1.Arr.map(spec.items, backstage.interpreter)
    };
};
exports.renderBar = renderBar;
