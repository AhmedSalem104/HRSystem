"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var IosScrolling_1 = require("../scroll/IosScrolling");
var IosViewport_1 = require("./IosViewport");
var updateFixed = function (element, property, winY, offsetY) {
    var destination = winY + offsetY;
    sugar_1.Css.set(element, property, destination + 'px');
    return katamari_1.Future.pure(offsetY);
};
var updateScrollingFixed = function (element, winY, offsetY) {
    var destTop = winY + offsetY;
    var oldProp = sugar_1.Css.getRaw(element, 'top').getOr(offsetY);
    var delta = destTop - parseInt(oldProp, 10);
    var destScroll = element.dom().scrollTop + delta;
    return IosScrolling_1.default.moveScrollAndTop(element, destScroll, destTop);
};
var updateFixture = function (fixture, winY) {
    return fixture.fold(function (element, property, offsetY) {
        return updateFixed(element, property, winY, offsetY);
    }, function (element, offsetY) {
        return updateScrollingFixed(element, winY, offsetY);
    });
};
var updatePositions = function (container, winY) {
    var fixtures = IosViewport_1.default.findFixtures(container);
    var updates = katamari_1.Arr.map(fixtures, function (fixture) {
        return updateFixture(fixture, winY);
    });
    return katamari_1.Futures.par(updates);
};
exports.default = {
    updatePositions: updatePositions
};
