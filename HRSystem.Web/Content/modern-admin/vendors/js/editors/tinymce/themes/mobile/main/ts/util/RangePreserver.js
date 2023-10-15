"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ephox/katamari");
var sand_1 = require("@ephox/sand");
var platform = sand_1.PlatformDetection.detect();
var preserve = function (f, editor) {
    var rng = editor.selection.getRng();
    f();
    editor.selection.setRng(rng);
};
var forAndroid = function (editor, f) {
    var wrapper = platform.os.isAndroid() ? preserve : katamari_1.Fun.apply;
    wrapper(f, editor);
};
exports.default = {
    forAndroid: forAndroid
};
