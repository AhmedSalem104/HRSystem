"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_1 = require("@ephox/bedrock");
var Icons_1 = require("tinymce/themes/silver/ui/icons/Icons");
var agar_1 = require("@ephox/agar");
var oxide_icons_default_1 = require("@tinymce/oxide-icons-default");
var mcagar_1 = require("@ephox/mcagar");
var Theme_1 = require("tinymce/themes/silver/Theme");
bedrock_1.UnitTest.asynctest('IconsTest', function (success, failure) {
    (0, Theme_1.default)();
    mcagar_1.TinyLoader.setupLight(function (editor, onSuccess, onFailure) {
        var iconIndent = (0, oxide_icons_default_1.getAll)().indent;
        var iconDefault = (0, oxide_icons_default_1.getAll)()['temporary-placeholder'];
        var iconProvider = function () { return editor.ui.registry.getAll().icons; };
        var emptyIconProvider = function () { return ({}); };
        var getTest = agar_1.Step.sync(function () {
            agar_1.Assertions.assertEq('When an icon exists as a default icon or provided, it should be returned', iconIndent, (0, Icons_1.get)('indent', iconProvider));
            agar_1.Assertions.assertEq('When an icon does not exist as a default icon, the temporary placeholder or fallback icon should be returned', iconDefault, (0, Icons_1.get)('temp_icon', iconProvider));
            agar_1.Assertions.assertEq('When a default icon or fallback does not exist, !not found! should be returned', '!not found!', (0, Icons_1.get)('indent', emptyIconProvider));
        });
        agar_1.Pipeline.async({}, [
            getTest,
        ], onSuccess, onFailure);
    }, {
        base_url: '/project/tinymce/js/tinymce'
    }, success, failure);
});
