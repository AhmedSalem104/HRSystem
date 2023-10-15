"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomSteps = void 0;
var agar_1 = require("@ephox/agar");
var sugar_1 = require("@ephox/sugar");
var alloy_1 = require("@ephox/alloy");
var sAssertValue = function (label, expected, component, selector) { return agar_1.Logger.t('DomSteps.sAssertValue(' + expected + '): ' + label, agar_1.Chain.asStep(component.element(), [
    agar_1.UiFinder.cFindIn(selector),
    agar_1.Chain.op(function (elem) {
        agar_1.Assertions.assertEq('Checking value of ' + selector, expected, sugar_1.Value.get(elem));
    })
])); };
var sTriggerEventOnFocused = function (label, component, eventName) { return agar_1.Logger.t('DomSteps.sTriggerEventOnFocused(' + eventName + '): ' + label, agar_1.Chain.asStep(sugar_1.Traverse.owner(component.element()), [
    agar_1.FocusTools.cGetFocused,
    agar_1.Chain.binder(function (focused) { return component.getSystem().getByDom(focused); }),
    agar_1.Chain.op(function (input) { return alloy_1.AlloyTriggers.emit(input, eventName); })
])); };
exports.DomSteps = {
    sAssertValue: sAssertValue,
    sTriggerEventOnFocused: sTriggerEventOnFocused
};
