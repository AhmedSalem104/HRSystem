"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChoiceItems = exports.createPartialChoiceMenu = void 0;
var bridge_1 = require("@ephox/bridge");
var katamari_1 = require("@ephox/katamari");
var ChoiceItem_1 = require("../item/build/ChoiceItem");
var MenuUtils_1 = require("./MenuUtils");
var createPartialChoiceMenu = function (value, items, onItemValueHandler, columns, presets, itemResponse, select, providersBackstage) {
    var hasIcons = (0, MenuUtils_1.menuHasIcons)(items);
    var presetItemTypes = presets !== 'color' ? 'normal' : 'color';
    var alloyItems = (0, exports.createChoiceItems)(items, onItemValueHandler, columns, presetItemTypes, itemResponse, select, providersBackstage);
    return (0, MenuUtils_1.createPartialMenuWithAlloyItems)(value, hasIcons, alloyItems, columns, presets);
};
exports.createPartialChoiceMenu = createPartialChoiceMenu;
var createChoiceItems = function (items, onItemValueHandler, columns, itemPresets, itemResponse, select, providersBackstage) {
    return katamari_1.Options.cat(katamari_1.Arr.map(items, function (item) {
        if (item.type === 'choiceitem') {
            return bridge_1.Menu.createChoiceMenuItem(item).fold(MenuUtils_1.handleError, function (d) { return katamari_1.Option.some((0, ChoiceItem_1.renderChoiceItem)(d, columns === 1, itemPresets, onItemValueHandler, select(item.value), itemResponse, providersBackstage)); });
        }
        else {
            return katamari_1.Option.none();
        }
    }));
};
exports.createChoiceItems = createChoiceItems;
