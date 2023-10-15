"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisablingSteps = void 0;
var agar_1 = require("@ephox/agar");
var alloy_1 = require("@ephox/alloy");
var sAssertDisabled = function (label, expected, component) { return agar_1.Logger.t('sAssertDisabled: ' + label, agar_1.Chain.asStep(component, [
    agar_1.Chain.mapper(alloy_1.Disabling.isDisabled),
    agar_1.Assertions.cAssertEq(label, expected)
])); };
var sSetDisabled = function (label, component, newValue) { return agar_1.Logger.t('sSetDisabled: ' + label, agar_1.Step.sync(function () {
    alloy_1.Disabling.set(component, newValue);
})); };
exports.DisablingSteps = {
    sAssertDisabled: sAssertDisabled,
    sSetDisabled: sSetDisabled
};
