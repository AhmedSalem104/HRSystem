"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var Styles_1 = require("../../style/Styles");
var Scrollable_1 = require("../../touch/scroll/Scrollable");
var DataAttributes_1 = require("../../util/DataAttributes");
var DeviceZones_1 = require("./DeviceZones");
var fixture = katamari_1.Adt.generate([
    { fixed: ['element', 'property', 'offsetY'] },
    { scroller: ['element', 'offsetY'] }
]);
var yFixedData = 'data-' + Styles_1.default.resolve('position-y-fixed');
var yFixedProperty = 'data-' + Styles_1.default.resolve('y-property');
var yScrollingData = 'data-' + Styles_1.default.resolve('scrolling');
var windowSizeData = 'data-' + Styles_1.default.resolve('last-window-height');
var getYFixedData = function (element) {
    return DataAttributes_1.default.safeParse(element, yFixedData);
};
var getYFixedProperty = function (element) {
    return sugar_1.Attr.get(element, yFixedProperty);
};
var getLastWindowSize = function (element) {
    return DataAttributes_1.default.safeParse(element, windowSizeData);
};
var classifyFixed = function (element, offsetY) {
    var prop = getYFixedProperty(element);
    return fixture.fixed(element, prop, offsetY);
};
var classifyScrolling = function (element, offsetY) {
    return fixture.scroller(element, offsetY);
};
var classify = function (element) {
    var offsetY = getYFixedData(element);
    var classifier = sugar_1.Attr.get(element, yScrollingData) === 'true' ? classifyScrolling : classifyFixed;
    return classifier(element, offsetY);
};
var findFixtures = function (container) {
    var candidates = sugar_1.SelectorFilter.descendants(container, '[' + yFixedData + ']');
    return katamari_1.Arr.map(candidates, classify);
};
var takeoverToolbar = function (toolbar) {
    var oldToolbarStyle = sugar_1.Attr.get(toolbar, 'style');
    sugar_1.Css.setAll(toolbar, {
        position: 'absolute',
        top: '0px'
    });
    sugar_1.Attr.set(toolbar, yFixedData, '0px');
    sugar_1.Attr.set(toolbar, yFixedProperty, 'top');
    var restore = function () {
        sugar_1.Attr.set(toolbar, 'style', oldToolbarStyle || '');
        sugar_1.Attr.remove(toolbar, yFixedData);
        sugar_1.Attr.remove(toolbar, yFixedProperty);
    };
    return {
        restore: restore
    };
};
var takeoverViewport = function (toolbarHeight, height, viewport) {
    var oldViewportStyle = sugar_1.Attr.get(viewport, 'style');
    Scrollable_1.default.register(viewport);
    sugar_1.Css.setAll(viewport, {
        position: 'absolute',
        height: height + 'px',
        width: '100%',
        top: toolbarHeight + 'px'
    });
    sugar_1.Attr.set(viewport, yFixedData, toolbarHeight + 'px');
    sugar_1.Attr.set(viewport, yScrollingData, 'true');
    sugar_1.Attr.set(viewport, yFixedProperty, 'top');
    var restore = function () {
        Scrollable_1.default.deregister(viewport);
        sugar_1.Attr.set(viewport, 'style', oldViewportStyle || '');
        sugar_1.Attr.remove(viewport, yFixedData);
        sugar_1.Attr.remove(viewport, yScrollingData);
        sugar_1.Attr.remove(viewport, yFixedProperty);
    };
    return {
        restore: restore
    };
};
var takeoverDropup = function (dropup, toolbarHeight, viewportHeight) {
    var oldDropupStyle = sugar_1.Attr.get(dropup, 'style');
    sugar_1.Css.setAll(dropup, {
        position: 'absolute',
        bottom: '0px'
    });
    sugar_1.Attr.set(dropup, yFixedData, '0px');
    sugar_1.Attr.set(dropup, yFixedProperty, 'bottom');
    var restore = function () {
        sugar_1.Attr.set(dropup, 'style', oldDropupStyle || '');
        sugar_1.Attr.remove(dropup, yFixedData);
        sugar_1.Attr.remove(dropup, yFixedProperty);
    };
    return {
        restore: restore
    };
};
var deriveViewportHeight = function (viewport, toolbarHeight, dropupHeight) {
    var outerWindow = sugar_1.Traverse.owner(viewport).dom().defaultView;
    var winH = outerWindow.innerHeight;
    sugar_1.Attr.set(viewport, windowSizeData, winH + 'px');
    return winH - toolbarHeight - dropupHeight;
};
var takeover = function (viewport, contentBody, toolbar, dropup) {
    var outerWindow = sugar_1.Traverse.owner(viewport).dom().defaultView;
    var toolbarSetup = takeoverToolbar(toolbar);
    var toolbarHeight = sugar_1.Height.get(toolbar);
    var dropupHeight = sugar_1.Height.get(dropup);
    var viewportHeight = deriveViewportHeight(viewport, toolbarHeight, dropupHeight);
    var viewportSetup = takeoverViewport(toolbarHeight, viewportHeight, viewport);
    var dropupSetup = takeoverDropup(dropup, toolbarHeight, viewportHeight);
    var isActive = true;
    var restore = function () {
        isActive = false;
        toolbarSetup.restore();
        viewportSetup.restore();
        dropupSetup.restore();
    };
    var isExpanding = function () {
        var currentWinHeight = outerWindow.innerHeight;
        var lastWinHeight = getLastWindowSize(viewport);
        return currentWinHeight > lastWinHeight;
    };
    var refresh = function () {
        if (isActive) {
            var newToolbarHeight = sugar_1.Height.get(toolbar);
            var dropupHeight_1 = sugar_1.Height.get(dropup);
            var newHeight = deriveViewportHeight(viewport, newToolbarHeight, dropupHeight_1);
            sugar_1.Attr.set(viewport, yFixedData, newToolbarHeight + 'px');
            sugar_1.Css.set(viewport, 'height', newHeight + 'px');
            DeviceZones_1.default.updatePadding(contentBody, viewport, dropup);
        }
    };
    var setViewportOffset = function (newYOffset) {
        var offsetPx = newYOffset + 'px';
        sugar_1.Attr.set(viewport, yFixedData, offsetPx);
        refresh();
    };
    DeviceZones_1.default.updatePadding(contentBody, viewport, dropup);
    return {
        setViewportOffset: setViewportOffset,
        isExpanding: isExpanding,
        isShrinking: katamari_1.Fun.not(isExpanding),
        refresh: refresh,
        restore: restore
    };
};
exports.default = {
    findFixtures: findFixtures,
    takeover: takeover,
    getYFixedData: getYFixedData
};
