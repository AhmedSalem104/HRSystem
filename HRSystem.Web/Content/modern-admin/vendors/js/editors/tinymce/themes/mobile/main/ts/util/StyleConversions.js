"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var boulder_1 = require("@ephox/boulder");
var katamari_1 = require("@ephox/katamari");
var getFromExpandingItem = function (item) {
    var newItem = katamari_1.Merger.deepMerge(boulder_1.Objects.exclude(item, ['items']), {
        menu: true
    });
    var rest = expand(item.items);
    var newMenus = katamari_1.Merger.deepMerge(rest.menus, boulder_1.Objects.wrap(item.title, rest.items));
    var newExpansions = katamari_1.Merger.deepMerge(rest.expansions, boulder_1.Objects.wrap(item.title, item.title));
    return {
        item: newItem,
        menus: newMenus,
        expansions: newExpansions
    };
};
var getFromItem = function (item) {
    return boulder_1.Objects.hasKey(item, 'items') ? getFromExpandingItem(item) : {
        item: item,
        menus: {},
        expansions: {}
    };
};
var expand = function (items) {
    return katamari_1.Arr.foldr(items, function (acc, item) {
        var newData = getFromItem(item);
        return {
            menus: katamari_1.Merger.deepMerge(acc.menus, newData.menus),
            items: [newData.item].concat(acc.items),
            expansions: katamari_1.Merger.deepMerge(acc.expansions, newData.expansions)
        };
    }, {
        menus: {},
        expansions: {},
        items: []
    });
};
exports.default = {
    expand: expand
};
