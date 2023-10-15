"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ephox/katamari");
var parseToInt = function (val) {
    var re = /^[0-9\.]+(|px)$/i;
    if (re.test('' + val)) {
        return katamari_1.Option.some(parseInt(val, 10));
    }
    return katamari_1.Option.none();
};
var numToPx = function (val) {
    return katamari_1.Type.isNumber(val) ? val + 'px' : val;
};
exports.default = {
    parseToInt: parseToInt,
    numToPx: numToPx
};
