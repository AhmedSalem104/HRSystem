"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fireSkinLoaded = function (editor) {
    return editor.fire('SkinLoaded');
};
var fireResizeEditor = function (editor) {
    return editor.fire('ResizeEditor');
};
var fireBeforeRenderUI = function (editor) {
    return editor.fire('BeforeRenderUI');
};
var fireResizeContent = function (editor) {
    return editor.fire('ResizeContent');
};
var fireTextColorChange = function (editor, data) {
    editor.fire('TextColorChange', data);
};
exports.default = {
    fireSkinLoaded: fireSkinLoaded,
    fireResizeEditor: fireResizeEditor,
    fireBeforeRenderUI: fireBeforeRenderUI,
    fireResizeContent: fireResizeContent,
    fireTextColorChange: fireTextColorChange
};
