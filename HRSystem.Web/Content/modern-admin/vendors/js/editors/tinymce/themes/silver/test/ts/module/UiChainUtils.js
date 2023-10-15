"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cExtractOnlyOne = exports.cCountNumber = void 0;
var agar_1 = require("@ephox/agar");
var katamari_1 = require("@ephox/katamari");
var cCountNumber = function (selector) { return agar_1.Chain.fromChains([
    agar_1.UiFinder.cFindAllIn(selector),
    agar_1.Chain.mapper(function (ts) { return ts.length; })
]); };
exports.cCountNumber = cCountNumber;
var cExtractOnlyOne = function (selector) { return agar_1.Chain.fromChains([
    agar_1.UiFinder.cFindAllIn(selector),
    agar_1.Chain.binder(function (ts) { return ts.length === 1 ? katamari_1.Result.value(ts[0]) : katamari_1.Result.error('Did not find exactly 1 of ' +
        selector + '. Found: ' + ts.length); })
]); };
exports.cExtractOnlyOne = cExtractOnlyOne;
