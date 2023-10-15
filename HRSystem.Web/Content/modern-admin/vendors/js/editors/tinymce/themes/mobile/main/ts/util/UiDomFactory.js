"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spec = exports.dom = void 0;
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var Styles_1 = require("../style/Styles");
var dom = function (rawHtml) {
    var html = katamari_1.Strings.supplant(rawHtml, {
        prefix: Styles_1.default.prefix()
    });
    return alloy_1.DomFactory.fromHtml(html);
};
exports.dom = dom;
var spec = function (rawHtml) {
    var sDom = dom(rawHtml);
    return {
        dom: sDom
    };
};
exports.spec = spec;
