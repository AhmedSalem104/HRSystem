"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderColorInput = void 0;
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var FieldLabeller_1 = require("../alien/FieldLabeller");
var ColorSwatch_1 = require("../core/color/ColorSwatch");
var Settings_1 = require("../core/color/Settings");
var PanelButton_1 = require("../general/PanelButton");
var FormEvents_1 = require("../general/FormEvents");
var colorInputChangeEvent = katamari_1.Id.generate('color-input-change');
var colorSwatchChangeEvent = katamari_1.Id.generate('color-swatch-change');
var colorPickerCancelEvent = katamari_1.Id.generate('color-picker-cancel');
var renderColorInput = function (spec, sharedBackstage, colorInputBackstage) {
    var pField = alloy_1.FormField.parts().field({
        factory: alloy_1.Input,
        inputClasses: ['tox-textfield'],
        onSetValue: function (c) { return alloy_1.Invalidating.run(c).get(function () { }); },
        inputBehaviours: alloy_1.Behaviour.derive([
            alloy_1.Tabstopping.config({}),
            alloy_1.Invalidating.config({
                invalidClass: 'tox-textbox-field-invalid',
                getRoot: function (comp) {
                    return sugar_1.Traverse.parent(comp.element());
                },
                notify: {
                    onValid: function (comp) {
                        var val = alloy_1.Representing.getValue(comp);
                        alloy_1.AlloyTriggers.emitWith(comp, colorInputChangeEvent, {
                            color: val
                        });
                    }
                },
                validator: {
                    validateOnLoad: false,
                    validate: function (input) {
                        var inputValue = alloy_1.Representing.getValue(input);
                        if (inputValue.length === 0) {
                            return katamari_1.Future.pure(katamari_1.Result.value(true));
                        }
                        else {
                            var span = sugar_1.Element.fromTag('span');
                            sugar_1.Css.set(span, 'background-color', inputValue);
                            var res = sugar_1.Css.getRaw(span, 'background-color').fold(function () { return katamari_1.Result.error('blah'); }, function (_) { return katamari_1.Result.value(inputValue); });
                            return katamari_1.Future.pure(res);
                        }
                    }
                }
            })
        ]),
        selectOnFocus: false
    });
    var pLabel = spec.label.map(function (label) { return (0, FieldLabeller_1.renderLabel)(label, sharedBackstage.providers); });
    var emitSwatchChange = function (colorBit, value) {
        alloy_1.AlloyTriggers.emitWith(colorBit, colorSwatchChangeEvent, {
            value: value
        });
    };
    var onItemAction = function (comp, value) {
        memColorButton.getOpt(comp).each(function (colorBit) {
            if (value === 'custom') {
                colorInputBackstage.colorPicker(function (valueOpt) {
                    valueOpt.fold(function () { return alloy_1.AlloyTriggers.emit(colorBit, colorPickerCancelEvent); }, function (value) {
                        emitSwatchChange(colorBit, value);
                        Settings_1.default.addColor(value);
                    });
                }, '#ffffff');
            }
            else if (value === 'remove') {
                emitSwatchChange(colorBit, '');
            }
            else {
                emitSwatchChange(colorBit, value);
            }
        });
    };
    var memColorButton = alloy_1.Memento.record((0, PanelButton_1.renderPanelButton)({
        dom: {
            tag: 'span',
            attributes: {
                'aria-label': sharedBackstage.providers.translate('Color swatch')
            }
        },
        layouts: katamari_1.Option.some({
            onRtl: function () { return [alloy_1.Layout.southeast]; },
            onLtr: function () { return [alloy_1.Layout.southwest]; }
        }),
        components: [],
        fetch: ColorSwatch_1.default.getFetch(colorInputBackstage.getColors(), colorInputBackstage.hasCustomColors()),
        columns: colorInputBackstage.getColorCols(),
        presets: 'color',
        onItemAction: onItemAction
    }, sharedBackstage));
    return alloy_1.FormField.sketch({
        dom: {
            tag: 'div',
            classes: ['tox-form__group']
        },
        components: pLabel.toArray().concat([
            {
                dom: {
                    tag: 'div',
                    classes: ['tox-color-input']
                },
                components: [
                    pField,
                    memColorButton.asSpec()
                ]
            }
        ]),
        fieldBehaviours: alloy_1.Behaviour.derive([
            alloy_1.AddEventsBehaviour.config('form-field-events', [
                alloy_1.AlloyEvents.run(colorInputChangeEvent, function (comp, se) {
                    memColorButton.getOpt(comp).each(function (colorButton) {
                        sugar_1.Css.set(colorButton.element(), 'background-color', se.event().color());
                    });
                    alloy_1.AlloyTriggers.emitWith(comp, FormEvents_1.formChangeEvent, { name: spec.name });
                }),
                alloy_1.AlloyEvents.run(colorSwatchChangeEvent, function (comp, se) {
                    alloy_1.FormField.getField(comp).each(function (field) {
                        alloy_1.Representing.setValue(field, se.event().value());
                        alloy_1.Composing.getCurrent(comp).each(alloy_1.Focusing.focus);
                    });
                }),
                alloy_1.AlloyEvents.run(colorPickerCancelEvent, function (comp, se) {
                    alloy_1.FormField.getField(comp).each(function (field) {
                        alloy_1.Composing.getCurrent(comp).each(alloy_1.Focusing.focus);
                    });
                })
            ])
        ])
    });
};
exports.renderColorInput = renderColorInput;
