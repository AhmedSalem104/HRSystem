"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ephox/katamari");
var TinyChannels_1 = require("../channels/TinyChannels");
var fontSizes = ['x-small', 'small', 'medium', 'large', 'x-large'];
var fireChange = function (realm, command, state) {
    realm.system().broadcastOn([TinyChannels_1.default.formatChanged()], {
        command: command,
        state: state
    });
};
var init = function (realm, editor) {
    var allFormats = katamari_1.Obj.keys(editor.formatter.get());
    katamari_1.Arr.each(allFormats, function (command) {
        editor.formatter.formatChanged(command, function (state) {
            fireChange(realm, command, state);
        });
    });
    katamari_1.Arr.each(['ul', 'ol'], function (command) {
        editor.selection.selectorChanged(command, function (state, data) {
            fireChange(realm, command, state);
        });
    });
};
exports.default = {
    init: init,
    fontSizes: katamari_1.Fun.constant(fontSizes)
};
