"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var Styles_1 = require("../../style/Styles");
var DataAttributes_1 = require("../../util/DataAttributes");
var SmoothAnimation_1 = require("../smooth/SmoothAnimation");
var IosViewport_1 = require("../view/IosViewport");
var animator = SmoothAnimation_1.default.create();
var ANIMATION_STEP = 15;
var NUM_TOP_ANIMATION_FRAMES = 10;
var ANIMATION_RATE = 10;
var lastScroll = 'data-' + Styles_1.default.resolve('last-scroll-top');
var getTop = function (element) {
    var raw = sugar_1.Css.getRaw(element, 'top').getOr('0');
    return parseInt(raw, 10);
};
var getScrollTop = function (element) {
    return parseInt(element.dom().scrollTop, 10);
};
var moveScrollAndTop = function (element, destination, finalTop) {
    return katamari_1.Future.nu(function (callback) {
        var getCurrent = katamari_1.Fun.curry(getScrollTop, element);
        var update = function (newScroll) {
            element.dom().scrollTop = newScroll;
            sugar_1.Css.set(element, 'top', (getTop(element) + ANIMATION_STEP) + 'px');
        };
        var finish = function () {
            element.dom().scrollTop = destination;
            sugar_1.Css.set(element, 'top', finalTop + 'px');
            callback(destination);
        };
        animator.animate(getCurrent, destination, ANIMATION_STEP, update, finish, ANIMATION_RATE);
    });
};
var moveOnlyScroll = function (element, destination) {
    return katamari_1.Future.nu(function (callback) {
        var getCurrent = katamari_1.Fun.curry(getScrollTop, element);
        sugar_1.Attr.set(element, lastScroll, getCurrent());
        var update = function (newScroll, abort) {
            var previous = DataAttributes_1.default.safeParse(element, lastScroll);
            if (previous !== element.dom().scrollTop) {
                abort(element.dom().scrollTop);
            }
            else {
                element.dom().scrollTop = newScroll;
                sugar_1.Attr.set(element, lastScroll, newScroll);
            }
        };
        var finish = function () {
            element.dom().scrollTop = destination;
            sugar_1.Attr.set(element, lastScroll, destination);
            callback(destination);
        };
        var distance = Math.abs(destination - getCurrent());
        var step = Math.ceil(distance / NUM_TOP_ANIMATION_FRAMES);
        animator.animate(getCurrent, destination, step, update, finish, ANIMATION_RATE);
    });
};
var moveOnlyTop = function (element, destination) {
    return katamari_1.Future.nu(function (callback) {
        var getCurrent = katamari_1.Fun.curry(getTop, element);
        var update = function (newTop) {
            sugar_1.Css.set(element, 'top', newTop + 'px');
        };
        var finish = function () {
            update(destination);
            callback(destination);
        };
        var distance = Math.abs(destination - getCurrent());
        var step = Math.ceil(distance / NUM_TOP_ANIMATION_FRAMES);
        animator.animate(getCurrent, destination, step, update, finish, ANIMATION_RATE);
    });
};
var updateTop = function (element, amount) {
    var newTop = (amount + IosViewport_1.default.getYFixedData(element)) + 'px';
    sugar_1.Css.set(element, 'top', newTop);
};
var moveWindowScroll = function (toolbar, viewport, destY) {
    var outerWindow = sugar_1.Traverse.owner(toolbar).dom().defaultView;
    return katamari_1.Future.nu(function (callback) {
        updateTop(toolbar, destY);
        updateTop(viewport, destY);
        outerWindow.scrollTo(0, destY);
        callback(destY);
    });
};
exports.default = {
    moveScrollAndTop: moveScrollAndTop,
    moveOnlyScroll: moveOnlyScroll,
    moveOnlyTop: moveOnlyTop,
    moveWindowScroll: moveWindowScroll
};
