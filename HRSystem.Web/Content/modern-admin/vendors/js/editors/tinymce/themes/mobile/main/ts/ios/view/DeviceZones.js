"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sugar_1 = require("@ephox/sugar");
var Orientation_1 = require("../../touch/view/Orientation");
var Devices = require("./Devices");
var softKeyboardLimits = function (outerWindow) {
    return Devices.findDevice(outerWindow.screen.width, outerWindow.screen.height);
};
var accountableKeyboardHeight = function (outerWindow) {
    var portrait = Orientation_1.default.get(outerWindow).isPortrait();
    var limits = softKeyboardLimits(outerWindow);
    var keyboard = portrait ? limits.portrait : limits.landscape;
    var visualScreenHeight = portrait ? outerWindow.screen.height : outerWindow.screen.width;
    return (visualScreenHeight - outerWindow.innerHeight) > keyboard ? 0 : keyboard;
};
var getGreenzone = function (socket, dropup) {
    var outerWindow = sugar_1.Traverse.owner(socket).dom().defaultView;
    var viewportHeight = sugar_1.Height.get(socket) + sugar_1.Height.get(dropup);
    var acc = accountableKeyboardHeight(outerWindow);
    return viewportHeight - acc;
};
var updatePadding = function (contentBody, socket, dropup) {
    var greenzoneHeight = getGreenzone(socket, dropup);
    var deltaHeight = (sugar_1.Height.get(socket) + sugar_1.Height.get(dropup)) - greenzoneHeight;
    sugar_1.Css.set(contentBody, 'padding-bottom', deltaHeight + 'px');
};
exports.default = {
    getGreenzone: getGreenzone,
    updatePadding: updatePadding
};
