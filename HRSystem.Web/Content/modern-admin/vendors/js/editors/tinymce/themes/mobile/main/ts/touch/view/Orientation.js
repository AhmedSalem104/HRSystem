"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ephox/katamari");
var sand_1 = require("@ephox/sand");
var sugar_1 = require("@ephox/sugar");
var Delay_1 = require("tinymce/core/api/util/Delay");
var INTERVAL = 50;
var INSURANCE = 1000 / INTERVAL;
var get = function (outerWindow) {
    var isPortrait = outerWindow.matchMedia('(orientation: portrait)').matches;
    return {
        isPortrait: katamari_1.Fun.constant(isPortrait)
    };
};
var getActualWidth = function (outerWindow) {
    var isIos = sand_1.PlatformDetection.detect().os.isiOS();
    var isPortrait = get(outerWindow).isPortrait();
    return isIos && !isPortrait ? outerWindow.screen.height : outerWindow.screen.width;
};
var onChange = function (outerWindow, listeners) {
    var win = sugar_1.Element.fromDom(outerWindow);
    var poller = null;
    var change = function () {
        Delay_1.default.clearInterval(poller);
        var orientation = get(outerWindow);
        listeners.onChange(orientation);
        onAdjustment(function () {
            listeners.onReady(orientation);
        });
    };
    var orientationHandle = sugar_1.DomEvent.bind(win, 'orientationchange', change);
    var onAdjustment = function (f) {
        Delay_1.default.clearInterval(poller);
        var flag = outerWindow.innerHeight;
        var insurance = 0;
        poller = Delay_1.default.setInterval(function () {
            if (flag !== outerWindow.innerHeight) {
                Delay_1.default.clearInterval(poller);
                f(katamari_1.Option.some(outerWindow.innerHeight));
            }
            else if (insurance > INSURANCE) {
                Delay_1.default.clearInterval(poller);
                f(katamari_1.Option.none());
            }
            insurance++;
        }, INTERVAL);
    };
    var destroy = function () {
        orientationHandle.unbind();
    };
    return {
        onAdjustment: onAdjustment,
        destroy: destroy
    };
};
exports.default = {
    get: get,
    onChange: onChange,
    getActualWidth: getActualWidth
};
