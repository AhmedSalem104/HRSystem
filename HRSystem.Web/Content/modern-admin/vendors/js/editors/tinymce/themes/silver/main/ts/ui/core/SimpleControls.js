"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tools_1 = require("tinymce/core/api/util/Tools");
var Utils_1 = require("./complex/utils/Utils");
var toggleFormat = function (editor, fmt) {
    return function () {
        editor.execCommand('mceToggleFormat', false, fmt);
    };
};
var registerFormatButtons = function (editor) {
    Tools_1.default.each([
        { name: 'bold', text: 'Bold', icon: 'bold' },
        { name: 'italic', text: 'Italic', icon: 'italic' },
        { name: 'underline', text: 'Underline', icon: 'underline' },
        { name: 'strikethrough', text: 'Strikethrough', icon: 'strike-through' },
        { name: 'subscript', text: 'Subscript', icon: 'subscript' },
        { name: 'superscript', text: 'Superscript', icon: 'superscript' }
    ], function (btn, idx) {
        editor.ui.registry.addToggleButton(btn.name, {
            tooltip: btn.text,
            icon: btn.icon,
            onSetup: (0, Utils_1.onSetupFormatToggle)(editor, btn.name),
            onAction: toggleFormat(editor, btn.name)
        });
    });
    for (var i = 1; i <= 6; i++) {
        var name_1 = 'h' + i;
        editor.ui.registry.addToggleButton(name_1, {
            text: name_1.toUpperCase(),
            tooltip: 'Heading ' + i,
            onSetup: (0, Utils_1.onSetupFormatToggle)(editor, name_1),
            onAction: toggleFormat(editor, name_1)
        });
    }
};
var registerCommandButtons = function (editor) {
    Tools_1.default.each([
        { name: 'cut', text: 'Cut', action: 'Cut', icon: 'cut' },
        { name: 'copy', text: 'Copy', action: 'Copy', icon: 'copy' },
        { name: 'paste', text: 'Paste', action: 'Paste', icon: 'paste' },
        { name: 'help', text: 'Help', action: 'mceHelp', icon: 'help' },
        { name: 'selectall', text: 'Select all', action: 'SelectAll', icon: 'select-all' },
        { name: 'newdocument', text: 'New document', action: 'mceNewDocument', icon: 'new-document' },
        { name: 'removeformat', text: 'Clear formatting', action: 'RemoveFormat', icon: 'remove-formatting' },
        { name: 'remove', text: 'Remove', action: 'Delete', icon: 'remove' }
    ], function (btn) {
        editor.ui.registry.addButton(btn.name, {
            tooltip: btn.text,
            icon: btn.icon,
            onAction: function () { return editor.execCommand(btn.action); }
        });
    });
};
var registerCommandToggleButtons = function (editor) {
    Tools_1.default.each([
        { name: 'blockquote', text: 'Blockquote', action: 'mceBlockQuote', icon: 'quote' },
    ], function (btn) {
        editor.ui.registry.addToggleButton(btn.name, {
            tooltip: btn.text,
            icon: btn.icon,
            onAction: function () { return editor.execCommand(btn.action); },
            onSetup: (0, Utils_1.onSetupFormatToggle)(editor, btn.name)
        });
    });
};
var registerButtons = function (editor) {
    registerFormatButtons(editor);
    registerCommandButtons(editor);
    registerCommandToggleButtons(editor);
};
var registerMenuItems = function (editor) {
    Tools_1.default.each([
        { name: 'bold', text: 'Bold', action: 'Bold', icon: 'bold', shortcut: 'Meta+B' },
        { name: 'italic', text: 'Italic', action: 'Italic', icon: 'italic', shortcut: 'Meta+I' },
        { name: 'underline', text: 'Underline', action: 'Underline', icon: 'underline', shortcut: 'Meta+U' },
        { name: 'strikethrough', text: 'Strikethrough', action: 'Strikethrough', icon: 'strike-through', shortcut: '' },
        { name: 'subscript', text: 'Subscript', action: 'Subscript', icon: 'subscript', shortcut: '' },
        { name: 'superscript', text: 'Superscript', action: 'Superscript', icon: 'superscript', shortcut: '' },
        { name: 'removeformat', text: 'Clear formatting', action: 'RemoveFormat', icon: 'remove-formatting', shortcut: '' },
        { name: 'newdocument', text: 'New document', action: 'mceNewDocument', icon: 'new-document', shortcut: '' },
        { name: 'cut', text: 'Cut', action: 'Cut', icon: 'cut', shortcut: 'Meta+X' },
        { name: 'copy', text: 'Copy', action: 'Copy', icon: 'copy', shortcut: 'Meta+C' },
        { name: 'paste', text: 'Paste', action: 'Paste', icon: 'paste', shortcut: 'Meta+V' },
        { name: 'selectall', text: 'Select all', action: 'SelectAll', icon: 'select-all', shortcut: 'Meta+A' }
    ], function (btn) {
        editor.ui.registry.addMenuItem(btn.name, {
            text: btn.text,
            icon: btn.icon,
            shortcut: btn.shortcut,
            onAction: function () { return editor.execCommand(btn.action); }
        });
    });
    editor.ui.registry.addMenuItem('codeformat', {
        text: 'Code',
        icon: 'sourcecode',
        onAction: toggleFormat(editor, 'code')
    });
};
var register = function (editor) {
    registerButtons(editor);
    registerMenuItems(editor);
};
exports.default = {
    register: register
};
