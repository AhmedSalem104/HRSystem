"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agar_1 = require("@ephox/agar");
var bedrock_1 = require("@ephox/bedrock");
var mcagar_1 = require("@ephox/mcagar");
var sand_1 = require("@ephox/sand");
var sugar_1 = require("@ephox/sugar");
var Styles_1 = require("tinymce/themes/mobile/style/Styles");
var Theme_1 = require("tinymce/themes/mobile/Theme");
bedrock_1.UnitTest.asynctest('browser.tinymce.themes.mobile.EditorRemoveTest', function (success, failure) {
    var platform = sand_1.PlatformDetection.detect();
    if (platform.browser.isIE() || platform.browser.isEdge()) {
        return success();
    }
    (0, Theme_1.default)();
    var cleanedThorAttrsStruct = function (str) {
        return {
            'position': str.none(),
            'background-color': str.none(),
        };
    };
    agar_1.Pipeline.async({}, [
        agar_1.Chain.asStep({}, [
            mcagar_1.Editor.cFromSettings({
                theme: 'mobile',
                inline: false,
                base_url: '/project/tinymce/js/tinymce'
            }),
            agar_1.Chain.op(function (editor) {
                var wrapperElm = sugar_1.Element.fromHtml('<div class="tinymce-editor"></div>');
                sugar_1.Selectors.one('#' + editor.id).each(function (textareaElm) {
                    sugar_1.Insert.wrap(textareaElm, wrapperElm);
                });
                sugar_1.Selectors.one('.tinymce-mobile-outer-container').each(function (editorElm) {
                    sugar_1.Insert.wrap(editorElm, wrapperElm);
                });
            }),
            agar_1.NamedChain.asChain([
                agar_1.NamedChain.direct(agar_1.NamedChain.inputName(), agar_1.Chain.identity, 'editor'),
                agar_1.NamedChain.writeValue('body', sugar_1.Body.body()),
                agar_1.NamedChain.direct('body', agar_1.UiFinder.cExists(".".concat(Styles_1.default.resolve('mask-tap-icon'))), '_'),
                agar_1.NamedChain.direct('body', mcagar_1.UiChains.cClickOnUi('Click the tap to edit button', ".".concat(Styles_1.default.resolve('mask-tap-icon'))), '_'),
                agar_1.NamedChain.direct('body', mcagar_1.UiChains.cWaitForUi('Wait mobile Toolbar', ".".concat(Styles_1.default.resolve('toolbar'))), '_'),
                agar_1.NamedChain.direct('body', mcagar_1.UiChains.cWaitForUi('Check for The first group', '[aria-label="The first group"]'), '_'),
                agar_1.NamedChain.direct('body', mcagar_1.UiChains.cWaitForUi('Check for the action group', '[aria-label="the action group"]'), '_'),
                agar_1.NamedChain.direct('body', agar_1.UiFinder.cNotExists('[aria-label="The read only mode group"]'), '_'),
                agar_1.NamedChain.direct('body', agar_1.UiFinder.cNotExists(".".concat(Styles_1.default.resolve('mask-edit-icon'))), '_'),
                agar_1.NamedChain.direct('body', mcagar_1.UiChains.cClickOnUi('Click back to Tap to Edit screen', ".".concat(Styles_1.default.resolve('icon-back'))), '_'),
                agar_1.NamedChain.direct('body', agar_1.UiFinder.cExists(".".concat(Styles_1.default.resolve('mask-tap-icon'))), '_'),
                agar_1.NamedChain.outputInput
            ]),
            mcagar_1.Editor.cRemove,
            agar_1.Chain.mapper(function () { return sugar_1.Body.body(); }),
            agar_1.Assertions.cAssertStructure('Assert Thor overrides removed from body', agar_1.ApproxStructure.build(function (s, str) {
                return s.element('body', {
                    attrs: cleanedThorAttrsStruct(str),
                });
            })),
            agar_1.UiFinder.cFindIn('div.tinymce-editor'),
            agar_1.Assertions.cAssertStructure('Assert Thor overrides removed from editor div', agar_1.ApproxStructure.build(function (s, str) {
                return s.element('div', {
                    attrs: cleanedThorAttrsStruct(str),
                    children: []
                });
            })),
            agar_1.Chain.op(function (editorElm) {
                sugar_1.Remove.remove(editorElm);
            })
        ])
    ], success, failure);
});
