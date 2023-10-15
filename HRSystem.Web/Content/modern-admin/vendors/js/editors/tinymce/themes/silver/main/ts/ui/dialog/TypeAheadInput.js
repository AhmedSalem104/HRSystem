"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTypeahead = void 0;
var alloy_1 = require("@ephox/alloy");
var Autocomplete_1 = require("tinymce/themes/silver/ui/dialog/Autocomplete");
var ComposingConfigs_1 = require("../alien/ComposingConfigs");
var RepresentingConfigs_1 = require("../alien/RepresentingConfigs");
var Icons = require("../icons/Icons");
var renderTypeahead = function (spec, backstage) {
    return alloy_1.Container.sketch({
        dom: {
            tag: 'div'
        },
        components: [
            (0, Autocomplete_1.renderAutocomplete)(spec, backstage),
            alloy_1.Button.sketch({
                dom: {
                    tag: 'button',
                    innerHtml: Icons.get(spec.icon, backstage.shared.providers.icons)
                }
            })
        ],
        containerBehaviours: alloy_1.Behaviour.derive([
            ComposingConfigs_1.ComposingConfigs.self(),
            RepresentingConfigs_1.RepresentingConfigs.memory('NOT IMPLEMENTED')
        ])
    });
};
exports.renderTypeahead = renderTypeahead;
