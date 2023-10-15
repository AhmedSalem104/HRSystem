"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toggleUndoRedoState = function (api, editor, type) {
    var checkState = function () {
        return editor.undoManager ? editor.undoManager[type]() : false;
    };
    var onUndoStateChange = function () {
        api.setDisabled(editor.readonly || !checkState());
    };
    api.setDisabled(!checkState());
    editor.on('Undo Redo AddUndo TypingUndo ClearUndos SwitchMode', onUndoStateChange);
    return function () { return editor.off('Undo Redo AddUndo TypingUndo ClearUndos SwitchMode', onUndoStateChange); };
};
var registerMenuItems = function (editor) {
    editor.ui.registry.addMenuItem('undo', {
        text: 'Undo',
        icon: 'undo',
        shortcut: 'Meta+Z',
        onSetup: function (api) { return toggleUndoRedoState(api, editor, 'hasUndo'); },
        onAction: function () { return editor.execCommand('undo'); }
    });
    editor.ui.registry.addMenuItem('redo', {
        text: 'Redo',
        icon: 'redo',
        shortcut: 'Meta+Y',
        onSetup: function (api) { return toggleUndoRedoState(api, editor, 'hasRedo'); },
        onAction: function () { return editor.execCommand('redo'); }
    });
};
var registerButtons = function (editor) {
    editor.ui.registry.addButton('undo', {
        tooltip: 'Undo',
        icon: 'undo',
        onSetup: function (api) { return toggleUndoRedoState(api, editor, 'hasUndo'); },
        onAction: function () { return editor.execCommand('undo'); }
    });
    editor.ui.registry.addButton('redo', {
        tooltip: 'Redo',
        icon: 'redo',
        onSetup: function (api) { return toggleUndoRedoState(api, editor, 'hasRedo'); },
        onAction: function () { return editor.execCommand('redo'); }
    });
};
var register = function (editor) {
    registerMenuItems(editor);
    registerButtons(editor);
};
exports.default = {
    register: register
};
