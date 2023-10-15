"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderGrid = void 0;
var katamari_1 = require("@ephox/katamari");
var renderGrid = function (spec, backstage) {
    return {
        dom: {
            tag: 'div',
            classes: ['tox-form__grid', "tox-form__grid--".concat(spec.columns, "col")]
        },
        components: katamari_1.Arr.map(spec.items, backstage.interpreter)
    };
};
exports.renderGrid = renderGrid;
