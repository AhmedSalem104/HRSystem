"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMenuFrom = exports.createTieredDataFrom = exports.createPartialMenu = exports.createAutocompleteItems = exports.FocusMode = void 0;
var alloy_1 = require("@ephox/alloy");
var bridge_1 = require("@ephox/bridge");
var dom_globals_1 = require("@ephox/dom-globals");
var katamari_1 = require("@ephox/katamari");
var FlatgridAutodetect_1 = require("../../alien/FlatgridAutodetect");
var SimpleBehaviours_1 = require("../../alien/SimpleBehaviours");
var MenuItems = require("../item/MenuItems");
var MenuMovement_1 = require("./MenuMovement");
var MenuParts_1 = require("./MenuParts");
var MenuUtils_1 = require("./MenuUtils");
var FocusMode;
(function (FocusMode) {
    FocusMode[FocusMode["ContentFocus"] = 0] = "ContentFocus";
    FocusMode[FocusMode["UiFocus"] = 1] = "UiFocus";
})(FocusMode = exports.FocusMode || (exports.FocusMode = {}));
var hasIcon = function (item) { return item.icon !== undefined || item.type === 'togglemenuitem' || item.type === 'choicemenuitem'; };
var menuHasIcons = function (xs) { return katamari_1.Arr.exists(xs, hasIcon); };
var createMenuItemFromBridge = function (item, itemResponse, backstage, menuHasIcons) {
    if (menuHasIcons === void 0) { menuHasIcons = true; }
    var providersBackstage = backstage.shared.providers;
    switch (item.type) {
        case 'menuitem':
            return bridge_1.Menu.createMenuItem(item).fold(MenuUtils_1.handleError, function (d) { return katamari_1.Option.some(MenuItems.normal(d, itemResponse, providersBackstage, menuHasIcons)); });
        case 'nestedmenuitem':
            return bridge_1.Menu.createNestedMenuItem(item).fold(MenuUtils_1.handleError, function (d) { return katamari_1.Option.some(MenuItems.nested(d, itemResponse, providersBackstage, menuHasIcons)); });
        case 'togglemenuitem':
            return bridge_1.Menu.createToggleMenuItem(item).fold(MenuUtils_1.handleError, function (d) { return katamari_1.Option.some(MenuItems.toggle(d, itemResponse, providersBackstage)); });
        case 'separator':
            return bridge_1.Menu.createSeparatorMenuItem(item).fold(MenuUtils_1.handleError, function (d) { return katamari_1.Option.some(MenuItems.separator(d)); });
        case 'fancymenuitem':
            return bridge_1.Menu.createFancyMenuItem(item).fold(MenuUtils_1.handleError, function (d) { return MenuItems.fancy(d, backstage); });
        default: {
            dom_globals_1.console.error('Unknown item in general menu', item);
            return katamari_1.Option.none();
        }
    }
};
var createAutocompleteItems = function (items, matchText, onItemValueHandler, columns, itemResponse, sharedBackstage) {
    var renderText = columns === 1;
    var renderIcons = !renderText || menuHasIcons(items);
    return katamari_1.Options.cat(katamari_1.Arr.map(items, function (item) {
        if (item.type === 'separator') {
            return bridge_1.InlineContent.createSeparatorItem(item).fold(MenuUtils_1.handleError, function (d) { return katamari_1.Option.some(MenuItems.separator(d)); });
        }
        else {
            return bridge_1.InlineContent.createAutocompleterItem(item).fold(MenuUtils_1.handleError, function (d) { return katamari_1.Option.some(MenuItems.autocomplete(d, matchText, renderText, 'normal', onItemValueHandler, itemResponse, sharedBackstage, renderIcons)); });
        }
    }));
};
exports.createAutocompleteItems = createAutocompleteItems;
var createPartialMenu = function (value, items, itemResponse, backstage) {
    var hasIcons = menuHasIcons(items);
    var alloyItems = katamari_1.Options.cat(katamari_1.Arr.map(items, function (item) {
        var createItem = function (i) { return createMenuItemFromBridge(i, itemResponse, backstage, hasIcons); };
        if (item.type === 'nestedmenuitem' && item.getSubmenuItems().length <= 0) {
            return createItem(katamari_1.Merger.merge(item, { disabled: true }));
        }
        else {
            return createItem(item);
        }
    }));
    return (0, MenuUtils_1.createPartialMenuWithAlloyItems)(value, hasIcons, alloyItems, 1, 'normal');
};
exports.createPartialMenu = createPartialMenu;
var createTieredDataFrom = function (partialMenu) {
    return alloy_1.TieredMenu.singleData(partialMenu.value, partialMenu);
};
exports.createTieredDataFrom = createTieredDataFrom;
var createMenuFrom = function (partialMenu, columns, focusMode, presets) {
    var focusManager = focusMode === FocusMode.ContentFocus ? alloy_1.FocusManagers.highlights() : alloy_1.FocusManagers.dom();
    var movement = (0, MenuMovement_1.deriveMenuMovement)(columns, presets);
    var menuMarkers = (0, MenuParts_1.markers)(presets);
    return {
        dom: partialMenu.dom,
        components: partialMenu.components,
        items: partialMenu.items,
        value: partialMenu.value,
        markers: {
            selectedItem: menuMarkers.selectedItem,
            item: menuMarkers.item
        },
        movement: movement,
        fakeFocus: focusMode === FocusMode.ContentFocus,
        focusManager: focusManager,
        menuBehaviours: SimpleBehaviours_1.SimpleBehaviours.unnamedEvents(columns !== 'auto' ? [] : [
            alloy_1.AlloyEvents.runOnAttached(function (comp, se) {
                (0, FlatgridAutodetect_1.detectSize)(comp, 4, menuMarkers.item).each(function (_a) {
                    var numColumns = _a.numColumns, numRows = _a.numRows;
                    alloy_1.Keying.setGridSize(comp, numRows, numColumns);
                });
            })
        ])
    };
};
exports.createMenuFrom = createMenuFrom;
