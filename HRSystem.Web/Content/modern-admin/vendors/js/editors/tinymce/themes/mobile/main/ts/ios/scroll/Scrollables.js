"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var Styles_1 = require("../../style/Styles");
var dataHorizontal = 'data-' + Styles_1.default.resolve('horizontal-scroll');
var canScrollVertically = function (container) {
    container.dom().scrollTop = 1;
    var result = container.dom().scrollTop !== 0;
    container.dom().scrollTop = 0;
    return result;
};
var canScrollHorizontally = function (container) {
    container.dom().scrollLeft = 1;
    var result = container.dom().scrollLeft !== 0;
    container.dom().scrollLeft = 0;
    return result;
};
var hasVerticalScroll = function (container) {
    return container.dom().scrollTop > 0 || canScrollVertically(container);
};
var hasHorizontalScroll = function (container) {
    return container.dom().scrollLeft > 0 || canScrollHorizontally(container);
};
var markAsHorizontal = function (container) {
    sugar_1.Attr.set(container, dataHorizontal, 'true');
};
var hasScroll = function (container) {
    return sugar_1.Attr.get(container, dataHorizontal) === 'true' ? hasHorizontalScroll(container) : hasVerticalScroll(container);
};
var exclusive = function (scope, selector) {
    return sugar_1.DomEvent.bind(scope, 'touchmove', function (event) {
        sugar_1.SelectorFind.closest(event.target(), selector).filter(hasScroll).fold(function () {
            event.raw().preventDefault();
        }, katamari_1.Fun.noop);
    });
};
exports.default = {
    exclusive: exclusive,
    markAsHorizontal: markAsHorizontal
};
