"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onControlDetached = exports.onControlAttached = exports.runWithApi = void 0;
var alloy_1 = require("@ephox/alloy");
var runWithApi = function (info, comp) {
    var api = info.getApi(comp);
    return function (f) {
        f(api);
    };
};
exports.runWithApi = runWithApi;
var onControlAttached = function (info, editorOffCell) {
    return alloy_1.AlloyEvents.runOnAttached(function (comp) {
        var run = runWithApi(info, comp);
        run(function (api) {
            var onDestroy = info.onSetup(api);
            if (onDestroy !== null && onDestroy !== undefined) {
                editorOffCell.set(onDestroy);
            }
        });
    });
};
exports.onControlAttached = onControlAttached;
var onControlDetached = function (getApi, editorOffCell) {
    return alloy_1.AlloyEvents.runOnDetached(function (comp) { return runWithApi(getApi, comp)(editorOffCell.get()); });
};
exports.onControlDetached = onControlDetached;
