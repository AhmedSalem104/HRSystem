"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderPanel = void 0;
var katamari_1 = require("@ephox/katamari");
var renderPanel = function (spec, backstage) {
    return {
        dom: {
            tag: 'div',
            classes: spec.classes
        },
        components: katamari_1.Arr.map(spec.items, backstage.shared.interpreter)
    };
};
exports.renderPanel = renderPanel;
