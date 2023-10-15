"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dom_globals_1 = require("@ephox/dom-globals");
var MockDemo = require("./MockDemo");
function default_1() {
    var DemoState2 = MockDemo.mockFeatureState();
    var generateButton = function (editor, buttonType, name, num) {
        var names = [];
        var _loop_1 = function (i) {
            editor.ui.registry.addButton("".concat(name, "-").concat(i), {
                type: buttonType,
                icon: "*-".concat(i, "-*"),
                onAction: function (comp) {
                    dom_globals_1.console.log("".concat(name, " ").concat(i, " button clicked"));
                }
            });
            names.push("".concat(name, "-").concat(i));
        };
        for (var i = 0; i <= num; i++) {
            _loop_1(i);
        }
        return names;
    };
    var generatedNames = [
        'generated-1', 'generated-2', 'generated-3', 'generated-4', 'generated-5', 'generated-6', 'generated-7', 'generated-8', 'generated-9', 'generated-10'
    ];
    tinymce.init({
        selector: 'textarea.tiny-text',
        theme: 'silver',
        toolbar: ['disabled-button', 'icon-button', 'icon-button-toggle'].concat(generatedNames).join(' '),
        plugins: [
            'lists',
            'autolink',
            'autosave'
        ],
        setup: function (ed) {
            ed.on('skinLoaded', function () {
                ed.notificationManager.open({
                    text: 'You will not see this because the mobile theme has no notifications',
                    type: 'info'
                });
            });
            ed.ui.registry.addButton('disabled-button', {
                type: 'button',
                icon: 'bold',
                disabled: true,
                onAction: function (comp) {
                    dom_globals_1.console.log('basic-button-2 click, basic-icon');
                }
            });
            ed.ui.registry.addButton('icon-button', {
                type: 'button',
                icon: 'checkmark',
                onAction: function (comp) {
                    dom_globals_1.console.log('basic-button-2 click, basic-icon');
                }
            });
            ed.ui.registry.addToggleButton('icon-button-toggle', {
                type: 'togglebutton',
                icon: 'italic',
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
            });
            generateButton(ed, 'button', 'generated', 5);
        }
    });
}
exports.default = default_1;
