"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readOnlyOnInit = exports.isSkinDisabled = void 0;
var isSkinDisabled = function (editor) {
    return editor.settings.skin === false;
};
exports.isSkinDisabled = isSkinDisabled;
var readOnlyOnInit = function (editor) {
    return false;
};
exports.readOnlyOnInit = readOnlyOnInit;
