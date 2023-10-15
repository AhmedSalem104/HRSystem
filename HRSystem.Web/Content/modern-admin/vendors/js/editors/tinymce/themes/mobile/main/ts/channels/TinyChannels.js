"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ephox/katamari");
var formatChanged = 'formatChanged';
var orientationChanged = 'orientationChanged';
var dropupDismissed = 'dropupDismissed';
exports.default = {
    formatChanged: katamari_1.Fun.constant(formatChanged),
    orientationChanged: katamari_1.Fun.constant(orientationChanged),
    dropupDismissed: katamari_1.Fun.constant(dropupDismissed)
};
