"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agar_1 = require("@ephox/agar");
var mcagar_1 = require("@ephox/mcagar");
var Theme_1 = require("tinymce/themes/mobile/Theme");
var bedrock_1 = require("@ephox/bedrock");
bedrock_1.UnitTest.asynctest('browser.tinymce.themes.mobile.SkinFalseTest', function () {
    var success = arguments[arguments.length - 2];
    var failure = arguments[arguments.length - 1];
    (0, Theme_1.default)();
    mcagar_1.TinyLoader.setup(function (editor, onSuccess, onFailure) {
        agar_1.Pipeline.async({}, [], onSuccess, onFailure);
    }, {
        skin: false,
        theme: 'mobile',
        base_url: '/project/tinymce/js/tinymce'
    }, success, failure);
});
