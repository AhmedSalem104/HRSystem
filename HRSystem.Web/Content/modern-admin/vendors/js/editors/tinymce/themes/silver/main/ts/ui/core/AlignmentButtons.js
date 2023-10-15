"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tools_1 = require("tinymce/core/api/util/Tools");
var Utils_1 = require("./complex/utils/Utils");
var register = function (editor) {
    var alignToolbarButtons = [
        { name: 'alignleft', text: 'Align left', cmd: 'JustifyLeft', icon: 'align-left' },
        { name: 'aligncenter', text: 'Align center', cmd: 'JustifyCenter', icon: 'align-center' },
        { name: 'alignright', text: 'Align right', cmd: 'JustifyRight', icon: 'align-right' },
        { name: 'alignjustify', text: 'Justify', cmd: 'JustifyFull', icon: 'align-justify' }
    ];
    Tools_1.default.each(alignToolbarButtons, function (item) {
        editor.ui.registry.addToggleButton(item.name, {
            tooltip: item.text,
            onAction: function () { return editor.execCommand(item.cmd); },
            icon: item.icon,
            onSetup: (0, Utils_1.onSetupFormatToggle)(editor, item.name)
        });
    });
    var alignNoneToolbarButton = { name: 'alignnone', text: 'No alignment', cmd: 'JustifyNone', icon: 'align-none' };
    editor.ui.registry.addButton(alignNoneToolbarButton.name, {
        tooltip: alignNoneToolbarButton.text,
        onAction: function () { return editor.execCommand(alignNoneToolbarButton.cmd); },
        icon: alignNoneToolbarButton.icon
    });
};
exports.default = { register: register };
