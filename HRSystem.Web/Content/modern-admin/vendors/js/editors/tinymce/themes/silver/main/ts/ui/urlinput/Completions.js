"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterByQuery = exports.joinMenuLists = exports.historyTargets = exports.anchorTargetBottom = exports.anchorTargetTop = exports.anchorTargets = exports.headerTargets = exports.filteredTargets = exports.filterLinkTargets = exports.toMenuItems = exports.staticMenuItem = exports.toMenuItem = exports.separator = void 0;
var katamari_1 = require("@ephox/katamari");
var separator = {
    type: 'separator'
};
exports.separator = separator;
var toMenuItem = function (target) {
    return {
        type: 'menuitem',
        value: target.url,
        text: target.title,
        meta: {
            attach: target.attach
        },
        onAction: function () { }
    };
};
exports.toMenuItem = toMenuItem;
var staticMenuItem = function (title, url) { return ({
    type: 'menuitem',
    value: url,
    text: title,
    meta: {
        attach: undefined
    },
    onAction: function () { }
}); };
exports.staticMenuItem = staticMenuItem;
var toMenuItems = function (targets) {
    return katamari_1.Arr.map(targets, toMenuItem);
};
exports.toMenuItems = toMenuItems;
var filterLinkTargets = function (type, targets) {
    return katamari_1.Arr.filter(targets, function (target) { return target.type === type; });
};
exports.filterLinkTargets = filterLinkTargets;
var filteredTargets = function (type, targets) {
    return toMenuItems(filterLinkTargets(type, targets));
};
exports.filteredTargets = filteredTargets;
var headerTargets = function (linkInfo) { return filteredTargets('header', linkInfo.targets); };
exports.headerTargets = headerTargets;
var anchorTargets = function (linkInfo) { return filteredTargets('anchor', linkInfo.targets); };
exports.anchorTargets = anchorTargets;
var anchorTargetTop = function (linkInfo) {
    return katamari_1.Option.from(linkInfo.anchorTop).map(function (url) { return staticMenuItem('<top>', url); }).toArray();
};
exports.anchorTargetTop = anchorTargetTop;
var anchorTargetBottom = function (linkInfo) {
    return katamari_1.Option.from(linkInfo.anchorBottom).map(function (url) { return staticMenuItem('<bottom>', url); }).toArray();
};
exports.anchorTargetBottom = anchorTargetBottom;
var historyTargets = function (history) {
    return katamari_1.Arr.map(history, function (url) { return staticMenuItem(url, url); });
};
exports.historyTargets = historyTargets;
var joinMenuLists = function (items) {
    return katamari_1.Arr.foldl(items, function (a, b) {
        var bothEmpty = a.length === 0 || b.length === 0;
        return bothEmpty ? a.concat(b) : a.concat(separator, b);
    }, []);
};
exports.joinMenuLists = joinMenuLists;
var filterByQuery = function (term, menuItems) {
    var lowerCaseTerm = term.toLowerCase();
    return katamari_1.Arr.filter(menuItems, function (item) {
        var text = item.meta !== undefined && item.meta.text !== undefined ? item.meta.text : item.text;
        return katamari_1.Strings.contains(text.toLowerCase(), lowerCaseTerm) || katamari_1.Strings.contains(item.value.toLowerCase(), lowerCaseTerm);
    });
};
exports.filterByQuery = filterByQuery;
