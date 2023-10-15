"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.getOr = exports.getFirst = void 0;
var katamari_1 = require("@ephox/katamari");
var defaultIcon = function (icons) {
    return katamari_1.Option.from(icons()['temporary-placeholder']).getOr('!not found!');
};
var get = function (name, icons) {
    return katamari_1.Option.from(icons()[name]).getOrThunk(function () { return defaultIcon(icons); });
};
exports.get = get;
var getOr = function (name, icons, fallback) {
    return katamari_1.Option.from(icons()[name]).or(fallback).getOrThunk(function () { return defaultIcon(icons); });
};
exports.getOr = getOr;
var getFirst = function (names, icons) {
    return katamari_1.Options.findMap(names, function (name) { return katamari_1.Option.from(icons()[name]); }).getOrThunk(function () { return defaultIcon(icons); });
};
exports.getFirst = getFirst;
