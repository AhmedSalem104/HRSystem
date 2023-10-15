"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dom_globals_1 = require("@ephox/dom-globals");
var MockDemo = require("./MockDemo");
function default_1() {
    var DemoState = MockDemo.mockFeatureState();
    var DemoState2 = MockDemo.mockFeatureState();
    tinymce.init({
        selector: 'textarea.tiny-text',
        theme: 'silver',
        plugins: [],
        menus: {
            File: ['x1', 'x2', 'x3', '|', 't1', '|', 'd1']
        },
        setup: function (ed) {
            ed.ui.registry.addMenuItem('x1', {
                icon: 'drop',
                text: 'Text with icon',
                onAction: function () {
                    dom_globals_1.console.log('Just Text click');
                }
            });
            ed.ui.registry.addMenuItem('x2', {
                text: 'Just Text',
                onAction: function () {
                    dom_globals_1.console.log('Just Text click');
                }
            });
            ed.ui.registry.addMenuItem('x3', {
                text: 'Just Text with shortcut',
                shortcut: 'Ctrl+Alt+Delete',
                onAction: function () {
                    dom_globals_1.console.log('Just Text click');
                }
            });
            ed.ui.registry.addToggleMenuItem('t1', {
                text: 'button with Toggle',
                shortcut: '⌘+C',
                onSetup: function (comp) {
                    var state = DemoState.get();
                    dom_globals_1.console.log(state);
                    comp.setActive(state);
                    return function () { };
                },
                onAction: function (comp) {
                    DemoState.toggle();
                    comp.setActive(DemoState.get());
                    dom_globals_1.console.log('button with Toggle click - current state is: ' + DemoState.get());
                }
            });
            ed.ui.registry.addNestedMenuItem('d1', {
                text: 'nested',
                getSubmenuItems: function () { return [
                    {
                        type: 'menuitem',
                        text: 'Nested 1',
                        onAction: function () {
                            dom_globals_1.console.log('clicked nested 1');
                        }
                    },
                    {
                        type: 'menuitem',
                        text: 'Nested 2',
                        icon: 'drop',
                        onAction: function () {
                            dom_globals_1.console.log('clicked nested 1');
                        }
                    },
                    {
                        type: 'menuitem',
                        text: 'Nested 3',
                        shortcut: 'X',
                        onAction: function () {
                            dom_globals_1.console.log('clicked nested 1');
                        }
                    },
                    {
                        type: 'togglemenuitem',
                        text: 'nested Toggle',
                        onSetup: function (comp) {
                            var state = DemoState2.get();
                            dom_globals_1.console.log(state);
                            comp.setActive(state);
                            return function () { };
                        },
                        onAction: function (comp) {
                            DemoState2.toggle();
                            comp.setActive(DemoState2.get());
                            dom_globals_1.console.log('button with Toggle click - current state is: ' + DemoState2.get());
                        }
                    },
                    {
                        type: 'menuitem',
                        text: 'Double nested',
                        onAction: function () { return dom_globals_1.console.log('double nest go!'); },
                        getSubmenuItems: function () { return [
                            {
                                type: 'menuitem',
                                text: 'wow',
                                onAction: function () { return dom_globals_1.console.log('so deep'); }
                            }
                        ]; }
                    }
                ]; }
            });
        }
    });
}
exports.default = default_1;
