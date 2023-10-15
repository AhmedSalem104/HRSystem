"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.component = void 0;
var katamari_1 = require("@ephox/katamari");
var alloy_1 = require("@ephox/alloy");
var deriveToggling = function (spec, component) {
    if (spec.toggle && component.hasConfigured(alloy_1.Toggling)) {
        return spec.toggle().bind(function (toggle) {
            if (toggle === true) {
                return {
                    toggleOn: function () { alloy_1.Toggling.on(component); },
                    toggleOff: function () { alloy_1.Toggling.off(component); },
                    toggleIsOn: function () { alloy_1.Toggling.isOn(component); },
                };
            }
        });
    }
};
var deriveRepresenting = function (spec, component) {
    if (component.hasConfigured(alloy_1.Representing)) {
        var item_1 = alloy_1.Representing.getValue(component);
        return {
            itemValue: function () { return item_1.value; },
            itemText: function () { return item_1.text; },
        };
    }
};
var deriveReplacing = function (spec, component) {
    if (component.hasConfigured(alloy_1.Representing)) {
        return {
            updateButton: katamari_1.Fun.curry(alloy_1.Replacing.set, component)
        };
    }
};
var component = function (spec, component) {
    var togglingConf = deriveToggling(spec, component);
    var representingConf = deriveRepresenting(spec, component);
    var replaceingConf = deriveReplacing(spec, component);
    var defaults = {
        element: component.element().dom(),
        isDisabled: function () { return alloy_1.Disabling.isDisabled(component); },
        setDisabled: function (state) { return alloy_1.Disabling.set(component, state); }
    };
    return katamari_1.Merger.merge(defaults, togglingConf, representingConf, replaceingConf);
};
exports.component = component;
