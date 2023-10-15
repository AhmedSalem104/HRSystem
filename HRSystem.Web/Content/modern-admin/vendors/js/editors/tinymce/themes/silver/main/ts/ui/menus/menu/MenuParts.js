"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.part = exports.components = exports.dom = exports.markers = void 0;
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var ItemClasses_1 = require("../item/ItemClasses");
var MenuClasses_1 = require("./MenuClasses");
var markers = function (presets) {
    var menuClasses = (0, MenuClasses_1.classes)(presets);
    return {
        backgroundMenu: menuClasses.backgroundMenu,
        selectedMenu: menuClasses.selectedMenu,
        menu: menuClasses.menu,
        selectedItem: menuClasses.selectedItem,
        item: (0, ItemClasses_1.classForPreset)(presets)
    };
};
exports.markers = markers;
var dom = function (hasIcons, columns, presets) {
    var menuClasses = (0, MenuClasses_1.classes)(presets);
    return {
        tag: 'div',
        classes: katamari_1.Arr.flatten([
            [menuClasses.menu, "tox-menu-".concat(columns, "-column")],
            hasIcons ? [menuClasses.hasIcons] : []
        ])
    };
};
exports.dom = dom;
var components = [
    alloy_1.Menu.parts().items({})
];
exports.components = components;
var part = function (hasIcons, columns, presets) {
    var menuClasses = (0, MenuClasses_1.classes)(presets);
    var d = {
        tag: 'div',
        classes: katamari_1.Arr.flatten([
            [menuClasses.tieredMenu]
        ])
    };
    return {
        dom: d,
        markers: markers(presets)
    };
};
exports.part = part;
