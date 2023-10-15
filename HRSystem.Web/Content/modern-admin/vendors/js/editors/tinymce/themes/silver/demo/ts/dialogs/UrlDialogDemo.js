"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dom_globals_1 = require("@ephox/dom-globals");
exports.default = (function () {
    var openDialog = function (editor) {
        var api = editor.windowManager.openUrl({
            title: 'Example',
            url: './examples/iframe.html',
            onMessage: function (api, message) {
                dom_globals_1.console.log('Custom message received from iframe', message);
            },
            onClose: function () {
                dom_globals_1.console.log('Closing dialog');
            }
        });
        (0, dom_globals_1.setTimeout)(function () {
            api.sendMessage({
                message: 'Some example message'
            });
        }, 2000);
    };
    tinymce.init({
        selector: 'textarea.tiny-text',
        init_instance_callback: function (editor) {
            editor.$('<button>openDialog()</button>').appendTo('body').on('click', function () { return openDialog(editor); });
            openDialog(editor);
        }
    });
});
