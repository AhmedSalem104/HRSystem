"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alloy_1 = require("@ephox/alloy");
var boulder_1 = require("@ephox/boulder");
var TinyChannels_1 = require("./TinyChannels");
var format = function (command, update) {
    return alloy_1.Receiving.config({
        channels: boulder_1.Objects.wrap(TinyChannels_1.default.formatChanged(), {
            onReceive: function (button, data) {
                if (data.command === command) {
                    update(button, data.state);
                }
            }
        })
    });
};
var orientation = function (onReceive) {
    return alloy_1.Receiving.config({
        channels: boulder_1.Objects.wrap(TinyChannels_1.default.orientationChanged(), {
            onReceive: onReceive
        })
    });
};
var receive = function (channel, onReceive) {
    return {
        key: channel,
        value: {
            onReceive: onReceive
        }
    };
};
exports.default = {
    format: format,
    orientation: orientation,
    receive: receive
};
