"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inline = exports.iframe = void 0;
var Settings_1 = require("../../api/Settings");
var SkinLoaded_1 = require("./SkinLoaded");
var DOMUtils_1 = require("tinymce/core/api/dom/DOMUtils");
var katamari_1 = require("@ephox/katamari");
var loadSkin = function (isInline, editor) {
    var skinUrl = (0, Settings_1.getSkinUrl)(editor);
    var skinUiCss;
    if (skinUrl) {
        skinUiCss = skinUrl + '/skin.min.css';
        editor.contentCSS.push(skinUrl + (isInline ? '/content.inline' : '/content') + '.min.css');
    }
    if ((0, Settings_1.isSkinDisabled)(editor) === false && skinUiCss) {
        DOMUtils_1.default.DOM.styleSheetLoader.load(skinUiCss, SkinLoaded_1.default.fireSkinLoaded(editor));
    }
    else {
        SkinLoaded_1.default.fireSkinLoaded(editor)();
    }
};
var iframe = katamari_1.Fun.curry(loadSkin, false);
exports.iframe = iframe;
var inline = katamari_1.Fun.curry(loadSkin, true);
exports.inline = inline;
