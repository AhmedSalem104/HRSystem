"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toggleOutdentState = function (api, editor) {
    api.setDisabled(!editor.queryCommandState('outdent'));
    var onNodeChange = function () {
        api.setDisabled(!editor.queryCommandState('outdent'));
    };
    editor.on('NodeChange', onNodeChange);
    return function () { return editor.off('NodeChange', onNodeChange); };
};
var registerButtons = function (editor) {
    editor.ui.registry.addButton('outdent', {
        tooltip: 'Decrease indent',
        icon: 'outdent',
        onSetup: function (api) { return toggleOutdentState(api, editor); },
        onAction: function () { return editor.execCommand('outdent'); }
    });
    editor.ui.registry.addButton('indent', {
        tooltip: 'Increase indent',
        icon: 'indent',
        onAction: function () { return editor.execCommand('indent'); }
    });
};
var register = function (editor) {
    registerButtons(editor);
};
exports.default = {
    register: register
};
