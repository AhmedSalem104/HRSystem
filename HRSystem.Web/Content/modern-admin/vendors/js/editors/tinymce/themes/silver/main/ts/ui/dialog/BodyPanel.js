"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderBodyPanel = void 0;
var alloy_1 = require("@ephox/alloy");
var dom_globals_1 = require("@ephox/dom-globals");
var katamari_1 = require("@ephox/katamari");
var ComposingConfigs_1 = require("../alien/ComposingConfigs");
var RepresentingConfigs_1 = require("../alien/RepresentingConfigs");
var FormValues = require("../general/FormValues");
var NavigableObject_1 = require("../general/NavigableObject");
var UiFactory_1 = require("../general/UiFactory");
var renderBodyPanel = function (spec, backstage) {
    var memForm = alloy_1.Memento.record(alloy_1.Form.sketch(function (parts) {
        return {
            dom: {
                tag: 'div',
                classes: ['tox-form'].concat(spec.classes)
            },
            components: katamari_1.Arr.map(spec.items, function (item) {
                return (0, UiFactory_1.interpretInForm)(parts, item, backstage);
            })
        };
    }));
    return {
        dom: {
            tag: 'div',
            classes: ['tox-dialog__body']
        },
        components: [
            {
                dom: {
                    tag: 'div',
                    classes: ['tox-dialog__body-content']
                },
                components: [
                    memForm.asSpec()
                ]
            }
        ],
        behaviours: alloy_1.Behaviour.derive([
            alloy_1.Keying.config({
                mode: 'acyclic',
                useTabstopAt: katamari_1.Fun.not(NavigableObject_1.default.isPseudoStop)
            }),
            ComposingConfigs_1.ComposingConfigs.memento(memForm),
            RepresentingConfigs_1.RepresentingConfigs.memento(memForm, {
                postprocess: function (formValue) { return FormValues.toValidValues(formValue).fold(function (err) {
                    dom_globals_1.console.error(err);
                    return {};
                }, function (vals) { return vals; }); }
            })
        ])
    };
};
exports.renderBodyPanel = renderBodyPanel;
