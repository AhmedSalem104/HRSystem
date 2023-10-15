"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderCustomEditor = void 0;
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var ComposingConfigs_1 = require("../alien/ComposingConfigs");
var Resource_1 = require("tinymce/core/api/Resource");
var isOldCustomEditor = function (spec) { return Object.prototype.hasOwnProperty.call(spec, 'init'); };
var renderCustomEditor = function (spec) {
    var editorApi = (0, katamari_1.Cell)(katamari_1.Option.none());
    var memReplaced = alloy_1.Memento.record({
        dom: {
            tag: spec.tag
        }
    });
    var initialValue = (0, katamari_1.Cell)(katamari_1.Option.none());
    return {
        dom: {
            tag: 'div',
            classes: ['tox-custom-editor']
        },
        behaviours: alloy_1.Behaviour.derive([
            alloy_1.AddEventsBehaviour.config('editor-foo-events', [
                alloy_1.AlloyEvents.runOnAttached(function (component) {
                    memReplaced.getOpt(component).each(function (ta) {
                        (isOldCustomEditor(spec)
                            ? spec.init(ta.element().dom())
                            : Resource_1.default.load(spec.scriptId, spec.scriptUrl).then(function (init) { return init(ta.element().dom(), spec.settings); })).then(function (ea) {
                            initialValue.get().each(function (cvalue) {
                                ea.setValue(cvalue);
                            });
                            initialValue.set(katamari_1.Option.none());
                            editorApi.set(katamari_1.Option.some(ea));
                        });
                    });
                })
            ]),
            alloy_1.Representing.config({
                store: {
                    mode: 'manual',
                    getValue: function () { return editorApi.get().fold(function () { return initialValue.get().getOr(''); }, function (ed) { return ed.getValue(); }); },
                    setValue: function (component, value) {
                        editorApi.get().fold(function () {
                            initialValue.set(katamari_1.Option.some(value));
                        }, function (ed) { return ed.setValue(value); });
                    }
                }
            }),
            ComposingConfigs_1.ComposingConfigs.self()
        ]),
        components: [memReplaced.asSpec()]
    };
};
exports.renderCustomEditor = renderCustomEditor;
