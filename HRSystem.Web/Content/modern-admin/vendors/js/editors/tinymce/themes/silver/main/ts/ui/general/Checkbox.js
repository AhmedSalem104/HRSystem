"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderCheckbox = void 0;
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var ComposingConfigs_1 = require("../alien/ComposingConfigs");
var Icons = require("../icons/Icons");
var FormEvents_1 = require("./FormEvents");
var renderCheckbox = function (spec, providerBackstage) {
    var repBehaviour = alloy_1.Representing.config({
        store: {
            mode: 'manual',
            getValue: function (comp) {
                var el = comp.element().dom();
                return el.checked;
            },
            setValue: function (comp, value) {
                var el = comp.element().dom();
                el.checked = value;
            }
        }
    });
    var toggleCheckboxHandler = function (comp) {
        comp.element().dom().click();
        return katamari_1.Option.some(true);
    };
    var pField = alloy_1.FormField.parts().field({
        factory: { sketch: katamari_1.Fun.identity },
        dom: {
            tag: 'input',
            classes: ['tox-checkbox__input'],
            attributes: {
                type: 'checkbox'
            }
        },
        behaviours: alloy_1.Behaviour.derive([
            ComposingConfigs_1.ComposingConfigs.self(),
            alloy_1.Disabling.config({ disabled: spec.disabled }),
            alloy_1.Tabstopping.config({}),
            alloy_1.Focusing.config({}),
            repBehaviour,
            alloy_1.Keying.config({
                mode: 'special',
                onEnter: toggleCheckboxHandler,
                onSpace: toggleCheckboxHandler,
                stopSpaceKeyup: true
            }),
            alloy_1.AddEventsBehaviour.config('checkbox-events', [
                alloy_1.AlloyEvents.run(alloy_1.NativeEvents.change(), function (component, _) {
                    alloy_1.AlloyTriggers.emitWith(component, FormEvents_1.formChangeEvent, { name: spec.name });
                })
            ])
        ]),
    });
    var pLabel = alloy_1.FormField.parts().label({
        dom: {
            tag: 'span',
            classes: ['tox-checkbox__label'],
            innerHtml: providerBackstage.translate(spec.label)
        },
        behaviours: alloy_1.Behaviour.derive([
            alloy_1.Unselecting.config({})
        ])
    });
    var makeIcon = function (className) {
        var iconName = className === 'checked' ? 'selected' : 'unselected';
        return {
            dom: {
                tag: 'span',
                classes: ['tox-icon', 'tox-checkbox-icon__' + className],
                innerHtml: Icons.get(iconName, providerBackstage.icons)
            }
        };
    };
    var memIcons = alloy_1.Memento.record({
        dom: {
            tag: 'div',
            classes: ['tox-checkbox__icons']
        },
        components: [
            makeIcon('checked'),
            makeIcon('unchecked')
        ]
    });
    return alloy_1.FormField.sketch({
        dom: {
            tag: 'label',
            classes: ['tox-checkbox'],
        },
        components: [
            pField,
            memIcons.asSpec(),
            pLabel
        ],
        fieldBehaviours: alloy_1.Behaviour.derive([
            alloy_1.Disabling.config({
                disabled: spec.disabled,
                disableClass: 'tox-checkbox--disabled',
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
exports.renderCheckbox = renderCheckbox;
