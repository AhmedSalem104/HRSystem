"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alloy_1 = require("@ephox/alloy");
var sugar_1 = require("@ephox/sugar");
var dom_globals_1 = require("@ephox/dom-globals");
var TestBackstage_1 = require("./TestBackstage");
exports.default = (function () {
    var oldSink = dom_globals_1.document.querySelectorAll('.mce-silver-sink');
    if (oldSink.length > 0) {
        throw Error('old sinks found, a previous test did not call helpers.destroy() leaving artifacts, found: ' + oldSink.length);
    }
    var sink = alloy_1.GuiFactory.build({
        dom: alloy_1.DomFactory.fromHtml('<div class="mce-silver-sink"></div>'),
        behaviours: alloy_1.Behaviour.derive([
            alloy_1.Positioning.config({
                useFixed: true
            })
        ])
    });
    var uiMothership = alloy_1.Gui.create();
    sugar_1.Class.add(uiMothership.element(), 'tox');
    var backstage = (0, TestBackstage_1.default)(sink);
    var mockEditor = {
        setContent: function (content) { },
        insertContent: function (content, args) { },
        execCommand: function (cmd, ui, value) { },
    };
    var extras = {
        editor: mockEditor,
        backstage: backstage
    };
    uiMothership.add(sink);
    alloy_1.Attachment.attachSystem(sugar_1.Body.body(), uiMothership);
    var destroy = function () {
        uiMothership.remove(sink);
        uiMothership.destroy();
    };
    return {
        backstage: backstage,
        shared: backstage.shared,
        extras: extras,
        destroy: destroy,
        uiMothership: uiMothership,
        mockEditor: mockEditor
    };
});
