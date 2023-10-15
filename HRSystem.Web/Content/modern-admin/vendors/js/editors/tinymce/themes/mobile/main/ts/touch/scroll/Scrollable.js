"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var Styles_1 = require("../../style/Styles");
var scrollable = Styles_1.default.resolve('scrollable');
var register = function (element) {
    sugar_1.Class.add(element, scrollable);
};
var deregister = function (element) {
    sugar_1.Class.remove(element, scrollable);
};
exports.default = {
    register: register,
    deregister: deregister,
    scrollable: katamari_1.Fun.constant(scrollable)
};
