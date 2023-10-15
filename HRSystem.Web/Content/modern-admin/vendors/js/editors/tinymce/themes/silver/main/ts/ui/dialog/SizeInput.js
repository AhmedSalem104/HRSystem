"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderSizeInput = void 0;
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var FormEvents_1 = require("tinymce/themes/silver/ui/general/FormEvents");
var Icons = require("../icons/Icons");
var SizeInputModel_1 = require("../sizeinput/SizeInputModel");
var DisablingConfigs_1 = require("../alien/DisablingConfigs");
var renderSizeInput = function (spec, providersBackstage) {
    var converter = SizeInputModel_1.noSizeConversion;
    var ratioEvent = katamari_1.Id.generate('ratio-event');
    var pLock = alloy_1.FormCoupledInputs.parts().lock({
        dom: {
            tag: 'button',
            classes: ['tox-lock', 'tox-button', 'tox-button--naked', 'tox-button--icon'],
            attributes: {
                title: providersBackstage.translate(spec.label.getOr('Constrain proportions'))
            }
        },
        components: [
            {
                dom: {
                    tag: 'span',
                    classes: ['tox-icon', 'tox-lock-icon__lock'],
                    innerHtml: Icons.get('lock', providersBackstage.icons)
                }
            },
            {
                dom: {
                    tag: 'span',
                    classes: ['tox-icon', 'tox-lock-icon__unlock'],
                    innerHtml: Icons.get('unlock', providersBackstage.icons)
                }
            }
        ],
        buttonBehaviours: alloy_1.Behaviour.derive([
            DisablingConfigs_1.DisablingConfigs.button(spec.disabled),
            alloy_1.Tabstopping.config({})
        ])
    });
    var formGroup = function (components) {
        return {
            dom: {
                tag: 'div',
                classes: ['tox-form__group']
            },
            components: components
        };
    };
    var getFieldPart = function (isField1) { return alloy_1.FormField.parts().field({
        factory: alloy_1.Input,
        inputClasses: ['tox-textfield'],
        inputBehaviours: alloy_1.Behaviour.derive([
            alloy_1.Disabling.config({ disabled: spec.disabled }),
            alloy_1.Tabstopping.config({}),
            alloy_1.AddEventsBehaviour.config('size-input-events', [
                alloy_1.AlloyEvents.run(alloy_1.NativeEvents.focusin(), function (component, simulatedEvent) {
                    alloy_1.AlloyTriggers.emitWith(component, ratioEvent, { isField1: isField1 });
                }),
                alloy_1.AlloyEvents.run(alloy_1.NativeEvents.change(), function (component, simulatedEvent) {
                    alloy_1.AlloyTriggers.emitWith(component, FormEvents_1.formChangeEvent, { name: spec.name });
                })
            ])
        ]),
        selectOnFocus: false
    }); };
    var getLabel = function (label) {
        return {
            dom: {
                tag: 'label',
                classes: ['tox-label'],
                innerHtml: providersBackstage.translate(label)
            }
        };
    };
    var widthField = alloy_1.FormCoupledInputs.parts().field1(formGroup([alloy_1.FormField.parts().label(getLabel('Width')), getFieldPart(true)]));
    var heightField = alloy_1.FormCoupledInputs.parts().field2(formGroup([alloy_1.FormField.parts().label(getLabel('Height')), getFieldPart(false)]));
    return alloy_1.FormCoupledInputs.sketch({
        dom: {
            tag: 'div',
            classes: ['tox-form__group']
        },
        components: [
            {
                dom: {
                    tag: 'div',
                    classes: ['tox-form__controls-h-stack']
                },
                components: [
                    widthField,
                    heightField,
                    formGroup([
                        getLabel('&nbsp;'),
                        pLock
                    ])
                ]
            }
        ],
        field1Name: 'width',
        field2Name: 'height',
        locked: true,
        markers: {
            lockClass: 'tox-locked'
        },
        onLockedChange: function (current, other, lock) {
            (0, SizeInputModel_1.parseSize)(alloy_1.Representing.getValue(current)).each(function (size) {
                converter(size).each(function (newSize) {
                    alloy_1.Representing.setValue(other, (0, SizeInputModel_1.formatSize)(newSize));
                });
            });
        },
        coupledFieldBehaviours: alloy_1.Behaviour.derive([
            alloy_1.Disabling.config({
                disabled: spec.disabled,
                onDisabled: function (comp) {
                    alloy_1.FormCoupledInputs.getField1(comp).bind(alloy_1.FormField.getField).each(alloy_1.Disabling.disable);
                    alloy_1.FormCoupledInputs.getField2(comp).bind(alloy_1.FormField.getField).each(alloy_1.Disabling.disable);
                    alloy_1.FormCoupledInputs.getLock(comp).each(alloy_1.Disabling.disable);
                },
                onEnabled: function (comp) {
                    alloy_1.FormCoupledInputs.getField1(comp).bind(alloy_1.FormField.getField).each(alloy_1.Disabling.enable);
                    alloy_1.FormCoupledInputs.getField2(comp).bind(alloy_1.FormField.getField).each(alloy_1.Disabling.enable);
                    alloy_1.FormCoupledInputs.getLock(comp).each(alloy_1.Disabling.enable);
                }
            }),
            alloy_1.AddEventsBehaviour.config('size-input-events2', [
                alloy_1.AlloyEvents.run(ratioEvent, function (component, simulatedEvent) {
                    var isField1 = simulatedEvent.event().isField1();
                    var optCurrent = isField1 ? alloy_1.FormCoupledInputs.getField1(component) : alloy_1.FormCoupledInputs.getField2(component);
                    var optOther = isField1 ? alloy_1.FormCoupledInputs.getField2(component) : alloy_1.FormCoupledInputs.getField1(component);
                    var value1 = optCurrent.map(alloy_1.Representing.getValue).getOr('');
                    var value2 = optOther.map(alloy_1.Representing.getValue).getOr('');
                    converter = (0, SizeInputModel_1.makeRatioConverter)(value1, value2);
                })
            ])
        ])
    });
};
exports.renderSizeInput = renderSizeInput;
