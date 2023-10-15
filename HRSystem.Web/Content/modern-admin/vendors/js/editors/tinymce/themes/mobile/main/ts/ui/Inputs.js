"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hidden = exports.field = void 0;
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var I18n_1 = require("tinymce/core/api/util/I18n");
var Styles_1 = require("../style/Styles");
var UiDomFactory = require("../util/UiDomFactory");
var clearInputBehaviour = 'input-clearing';
var field = function (name, placeholder) {
    var inputSpec = alloy_1.Memento.record(alloy_1.Input.sketch({
        inputAttributes: { placeholder: I18n_1.default.translate(placeholder) },
        onSetValue: function (input, data) {
            alloy_1.AlloyTriggers.emit(input, alloy_1.NativeEvents.input());
        },
        inputBehaviours: alloy_1.Behaviour.derive([
            alloy_1.Composing.config({
                find: katamari_1.Option.some
            }),
            alloy_1.Tabstopping.config({}),
            alloy_1.Keying.config({
                mode: 'execution'
            })
        ]),
        selectOnFocus: false
    }));
    var buttonSpec = alloy_1.Memento.record(alloy_1.Button.sketch({
        dom: UiDomFactory.dom('<button class="${prefix}-input-container-x ${prefix}-icon-cancel-circle ${prefix}-icon"></button>'),
        action: function (button) {
            var input = inputSpec.get(button);
            alloy_1.Representing.setValue(input, '');
        }
    }));
    return {
        name: name,
        spec: alloy_1.Container.sketch({
            dom: UiDomFactory.dom('<div class="${prefix}-input-container"></div>'),
            components: [
                inputSpec.asSpec(),
                buttonSpec.asSpec()
            ],
            containerBehaviours: alloy_1.Behaviour.derive([
                alloy_1.Toggling.config({
                    toggleClass: Styles_1.default.resolve('input-container-empty')
                }),
                alloy_1.Composing.config({
                    find: function (comp) {
                        return katamari_1.Option.some(inputSpec.get(comp));
                    }
                }),
                alloy_1.AddEventsBehaviour.config(clearInputBehaviour, [
                    alloy_1.AlloyEvents.run(alloy_1.NativeEvents.input(), function (iContainer) {
                        var input = inputSpec.get(iContainer);
                        var val = alloy_1.Representing.getValue(input);
                        var f = val.length > 0 ? alloy_1.Toggling.off : alloy_1.Toggling.on;
                        f(iContainer);
                    })
                ])
            ])
        })
    };
};
exports.field = field;
var hidden = function (name) {
    return {
        name: name,
        spec: alloy_1.DataField.sketch({
            dom: {
                tag: 'span',
                styles: {
                    display: 'none'
                }
            },
            getInitialValue: function () {
                return katamari_1.Option.none();
            }
        })
    };
};
exports.hidden = hidden;
