"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderCollection = void 0;
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var FieldLabeller_1 = require("tinymce/themes/silver/ui/alien/FieldLabeller");
var FlatgridAutodetect_1 = require("../alien/FlatgridAutodetect");
var FormEvents_1 = require("../general/FormEvents");
var MenuMovement_1 = require("../menus/menu/MenuMovement");
var ItemClasses = require("../menus/item/ItemClasses");
var I18n_1 = require("tinymce/core/api/util/I18n");
var renderCollection = function (spec, providersBackstage) {
    var pLabel = spec.label.map(function (label) { return (0, FieldLabeller_1.renderLabel)(label, providersBackstage); });
    var runOnItem = function (f) { return function (comp, se) {
        sugar_1.SelectorFind.closest(se.event().target(), '[data-collection-item-value]').each(function (target) {
            f(comp, target, sugar_1.Attr.get(target, 'data-collection-item-value'));
        });
    }; };
    var escapeAttribute = function (ch) {
        if (ch === '"') {
            return '&quot;';
        }
        return ch;
    };
    var setContents = function (comp, items) {
        var htmlLines = katamari_1.Arr.map(items, function (item) {
            var itemText = I18n_1.default.translate(item.text);
            var textContent = spec.columns === 1 ? "<div class=\"tox-collection__item-label\">".concat(itemText, "</div>") : '';
            var iconContent = "<div class=\"tox-collection__item-icon\">".concat(item.icon, "</div>");
            var mapItemName = {
                '_': ' ',
                ' - ': ' ',
                '-': ' '
            };
            var ariaLabel = itemText.replace(/\_| \- |\-/g, function (match) {
                return mapItemName[match];
            });
            return "<div class=\"tox-collection__item\" tabindex=\"-1\" data-collection-item-value=\"".concat(escapeAttribute(item.value), "\" title=\"").concat(ariaLabel, "\" aria-label=\"").concat(ariaLabel, "\">").concat(iconContent).concat(textContent, "</div>");
        });
        var chunks = spec.columns > 1 && spec.columns !== 'auto' ? katamari_1.Arr.chunk(htmlLines, spec.columns) : [htmlLines];
        var html = katamari_1.Arr.map(chunks, function (ch) {
            return "<div class=\"tox-collection__group\">".concat(ch.join(''), "</div>");
        });
        sugar_1.Html.set(comp.element(), html.join(''));
    };
    var collectionEvents = [
        alloy_1.AlloyEvents.run(alloy_1.NativeEvents.mouseover(), runOnItem(function (comp, tgt) {
            sugar_1.Focus.focus(tgt);
        })),
        alloy_1.AlloyEvents.run(alloy_1.SystemEvents.tapOrClick(), runOnItem(function (comp, tgt, itemValue) {
            alloy_1.AlloyTriggers.emitWith(comp, FormEvents_1.formActionEvent, {
                name: spec.name,
                value: itemValue
            });
        })),
        alloy_1.AlloyEvents.run(alloy_1.NativeEvents.focusin(), runOnItem(function (comp, tgt, itemValue) {
            sugar_1.SelectorFind.descendant(comp.element(), '.' + ItemClasses.activeClass).each(function (currentActive) {
                sugar_1.Class.remove(currentActive, ItemClasses.activeClass);
            });
            sugar_1.Class.add(tgt, ItemClasses.activeClass);
        })),
        alloy_1.AlloyEvents.run(alloy_1.NativeEvents.focusout(), runOnItem(function (comp, tgt, itemValue) {
            sugar_1.SelectorFind.descendant(comp.element(), '.' + ItemClasses.activeClass).each(function (currentActive) {
                sugar_1.Class.remove(currentActive, ItemClasses.activeClass);
            });
        })),
        alloy_1.AlloyEvents.runOnExecute(runOnItem(function (comp, tgt, itemValue) {
            alloy_1.AlloyTriggers.emitWith(comp, FormEvents_1.formActionEvent, {
                name: spec.name,
                value: itemValue
            });
        }))
    ];
    var pField = alloy_1.FormField.parts().field({
        dom: {
            tag: 'div',
            classes: ['tox-collection'].concat(spec.columns !== 1 ? ['tox-collection--grid'] : ['tox-collection--list'])
        },
        components: [],
        factory: { sketch: katamari_1.Fun.identity },
        behaviours: alloy_1.Behaviour.derive([
            alloy_1.Replacing.config({}),
            alloy_1.Representing.config({
                store: {
                    mode: 'memory',
                    initialValue: []
                },
                onSetValue: function (comp, items) {
                    setContents(comp, items);
                    if (spec.columns === 'auto') {
                        (0, FlatgridAutodetect_1.detectSize)(comp, 5, 'tox-collection__item').each(function (_a) {
                            var numRows = _a.numRows, numColumns = _a.numColumns;
                            alloy_1.Keying.setGridSize(comp, numRows, numColumns);
                        });
                    }
                    alloy_1.AlloyTriggers.emit(comp, FormEvents_1.formResizeEvent);
                }
            }),
            alloy_1.Tabstopping.config({}),
            alloy_1.Keying.config((0, MenuMovement_1.deriveCollectionMovement)(spec.columns, 'normal')),
            alloy_1.AddEventsBehaviour.config('collection-events', collectionEvents)
        ])
    });
    var extraClasses = ['tox-form__group--collection'];
    return (0, FieldLabeller_1.renderFormFieldWith)(pLabel, pField, extraClasses, []);
};
exports.renderCollection = renderCollection;
