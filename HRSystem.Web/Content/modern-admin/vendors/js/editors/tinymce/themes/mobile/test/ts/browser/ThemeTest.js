"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agar_1 = require("@ephox/agar");
var bedrock_1 = require("@ephox/bedrock");
var dom_globals_1 = require("@ephox/dom-globals");
var mcagar_1 = require("@ephox/mcagar");
var sugar_1 = require("@ephox/sugar");
var Plugin_1 = require("tinymce/plugins/contextmenu/Plugin");
var Plugin_2 = require("tinymce/plugins/image/Plugin");
var Plugin_3 = require("tinymce/plugins/link/Plugin");
var Plugin_4 = require("tinymce/plugins/paste/Plugin");
var Plugin_5 = require("tinymce/plugins/table/Plugin");
var Plugin_6 = require("tinymce/plugins/textpattern/Plugin");
var Styles_1 = require("tinymce/themes/mobile/style/Styles");
var Theme_1 = require("tinymce/themes/mobile/Theme");
bedrock_1.UnitTest.asynctest('browser.tinymce.themes.mobile.ThemeTest', function (success, failure) {
    (0, Theme_1.default)();
    (0, Plugin_2.default)();
    (0, Plugin_5.default)();
    (0, Plugin_3.default)();
    (0, Plugin_4.default)();
    (0, Plugin_1.default)();
    (0, Plugin_6.default)();
    mcagar_1.TinyLoader.setup(function (editor, onSuccess, onFailure) {
        var ui = (0, mcagar_1.TinyUi)(editor);
        agar_1.Pipeline.async({}, [
            agar_1.UiFinder.sExists(sugar_1.Element.fromDom(dom_globals_1.document.body), ".".concat(Styles_1.default.resolve('mask-tap-icon'))),
            ui.sClickOnUi('Click the tap to edit button', ".".concat(Styles_1.default.resolve('mask-tap-icon'))),
            ui.sWaitForUi('Wait mobile Toolbar', ".".concat(Styles_1.default.resolve('toolbar'))),
            ui.sWaitForUi('Check for The first group', '[aria-label="The first group"]'),
            ui.sWaitForUi('Check for the action group', '[aria-label="the action group"]'),
            agar_1.UiFinder.sNotExists(sugar_1.Element.fromDom(dom_globals_1.document.body), '[aria-label="The read only mode group"]'),
            agar_1.UiFinder.sNotExists(sugar_1.Element.fromDom(dom_globals_1.document.body), ".".concat(Styles_1.default.resolve('mask-edit-icon'))),
            ui.sClickOnUi('Click back to Tap to Edit screen', ".".concat(Styles_1.default.resolve('icon-back'))),
            agar_1.UiFinder.sExists(sugar_1.Element.fromDom(dom_globals_1.document.body), ".".concat(Styles_1.default.resolve('mask-tap-icon'))),
        ], onSuccess, onFailure);
    }, {
        theme: 'mobile',
        plugins: 'image table link paste textpattern',
        insert_toolbar: 'quickimage media quicktable',
        selection_toolbar: 'bold italic | quicklink h1 h2 blockquote',
        inline: false,
        base_url: '/project/tinymce/js/tinymce'
    }, success, failure);
});
