"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ephox/katamari");
var LocalStorage_1 = require("tinymce/core/api/util/LocalStorage");
var storageName = 'tinymce-custom-colors';
exports.default = (function (max) {
    if (max === void 0) { max = 10; }
    var storageString = LocalStorage_1.default.getItem(storageName);
    var localstorage = katamari_1.Type.isString(storageString) ? JSON.parse(storageString) : [];
    var prune = function (list) {
        var diff = max - list.length;
        return (diff < 0) ? list.slice(0, max) : list;
    };
    var cache = prune(localstorage);
    var add = function (key) {
        katamari_1.Arr.indexOf(cache, key).each(remove);
        cache.unshift(key);
        if (cache.length > max) {
            cache.pop();
        }
        LocalStorage_1.default.setItem(storageName, JSON.stringify(cache));
    };
    var remove = function (idx) {
        cache.splice(idx, 1);
    };
    var state = function () {
        return cache.slice(0);
    };
    return {
        add: add,
        state: state
    };
});
