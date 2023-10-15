"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dom_globals_1 = require("@ephox/dom-globals");
exports.default = {
    setup: function (ed) {
        ed.ui.registry.addButton('basic-button-1', {
            text: 'basic-button-1',
            onAction: function () {
                dom_globals_1.console.log('basic-button-1 click');
            }
        });
        ed.ui.registry.addButton('basic-button-2', {
            icon: 'basic-icon',
            text: 'aria-label-icon-button',
            onAction: function () {
                dom_globals_1.console.log('basic-button-2 click, basic-icon');
            }
        });
        ed.ui.registry.addButton('dialog-button', {
            type: 'button',
            text: 'Launch Dialog',
            onAction: function () {
                ed.windowManager.open({
                    title: 'Dialog title',
                    body: {
                        type: 'panel',
                        items: [
                            {
                                name: 'preview',
                                type: 'iframe'
                            }
                        ]
                    },
                    buttons: [
                        {
                            type: 'cancel',
                            name: 'cancel',
                            text: 'Cancel'
                        },
                        {
                            type: 'submit',
                            name: 'save',
                            text: 'Save',
                            primary: true
                        }
                    ],
                    initialData: {
                        preview: 'some html url'
                    },
                    onSubmit: function (api) { dom_globals_1.console.log('Preview Demo Submit'); },
                    onClose: function () { dom_globals_1.console.log('Preview Demo Close'); }
                });
            }
        });
        ed.ui.registry.addMenuButton('menu-button-1', {
            text: 'menu',
            fetch: function (callback) { return callback('menu-button-item-1 menu-button-item-2'); }
        });
        ed.ui.registry.addMenuItem('menu-button-item-1', {
            text: 'menu-button-item-1',
            onAction: function () {
                dom_globals_1.console.log('menu-button-item-1 click');
            }
        });
        ed.ui.registry.addNestedMenuItem('menu-button-item-2', {
            text: 'menu-button-item-2',
            getSubmenuItems: function () {
                return [
                    {
                        type: 'menuitem',
                        text: 'submenu-1',
                        onAction: function () {
                            dom_globals_1.console.log('submenu1');
                        }
                    },
                    {
                        type: 'menuitem',
                        text: 'submenu-2',
                        getSubmenuItems: function () {
                            return [
                                {
                                    type: 'menuitem',
                                    text: 'submenu-2-a',
                                    onAction: function () {
                                        dom_globals_1.console.log('submenu2a');
                                    }
                                }
                            ];
                        }
                    }
                ];
            }
        });
    }
};
