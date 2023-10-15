"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockFeatureState = void 0;
var mockFeatureState = function () {
    var demoState = false;
    var get = function () {
        return demoState;
    };
    var set = function (nu) {
        demoState = nu;
    };
    var toggle = function () {
        var nuState = demoState === true ? false : true;
        set(nuState);
        return get();
    };
    return {
        get: get,
        set: set,
        toggle: toggle,
    };
};
exports.mockFeatureState = mockFeatureState;
