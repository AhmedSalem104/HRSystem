"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderLabel = exports.renderFormFieldDom = exports.renderFormFieldSpec = exports.renderFormFieldWith = exports.renderFormField = void 0;
var alloy_1 = require("@ephox/alloy");
var renderFormFieldWith = function (pLabel, pField, extraClasses, extraBehaviours) {
    var spec = renderFormFieldSpecWith(pLabel, pField, extraClasses, extraBehaviours);
    return alloy_1.FormField.sketch(spec);
};
exports.renderFormFieldWith = renderFormFieldWith;
var renderFormField = function (pLabel, pField) {
    return renderFormFieldWith(pLabel, pField, [], []);
};
exports.renderFormField = renderFormField;
var renderFormFieldSpec = function (pLabel, pField) {
    return {
        dom: renderFormFieldDom(),
        components: pLabel.toArray().concat([pField])
    };
};
exports.renderFormFieldSpec = renderFormFieldSpec;
var renderFormFieldSpecWith = function (pLabel, pField, extraClasses, extraBehaviours) {
    return {
        dom: renderFormFieldDomWith(extraClasses),
        components: pLabel.toArray().concat([pField]),
        fieldBehaviours: alloy_1.Behaviour.derive(extraBehaviours)
    };
};
var renderFormFieldDom = function () {
    return renderFormFieldDomWith([]);
};
exports.renderFormFieldDom = renderFormFieldDom;
var renderFormFieldDomWith = function (extraClasses) {
    return {
        tag: 'div',
        classes: ['tox-form__group'].concat(extraClasses)
    };
};
var renderLabel = function (label, providersBackstage) {
    return alloy_1.FormField.parts().label({
        dom: {
            tag: 'label',
            classes: ['tox-label'],
            innerHtml: providersBackstage.translate(label)
        }
    });
};
exports.renderLabel = renderLabel;
