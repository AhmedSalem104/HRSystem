"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dom_globals_1 = require("@ephox/dom-globals");
var ButtonSetupDemo_1 = require("./ButtonSetupDemo");
function default_1() {
    tinymce.init({
        selector: 'div.tiny-text',
        inline: false,
        theme: 'silver',
        toolbar: ['styleselect', 'MagicButton', 'code', 'undo', 'toc', 'redo', 'preview', '|', 'help', 'link', '|', 'align', 'alignleft', 'alignright', 'aligncenter',
            'alignjustify', 'alignnone', '|', 'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', '|', 'blockquote',
            'outdent', 'indent', '|', 'cut', 'copy', 'paste', '|', 'help', 'selectall', 'visualaid', 'newdocument', 'removeformat', 'remove', '|', 'menu-button-1'
        ].join(' '),
        plugins: [
            'lists',
            'autolink',
            'autosave',
            'preview',
            'help',
            'searchreplace',
            'link',
            'wordcount',
            'table',
            'code',
            'toc',
            'paste',
            'image',
            'charmap',
            'emoticons',
            'imagetools',
            'textcolor',
            'media'
        ],
        resize: 'both',
        link_context_toolbar: true,
        menubar: 'file edit view insert format table tools Menu-1 help',
        menu: {
            'Menu-1': { title: 'Menu-1', items: 'menu-item-1 | link unlink | visualaid' }
        },
        style_formats: [
            { title: 'Bold text', inline: 'b' },
            { title: 'Red text', inline: 'span', styles: { color: '#ff0000' } },
            { title: 'Red header', block: 'h1', styles: { color: '#ff0000' } },
            { title: 'Example 1', inline: 'span', classes: 'example1' },
            { title: 'Example 2', inline: 'span', classes: 'example2' },
            { title: 'Table styles' },
            { title: 'Table row 1', selector: 'tr', classes: 'tablerow1' },
            {
                title: 'Headings', items: [
                    { title: 'Heading 1', format: 'h1' },
                    { title: 'Heading 2', format: 'h2' },
                    { title: 'Heading 3', format: 'h3' },
                    { title: 'Heading 4', format: 'h4' },
                    { title: 'Heading 5', format: 'h5' },
                    { title: 'Heading 6', format: 'h6' }
                ]
            },
            {
                title: 'Inline', items: [
                    { title: 'Bold', icon: 'bold', format: 'bold' },
                ]
            },
            {
                title: 'Blocks', items: []
            },
        ],
        setup: function (ed) {
            ButtonSetupDemo_1.default.setup(ed);
            ed.on('skinLoaded', function () {
                ed.notificationManager.open({
                    text: 'You will not see this because the mobile theme has no notifications',
                    type: 'info'
                });
            });
            ed.ui.registry.addButton('MagicButton', {
                text: 'yeah button text',
                onAction: function () {
                    dom_globals_1.console.log('clucked');
                }
            });
            ed.ui.registry.addMenuItem('menu-item-1', {
                text: 'My menu item',
                onAction: function () {
                    ed.insertContent('Hello world!!');
                }
            });
            ed.ui.registry.addSidebar('example', {
                tooltip: 'My sidebar',
                icon: 'my-side-bar',
                onShow: function (api) {
                    dom_globals_1.console.log(api.element());
                },
                onHide: function (api) {
                    dom_globals_1.console.log(api.element());
                },
                onSetup: function (api) {
                    dom_globals_1.console.log(api.element());
                    return function () { };
                }
            });
            ed.ui.registry.addContextToolbar('custom', {
                type: 'contexttoolbar',
                predicate: function (node) { return node.nodeName.toLowerCase() === 'h1'; },
                items: 'help link preview',
                scope: 'node',
                position: 'selection'
            });
        }
    });
}
exports.default = default_1;
