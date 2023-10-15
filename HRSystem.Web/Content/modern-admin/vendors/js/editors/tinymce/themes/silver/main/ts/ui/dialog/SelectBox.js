"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderSelectBox = void 0;
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var FieldLabeller_1 = require("tinymce/themes/silver/ui/alien/FieldLabeller");
var Icons = require("tinymce/themes/silver/ui/icons/Icons");
var FormEvents_1 = require("../general/FormEvents");
var renderSelectBox = function (spec, providersBackstage) {
    var translatedOptions = katamari_1.Arr.map(spec.items, function (item) {
        return {
            text: providersBackstage.translate(item.text),
            value: item.value
        };
    });
    var pLabel = spec.label.map(function (label) { return (0, FieldLabeller_1.renderLabel)(label, providersBackstage); });
    var pField = alloy_1.FormField.parts().field({
        dom: {},
        selectAttributes: {
            size: spec.size
        },
        options: translatedOptions,
        factory: alloy_1.HtmlSelect,
        selectBehaviours: alloy_1.Behaviour.derive([
            alloy_1.Disabling.config({ disabled: spec.disabled }),
            alloy_1.Tabstopping.config({}),
            alloy_1.AddEventsBehaviour.config('selectbox-change', [
                alloy_1.AlloyEvents.run(alloy_1.NativeEvents.change(), function (component, _) {
                    alloy_1.AlloyTriggers.emitWith(component, FormEvents_1.formChangeEvent, { name: spec.name });
                })
            ])
        ])
    });
    var chevron = spec.size > 1 ? katamari_1.Option.none() :
        katamari_1.Option.some({
            dom: {
                tag: 'div',
                classes: ['tox-selectfield__icon-js'],
                innerHtml: Icons.get('chevron-down', providersBackstage.icons)
            }
        });
    var selectWrap = {
        dom: {
            tag: 'div',
            classes: ['tox-selectfield']
        },
        components: katamari_1.Arr.flatten([[pField], chevron.toArray()])
    };
    return alloy_1.FormField.sketch({
        dom: {
            tag: 'div',
            classes: ['tox-form__group']
        },
        components: katamari_1.Arr.flatten([pLabel.toArray(), [selectWrap]]),
        fieldBehaviours: alloy_1.Behaviour.derive([
            alloy_1.Disabling.config({
                disabled: spec.disabled,
                onDisabled: function (comp) {
                    alloy_1.FormField.getField(comp).each(alloy_1.Disabling.disable);
                },
                onEnabled: function (comp) {
                    alloy_1.FormField.getField(comp).each(alloy_1.Disabling.enable);
                }
            })
        ])
    });
};
exports.renderSelectBox = renderSelectBox;
