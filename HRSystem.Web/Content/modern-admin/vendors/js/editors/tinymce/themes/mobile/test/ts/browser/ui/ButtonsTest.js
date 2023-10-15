"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agar_1 = require("@ephox/agar");
var alloy_1 = require("@ephox/alloy");
var bedrock_1 = require("@ephox/bedrock");
var sugar_1 = require("@ephox/sugar");
var TinyChannels_1 = require("tinymce/themes/mobile/channels/TinyChannels");
var Buttons_1 = require("tinymce/themes/mobile/ui/Buttons");
var IosRealm_1 = require("tinymce/themes/mobile/ui/IosRealm");
var TestEditor_1 = require("../../module/test/ui/TestEditor");
var TestStyles_1 = require("../../module/test/ui/TestStyles");
var TestUi_1 = require("../../module/test/ui/TestUi");
var katamari_1 = require("@ephox/katamari");
bedrock_1.UnitTest.asynctest('Browser Test: ui.ButtonsTest', function (success, failure) {
    var realm = (0, IosRealm_1.default)(katamari_1.Fun.noop);
    var body = sugar_1.Body.body();
    alloy_1.Attachment.attachSystem(body, realm.system());
    sugar_1.Class.add(realm.system().element(), 'tinymce-mobile-fullscreen-maximized');
    var doc = sugar_1.Traverse.owner(body);
    TestStyles_1.default.addStyles();
    var unload = function () {
        TestStyles_1.default.removeStyles();
        alloy_1.Attachment.detachSystem(realm.system());
    };
    var tEditor = (0, TestEditor_1.default)();
    var memAlpha = alloy_1.Memento.record(Buttons_1.default.forToolbarCommand(tEditor.editor(), 'alpha'));
    var memBeta = alloy_1.Memento.record(Buttons_1.default.forToolbarStateCommand(tEditor.editor(), 'beta'));
    var memGamma = alloy_1.Memento.record(Buttons_1.default.forToolbarStateAction(tEditor.editor(), 'gamma-class', 'gamma-query', function () {
        tEditor.adder('gamma-action')();
    }));
    var sClickAlpha = TestUi_1.default.sClickComponent(realm, memAlpha);
    var sClickBeta = TestUi_1.default.sClickComponent(realm, memBeta);
    var sClickGamma = TestUi_1.default.sClickComponent(realm, memGamma);
    var sCheckComponent = function (label, state) {
        return function (memento) {
            return TestUi_1.default.sWaitForToggledState(label, state, realm, memento);
        };
    };
    realm.setToolbarGroups([
        {
            label: 'group1',
            items: [
                memAlpha.asSpec(),
                memBeta.asSpec(),
                memGamma.asSpec()
            ]
        }
    ]);
    var sTestAlpha = agar_1.GeneralSteps.sequence([
        tEditor.sAssertEq('Initially empty', []),
        sClickAlpha,
        tEditor.sAssertEq('After clicking on alpha', [
            {
                method: 'execCommand',
                data: {
                    alpha: undefined
                }
            }
        ]),
        tEditor.sClear
    ]);
    var sTestBeta = agar_1.GeneralSteps.sequence([
        tEditor.sAssertEq('before beta, store is empty', []),
        sClickBeta,
        tEditor.sAssertEq('After clicking on beta', [
            {
                method: 'execCommand',
                data: {
                    beta: undefined
                }
            }
        ]),
        tEditor.sClear,
        sCheckComponent('Initially, beta should be unselected', false)(memBeta),
        TestUi_1.default.sBroadcastState(realm, [TinyChannels_1.default.formatChanged()], 'beta', true),
        sCheckComponent('After broadcast, beta should be selected', true)(memBeta),
        tEditor.sClear
    ]);
    var sTestGamma = agar_1.GeneralSteps.sequence([
        tEditor.sAssertEq('before gamma, store is empty', []),
        sClickGamma,
        tEditor.sAssertEq('After clicking on gamma', ['gamma-action']),
        tEditor.sClear,
        sCheckComponent('Initially, gamma should be unselected', false)(memGamma),
        TestUi_1.default.sBroadcastState(realm, [TinyChannels_1.default.formatChanged()], 'gamma-query', true),
        sCheckComponent('After broadcast, gamma should be selected', true)(memGamma)
    ]);
    agar_1.Pipeline.async({}, [
        alloy_1.TestHelpers.GuiSetup.mAddStyles(doc, [
            '.tinymce-mobile-icon-alpha:before { content: "ALPHA"; }',
            '.tinymce-mobile-icon-beta:before { content: "BETA"; }',
            '.tinymce-mobile-icon-gamma-class:before { content: "GAMMA"; }'
        ]),
        TestStyles_1.default.sWaitForToolstrip(realm),
        sTestAlpha,
        sTestBeta,
        sTestGamma
    ], function () {
        unload();
        success();
    }, failure);
});
