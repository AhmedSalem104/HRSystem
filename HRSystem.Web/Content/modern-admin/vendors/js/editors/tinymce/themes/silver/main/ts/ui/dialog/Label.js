"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderLabel = void 0;
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var ComposingConfigs_1 = require("../alien/ComposingConfigs");
var RepresentingConfigs_1 = require("../alien/RepresentingConfigs");
var renderLabel = function (spec, backstageShared) {
    var label = {
        dom: {
            tag: 'label',
            innerHtml: backstageShared.providers.translate(spec.label),
            classes: ['tox-label']
        }
    };
    var comps = katamari_1.Arr.map(spec.items, backstageShared.interpreter);
    return {
        dom: {
            tag: 'div',
            classes: ['tox-form__group']
        },
        components: [
            label
        ].concat(comps),
        behaviours: alloy_1.Behaviour.derive([
            ComposingConfigs_1.ComposingConfigs.self(),
            alloy_1.Replacing.config({}),
            RepresentingConfigs_1.RepresentingConfigs.domHtml(katamari_1.Option.none()),
            alloy_1.Keying.config({
                mode: 'acyclic'
            }),
        ])
    };
};
exports.renderLabel = renderLabel;
