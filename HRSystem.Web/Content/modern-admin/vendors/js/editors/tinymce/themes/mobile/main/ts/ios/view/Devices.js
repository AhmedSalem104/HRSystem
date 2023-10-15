"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDevice = void 0;
var katamari_1 = require("@ephox/katamari");
var findDevice = function (deviceWidth, deviceHeight) {
    var devices = [
        { width: 320, height: 480, keyboard: { portrait: 300, landscape: 240 } },
        { width: 320, height: 568, keyboard: { portrait: 300, landscape: 240 } },
        { width: 375, height: 667, keyboard: { portrait: 305, landscape: 240 } },
        { width: 414, height: 736, keyboard: { portrait: 320, landscape: 240 } },
        { width: 768, height: 1024, keyboard: { portrait: 320, landscape: 400 } },
        { width: 1024, height: 1366, keyboard: { portrait: 380, landscape: 460 } }
    ];
    return katamari_1.Options.findMap(devices, function (device) {
        return katamari_1.Options.someIf(deviceWidth <= device.width && deviceHeight <= device.height, device.keyboard);
    }).getOr({ portrait: deviceHeight / 5, landscape: deviceWidth / 4 });
};
exports.findDevice = findDevice;
