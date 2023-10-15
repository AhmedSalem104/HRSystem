"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderListbox = void 0;
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var FieldLabeller_1 = require("tinymce/themes/silver/ui/alien/FieldLabeller");
var renderListbox = function (spec, providersBackstage) {
    var pLabel = (0, FieldLabeller_1.renderLabel)(spec.label, providersBackstage);
    var pField = alloy_1.FormField.parts().field({
        factory: alloy_1.HtmlSelect,
        dom: {
            classes: ['mce-select-field']
        },
        selectBehaviours: alloy_1.Behaviour.derive([
            alloy_1.Tabstopping.config({})
        ]),
        options: spec.values,
        data: spec.initialValue.getOr(undefined)
    });
    return (0, FieldLabeller_1.renderFormField)(katamari_1.Option.some(pLabel), pField);
};
exports.renderListbox = renderListbox;
