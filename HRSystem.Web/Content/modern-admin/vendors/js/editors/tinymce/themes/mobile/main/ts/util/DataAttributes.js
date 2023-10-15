"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sugar_1 = require("@ephox/sugar");
var safeParse = function (element, attribute) {
    var parsed = parseInt(sugar_1.Attr.get(element, attribute), 10);
    return isNaN(parsed) ? 0 : parsed;
};
exports.default = {
    safeParse: safeParse
};
