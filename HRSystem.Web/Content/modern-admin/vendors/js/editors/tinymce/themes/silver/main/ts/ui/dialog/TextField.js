"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTextarea = exports.renderInput = void 0;
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var FieldLabeller_1 = require("tinymce/themes/silver/ui/alien/FieldLabeller");
var FormEvents_1 = require("../general/FormEvents");
var renderTextField = function (spec, providersBackstage) {
    var pLabel = spec.label.map(function (label) { return (0, FieldLabeller_1.renderLabel)(label, providersBackstage); });
    var baseInputBehaviours = [
        alloy_1.Disabling.config({ disabled: spec.disabled }),
        alloy_1.Keying.config({
            mode: 'execution',
            useEnter: spec.multiline !== true,
            useControlEnter: spec.multiline === true,
            execute: function (comp) {
                alloy_1.AlloyTriggers.emit(comp, FormEvents_1.formSubmitEvent);
                return katamari_1.Option.some(true);
            },
        }),
        alloy_1.AddEventsBehaviour.config('textfield-change', [
            alloy_1.AlloyEvents.run(alloy_1.NativeEvents.input(), function (component, _) {
                alloy_1.AlloyTriggers.emitWith(component, FormEvents_1.formChangeEvent, { name: spec.name });
            }),
            alloy_1.AlloyEvents.run(alloy_1.SystemEvents.postPaste(), function (component, _) {
                alloy_1.AlloyTriggers.emitWith(component, FormEvents_1.formChangeEvent, { name: spec.name });
            })
        ]),
        alloy_1.Tabstopping.config({})
    ];
    var validatingBehaviours = spec.validation.map(function (vl) {
        return alloy_1.Invalidating.config({
            getRoot: function (input) {
                return sugar_1.Traverse.parent(input.element());
            },
            invalidClass: 'tox-invalid',
            validator: {
                validate: function (input) {
                    var v = alloy_1.Representing.getValue(input);
                    var result = vl.validator(v);
                    return katamari_1.Future.pure(result === true ? katamari_1.Result.value(v) : katamari_1.Result.error(result));
                },
                validateOnLoad: vl.validateOnLoad
            }
        });
    }).toArray();
    var placeholder = spec.placeholder.fold(katamari_1.Fun.constant({}), function (p) { return ({ placeholder: providersBackstage.translate(p) }); });
    var inputAttributes = __assign({}, placeholder);
    var pField = alloy_1.FormField.parts().field({
        tag: spec.multiline === true ? 'textarea' : 'input',
        inputAttributes: inputAttributes,
        inputClasses: [spec.classname],
        inputBehaviours: alloy_1.Behaviour.derive(katamari_1.Arr.flatten([
            baseInputBehaviours,
            validatingBehaviours
        ])),
        selectOnFocus: false,
        factory: alloy_1.Input
    });
    var extraClasses = spec.flex ? ['tox-form__group--stretched'] : [];
    var extraClasses2 = extraClasses.concat(spec.maximized ? ['tox-form-group--maximize'] : []);
    var extraBehaviours = [
        alloy_1.Disabling.config({
            disabled: spec.disabled,
            onDisabled: function (comp) {
                alloy_1.FormField.getField(comp).each(alloy_1.Disabling.disable);
            },
            onEnabled: function (comp) {
                alloy_1.FormField.getField(comp).each(alloy_1.Disabling.enable);
            }
        })
    ];
    return (0, FieldLabeller_1.renderFormFieldWith)(pLabel, pField, extraClasses2, extraBehaviours);
};
var renderInput = function (spec, providersBackstage) {
    return renderTextField({
        name: spec.name,
        multiline: false,
        label: spec.label,
        placeholder: spec.placeholder,
        flex: false,
        disabled: spec.disabled,
        classname: 'tox-textfield',
        validation: katamari_1.Option.none(),
        maximized: spec.maximized
    }, providersBackstage);
};
exports.renderInput = renderInput;
var renderTextarea = function (spec, providersBackstage) {
    return renderTextField({
        name: spec.name,
        multiline: true,
        label: spec.label,
        placeholder: spec.placeholder,
        flex: true,
        disabled: spec.disabled,
        classname: 'tox-textarea',
        validation: katamari_1.Option.none(),
        maximized: spec.maximized
    }, providersBackstage);
};
exports.renderTextarea = renderTextarea;
