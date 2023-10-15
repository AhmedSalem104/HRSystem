"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPartialMenuWithAlloyItems = exports.handleError = exports.menuHasIcons = exports.hasIcon = void 0;
var boulder_1 = require("@ephox/boulder");
var dom_globals_1 = require("@ephox/dom-globals");
var katamari_1 = require("@ephox/katamari");
var MenuStructures_1 = require("./MenuStructures");
var MenuParts_1 = require("./MenuParts");
var hasIcon = function (item) { return item.icon !== undefined || item.type === 'togglemenuitem' || item.type === 'choicemenuitem'; };
exports.hasIcon = hasIcon;
var menuHasIcons = function (xs) { return katamari_1.Arr.exists(xs, exports.hasIcon); };
exports.menuHasIcons = menuHasIcons;
var handleError = function (error) {
    dom_globals_1.console.error(boulder_1.ValueSchema.formatError(error));
    dom_globals_1.console.log(error);
    return katamari_1.Option.none();
};
exports.handleError = handleError;
var createPartialMenuWithAlloyItems = function (value, hasIcons, items, columns, presets) {
    if (presets === 'color') {
        var structure = (0, MenuStructures_1.forSwatch)(columns);
        return {
            value: value,
            dom: structure.dom,
            components: structure.components,
            items: items
        };
    }
    if (presets === 'normal' && columns === 'auto') {
        var structure = (0, MenuStructures_1.forCollection)(columns, items);
        return {
            value: value,
            dom: structure.dom,
            components: structure.components,
            items: items
        };
    }
    if (presets === 'normal' && columns === 1) {
        var structure = (0, MenuStructures_1.forCollection)(1, items);
        return {
            value: value,
            dom: structure.dom,
            components: structure.components,
            items: items
        };
    }
    if (presets === 'normal') {
        var structure = (0, MenuStructures_1.forCollection)(columns, items);
        return {
            value: value,
            dom: structure.dom,
            components: structure.components,
            items: items
        };
    }
    if (presets === 'listpreview' && columns !== 'auto') {
        var structure = (0, MenuStructures_1.forToolbar)(columns);
        return {
            value: value,
            dom: structure.dom,
            components: structure.components,
            items: items
        };
    }
    return {
        value: value,
        dom: (0, MenuParts_1.dom)(hasIcons, columns, presets),
        components: MenuParts_1.components,
        items: items
    };
};
exports.createPartialMenuWithAlloyItems = createPartialMenuWithAlloyItems;
