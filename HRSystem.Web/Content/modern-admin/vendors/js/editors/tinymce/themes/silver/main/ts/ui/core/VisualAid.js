"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toggleVisualAidState = function (api, editor) {
    api.setActive(editor.hasVisual);
    var onVisualAid = function (e) {
        api.setActive(e.hasVisual);
    };
    editor.on('VisualAid', onVisualAid);
    return function () { return editor.off('VisualAid', onVisualAid); };
};
var registerMenuItems = function (editor) {
    editor.ui.registry.addToggleMenuItem('visualaid', {
        text: 'Visual aids',
        onSetup: function (api) { return toggleVisualAidState(api, editor); },
        onAction: function () {
            editor.execCommand('mceToggleVisualAid');
        }
    });
};
var registerToolbarButton = function (editor) {
    editor.ui.registry.addButton('visualaid', {
        tooltip: 'Visual aids',
        text: 'Visual aids',
        onAction: function () { return editor.execCommand('mceToggleVisualAid'); }
    });
};
var register = function (editor) {
    registerToolbarButton(editor);
    registerMenuItems(editor);
};
exports.default = {
    register: register
};
