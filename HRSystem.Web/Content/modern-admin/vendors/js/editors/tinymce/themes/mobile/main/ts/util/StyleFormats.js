"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alloy_1 = require("@ephox/alloy");
var boulder_1 = require("@ephox/boulder");
var katamari_1 = require("@ephox/katamari");
var DefaultStyleFormats_1 = require("../features/DefaultStyleFormats");
var StylesMenu_1 = require("../ui/StylesMenu");
var StyleConversions_1 = require("./StyleConversions");
var register = function (editor, settings) {
    var isSelectedFor = function (format) {
        return function () {
            return editor.formatter.match(format);
        };
    };
    var getPreview = function (format) {
        return function () {
            var styles = editor.formatter.getCssText(format);
            return styles;
        };
    };
    var enrichSupported = function (item) {
        return katamari_1.Merger.deepMerge(item, {
            isSelected: isSelectedFor(item.format),
            getPreview: getPreview(item.format)
        });
    };
    var enrichMenu = function (item) {
        return katamari_1.Merger.deepMerge(item, {
            isSelected: katamari_1.Fun.constant(false),
            getPreview: katamari_1.Fun.constant('')
        });
    };
    var enrichCustom = function (item) {
        var formatName = katamari_1.Id.generate(item.title);
        var newItem = katamari_1.Merger.deepMerge(item, {
            format: formatName,
            isSelected: isSelectedFor(formatName),
            getPreview: getPreview(formatName)
        });
        editor.formatter.register(formatName, newItem);
        return newItem;
    };
    var formats = boulder_1.Objects.readOptFrom(settings, 'style_formats').getOr(DefaultStyleFormats_1.default);
    var doEnrich = function (items) {
        return katamari_1.Arr.map(items, function (item) {
            if (boulder_1.Objects.hasKey(item, 'items')) {
                var newItems = doEnrich(item.items);
                return katamari_1.Merger.deepMerge(enrichMenu(item), {
                    items: newItems
                });
            }
            else if (boulder_1.Objects.hasKey(item, 'format')) {
                return enrichSupported(item);
            }
            else {
                return enrichCustom(item);
            }
        });
    };
    return doEnrich(formats);
};
var prune = function (editor, formats) {
    var doPrune = function (items) {
        return katamari_1.Arr.bind(items, function (item) {
            if (item.items !== undefined) {
                var newItems = doPrune(item.items);
                return newItems.length > 0 ? [item] : [];
            }
            else {
                var keep = boulder_1.Objects.hasKey(item, 'format') ? editor.formatter.canApply(item.format) : true;
                return keep ? [item] : [];
            }
        });
    };
    var prunedItems = doPrune(formats);
    return StyleConversions_1.default.expand(prunedItems);
};
var ui = function (editor, formats, onDone) {
    var pruned = prune(editor, formats);
    return StylesMenu_1.default.sketch({
        formats: pruned,
        handle: function (item, value) {
            editor.undoManager.transact(function () {
                if (alloy_1.Toggling.isOn(item)) {
                    editor.formatter.remove(value);
                }
                else {
                    editor.formatter.apply(value);
                }
            });
            onDone();
        }
    });
};
exports.default = {
    register: register,
    ui: ui
};
