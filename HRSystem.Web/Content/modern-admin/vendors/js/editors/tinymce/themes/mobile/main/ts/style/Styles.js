"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ephox/katamari");
var prefix = 'tinymce-mobile';
var resolve = function (p) {
    return prefix + '-' + p;
};
exports.default = {
    resolve: resolve,
    prefix: katamari_1.Fun.constant(prefix)
};
