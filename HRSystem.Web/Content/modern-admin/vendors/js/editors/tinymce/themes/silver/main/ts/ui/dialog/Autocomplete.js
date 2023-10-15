"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderAutocomplete = void 0;
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var FieldLabeller_1 = require("tinymce/themes/silver/ui/alien/FieldLabeller");
var MenuParts = require("../menus/menu/MenuParts");
var NestedMenus = require("../menus/menu/NestedMenus");
var ItemResponse_1 = require("../menus/item/ItemResponse");
var renderAutocomplete = function (spec, backstage) {
    var pLabel = (0, FieldLabeller_1.renderLabel)(spec.label.getOr('?'), backstage.shared.providers);
    var pField = alloy_1.FormField.parts().field({
        factory: alloy_1.Typeahead,
        dismissOnBlur: false,
        inputClasses: ['tox-textfield'],
        minChars: 1,
        fetch: function (input) {
            var value = alloy_1.Representing.getValue(input);
            var items = spec.getItems(value);
            var tdata = NestedMenus.build(items, ItemResponse_1.default.BUBBLE_TO_SANDBOX, backstage);
            return katamari_1.Future.pure(tdata);
        },
        markers: {
            openClass: 'dog'
        },
        lazySink: backstage.shared.getSink,
        parts: {
            menu: MenuParts.part(false, 1, 'normal')
        }
    });
    return (0, FieldLabeller_1.renderFormField)(katamari_1.Option.some(pLabel), pField);
};
exports.renderAutocomplete = renderAutocomplete;
