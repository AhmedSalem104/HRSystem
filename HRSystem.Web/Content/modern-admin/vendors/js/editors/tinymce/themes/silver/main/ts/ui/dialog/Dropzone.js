"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderDropZone = void 0;
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var ComposingConfigs_1 = require("../alien/ComposingConfigs");
var FieldLabeller_1 = require("../alien/FieldLabeller");
var RepresentingConfigs_1 = require("../alien/RepresentingConfigs");
var FormEvents_1 = require("../general/FormEvents");
var extensionsAccepted = '.jpg,.jpeg,.png,.gif';
var filterByExtension = function (files) {
    var re = new RegExp('(' + extensionsAccepted.split(/\s*,\s*/).join('|') + ')$', 'i');
    return katamari_1.Arr.filter(katamari_1.Arr.from(files), function (file) { return re.test(file.name); });
};
var renderDropZone = function (spec, providersBackstage) {
    var stopper = function (_, se) {
        se.stop();
    };
    var sequence = function (actions) {
        return function (comp, se) {
            katamari_1.Arr.each(actions, function (a) {
                a(comp, se);
            });
        };
    };
    var onDrop = function (comp, se) {
        if (!alloy_1.Disabling.isDisabled(comp)) {
            var transferEvent = se.event().raw();
            handleFiles(comp, transferEvent.dataTransfer.files);
        }
    };
    var onSelect = function (component, simulatedEvent) {
        var files = simulatedEvent.event().raw().target.files;
        handleFiles(component, files);
    };
    var handleFiles = function (component, files) {
        alloy_1.Representing.setValue(component, filterByExtension(files));
        alloy_1.AlloyTriggers.emitWith(component, FormEvents_1.formChangeEvent, { name: spec.name });
    };
    var memInput = alloy_1.Memento.record({
        dom: {
            tag: 'input',
            attributes: {
                type: 'file',
                accept: 'image/*'
            },
            styles: {
                display: 'none'
            }
        },
        behaviours: alloy_1.Behaviour.derive([
            alloy_1.AddEventsBehaviour.config('input-file-events', [
                alloy_1.AlloyEvents.cutter(alloy_1.SystemEvents.tapOrClick())
            ])
        ])
    });
    var renderField = function (s) {
        return {
            uid: s.uid,
            dom: {
                tag: 'div',
                classes: ['tox-dropzone-container']
            },
            behaviours: alloy_1.Behaviour.derive([
                RepresentingConfigs_1.RepresentingConfigs.memory([]),
                ComposingConfigs_1.ComposingConfigs.self(),
                alloy_1.Disabling.config({}),
                alloy_1.Toggling.config({
                    toggleClass: 'dragenter',
                    toggleOnExecute: false
                }),
                alloy_1.AddEventsBehaviour.config('dropzone-events', [
                    alloy_1.AlloyEvents.run('dragenter', sequence([stopper, alloy_1.Toggling.toggle])),
                    alloy_1.AlloyEvents.run('dragleave', sequence([stopper, alloy_1.Toggling.toggle])),
                    alloy_1.AlloyEvents.run('dragover', stopper),
                    alloy_1.AlloyEvents.run('drop', sequence([stopper, onDrop])),
                    alloy_1.AlloyEvents.run(alloy_1.NativeEvents.change(), onSelect)
                ]),
            ]),
            components: [
                {
                    dom: {
                        tag: 'div',
                        classes: ['tox-dropzone'],
                        styles: {}
                    },
                    components: [
                        {
                            dom: {
                                tag: 'p',
                                innerHtml: providersBackstage.translate('Drop an image here')
                            }
                        },
                        alloy_1.Button.sketch({
                            dom: {
                                tag: 'button',
                                innerHtml: providersBackstage.translate('Browse for an image'),
                                styles: {
                                    position: 'relative'
                                },
                                classes: ['tox-button', 'tox-button--secondary']
                            },
                            components: [
                                memInput.asSpec()
                            ],
                            action: function (comp) {
                                var inputComp = memInput.get(comp);
                                inputComp.element().dom().click();
                            },
                            buttonBehaviours: alloy_1.Behaviour.derive([
                                alloy_1.Tabstopping.config({})
                            ])
                        })
                    ]
                }
            ]
        };
    };
    var pLabel = spec.label.map(function (label) { return (0, FieldLabeller_1.renderLabel)(label, providersBackstage); });
    var pField = alloy_1.FormField.parts().field({
        factory: { sketch: renderField }
    });
    return (0, FieldLabeller_1.renderFormFieldWith)(pLabel, pField, ['tox-form__group--stretched'], []);
};
exports.renderDropZone = renderDropZone;
