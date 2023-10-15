"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderColorPicker = void 0;
var acid_1 = require("@ephox/acid");
var alloy_1 = require("@ephox/alloy");
var dom_globals_1 = require("@ephox/dom-globals");
var katamari_1 = require("@ephox/katamari");
var ComposingConfigs_1 = require("../alien/ComposingConfigs");
var FormEvents_1 = require("../general/FormEvents");
var english = {
    'colorcustom.rgb.red.label': 'R',
    'colorcustom.rgb.red.description': 'Red component',
    'colorcustom.rgb.green.label': 'G',
    'colorcustom.rgb.green.description': 'Green component',
    'colorcustom.rgb.blue.label': 'B',
    'colorcustom.rgb.blue.description': 'Blue component',
    'colorcustom.rgb.hex.label': '#',
    'colorcustom.rgb.hex.description': 'Hex color code',
    'colorcustom.rgb.range': 'Range 0 to 255',
    'colorcustom.sb.saturation': 'Saturation',
    'colorcustom.sb.brightness': 'Brightness',
    'colorcustom.sb.picker': 'Saturation and Brightness Picker',
    'colorcustom.sb.palette': 'Saturation and Brightness Palette',
    'colorcustom.sb.instructions': 'Use arrow keys to select saturation and brightness, on x and y axes',
    'colorcustom.hue.hue': 'Hue',
    'colorcustom.hue.slider': 'Hue Slider',
    'colorcustom.hue.palette': 'Hue Palette',
    'colorcustom.hue.instructions': 'Use arrow keys to select a hue',
    'aria.color.picker': 'Color Picker',
    'aria.input.invalid': 'Invalid input'
};
var getEnglishText = function (key) {
    return english[key];
};
var translate = function (key) {
    return getEnglishText(key);
};
var renderColorPicker = function (spec) {
    var getClass = function (key) { return 'tox-' + key; };
    var colourPickerFactory = acid_1.ColourPicker.makeFactory(translate, getClass);
    var onValidHex = function (form) {
        alloy_1.AlloyTriggers.emitWith(form, FormEvents_1.formActionEvent, { name: 'hex-valid', value: true });
    };
    var onInvalidHex = function (form) {
        alloy_1.AlloyTriggers.emitWith(form, FormEvents_1.formActionEvent, { name: 'hex-valid', value: false });
    };
    var memPicker = alloy_1.Memento.record(colourPickerFactory.sketch({
        dom: {
            tag: 'div',
            classes: [getClass('color-picker-container')],
            attributes: {
                role: 'presentation'
            }
        },
        onValidHex: onValidHex,
        onInvalidHex: onInvalidHex
    }));
    return {
        dom: {
            tag: 'div'
        },
        components: [
            memPicker.asSpec()
        ],
        behaviours: alloy_1.Behaviour.derive([
            alloy_1.Representing.config({
                store: {
                    mode: 'manual',
                    getValue: function (comp) {
                        var picker = memPicker.get(comp);
                        var optRgbForm = alloy_1.Composing.getCurrent(picker);
                        var optHex = optRgbForm.bind(function (rgbForm) {
                            var formValues = alloy_1.Representing.getValue(rgbForm);
                            return formValues.hex;
                        });
                        return optHex.map(function (hex) { return '#' + hex; }).getOr('');
                    },
                    setValue: function (comp, newValue) {
                        var pattern = /^#([a-fA-F0-9]{3}(?:[a-fA-F0-9]{3})?)/;
                        var m = pattern.exec(newValue);
                        var picker = memPicker.get(comp);
                        var optRgbForm = alloy_1.Composing.getCurrent(picker);
                        optRgbForm.fold(function () {
                            dom_globals_1.console.log('Can not find form');
                        }, function (rgbForm) {
                            alloy_1.Representing.setValue(rgbForm, {
                                hex: katamari_1.Option.from(m[1]).getOr('')
                            });
                            alloy_1.Form.getField(rgbForm, 'hex').each(function (hexField) {
                                alloy_1.AlloyTriggers.emit(hexField, alloy_1.NativeEvents.input());
                            });
                        });
                    }
                }
            }),
            ComposingConfigs_1.ComposingConfigs.self()
        ])
    };
};
exports.renderColorPicker = renderColorPicker;
