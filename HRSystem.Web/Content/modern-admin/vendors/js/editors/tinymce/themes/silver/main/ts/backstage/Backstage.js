"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
var katamari_1 = require("@ephox/katamari");
var I18n_1 = require("tinymce/core/api/util/I18n");
var UiFactory = require("tinymce/themes/silver/ui/general/UiFactory");
var Anchors_1 = require("./Anchors");
var ColorInputBackstage_1 = require("./ColorInputBackstage");
var StyleFormatsBackstage_1 = require("./StyleFormatsBackstage");
var UrlInputBackstage_1 = require("./UrlInputBackstage");
var DialogBackstage_1 = require("./DialogBackstage");
var init = function (sink, editor, lazyAnchorbar, lazyMoreButton) {
    var backstage = {
        shared: {
            providers: {
                icons: function () { return editor.ui.registry.getAll().icons; },
                menuItems: function () { return editor.ui.registry.getAll().menuItems; },
                translate: I18n_1.default.translate
            },
            interpreter: function (s) {
                return UiFactory.interpretWithoutForm(s, backstage);
            },
            anchors: Anchors_1.default.getAnchors(editor, lazyAnchorbar, lazyMoreButton),
            getSink: function () { return katamari_1.Result.value(sink); }
        },
        urlinput: (0, UrlInputBackstage_1.UrlInputBackstage)(editor),
        styleselect: (0, StyleFormatsBackstage_1.init)(editor),
        colorinput: (0, ColorInputBackstage_1.ColorInputBackstage)(editor),
        dialog: (0, DialogBackstage_1.DialogBackstage)(editor)
    };
    return backstage;
};
exports.init = init;
