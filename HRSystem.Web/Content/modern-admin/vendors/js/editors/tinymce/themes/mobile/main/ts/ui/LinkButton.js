"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sketch = void 0;
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var LinkBridge_1 = require("../bridge/LinkBridge");
var RangePreserver_1 = require("../util/RangePreserver");
var Buttons_1 = require("./Buttons");
var Inputs = require("./Inputs");
var SerialisedDialog = require("./SerialisedDialog");
var getGroups = katamari_1.Thunk.cached(function (realm, editor) {
    return [
        {
            label: 'the link group',
            items: [
                SerialisedDialog.sketch({
                    fields: [
                        Inputs.field('url', 'Type or paste URL'),
                        Inputs.field('text', 'Link text'),
                        Inputs.field('title', 'Link title'),
                        Inputs.field('target', 'Link target'),
                        Inputs.hidden('link')
                    ],
                    maxFieldIndex: ['url', 'text', 'title', 'target'].length - 1,
                    getInitialValue: function () {
                        return katamari_1.Option.some(LinkBridge_1.default.getInfo(editor));
                    },
                    onExecute: function (dialog) {
                        var info = alloy_1.Representing.getValue(dialog);
                        LinkBridge_1.default.applyInfo(editor, info);
                        realm.restoreToolbar();
                        editor.focus();
                    }
                })
            ]
        }
    ];
});
var sketch = function (realm, editor) {
    return Buttons_1.default.forToolbarStateAction(editor, 'link', 'link', function () {
        var groups = getGroups(realm, editor);
        realm.setContextToolbar(groups);
        RangePreserver_1.default.forAndroid(editor, function () {
            realm.focusToolbar();
        });
        LinkBridge_1.default.query(editor).each(function (link) {
            editor.selection.select(link.dom());
        });
    });
};
exports.sketch = sketch;
