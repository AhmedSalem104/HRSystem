"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var Styles_1 = require("../style/Styles");
var READ_ONLY_MODE_CLASS = katamari_1.Fun.constant(Styles_1.default.resolve('readonly-mode'));
var EDIT_MODE_CLASS = katamari_1.Fun.constant(Styles_1.default.resolve('edit-mode'));
function default_1(spec) {
    var root = alloy_1.GuiFactory.build(alloy_1.Container.sketch({
        dom: {
            classes: [Styles_1.default.resolve('outer-container')].concat(spec.classes)
        },
        containerBehaviours: alloy_1.Behaviour.derive([
            alloy_1.Swapping.config({
                alpha: READ_ONLY_MODE_CLASS(),
                omega: EDIT_MODE_CLASS()
            })
        ])
    }));
    return alloy_1.Gui.takeover(root);
}
exports.default = default_1;
