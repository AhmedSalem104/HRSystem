"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dom_globals_1 = require("@ephox/dom-globals");
var sugar_1 = require("@ephox/sugar");
function default_1() {
    var makeSidebar = function (ed, name, background, width) {
        ed.ui.registry.addSidebar(name, {
            icon: 'comment',
            tooltip: 'Tooltip for ' + name,
            onSetup: function (api) {
                dom_globals_1.console.log('onSetup ' + name);
                var box = sugar_1.Element.fromHtml('<div style="width: ' + width + 'px; background: ' + background + ';"></div>');
                api.element().appendChild(box.dom());
                return function () {
                    api.element().removeChild(box.dom());
                };
            },
            onShow: function (api) {
                dom_globals_1.console.log('onShow ' + name);
            },
            onHide: function (api) {
                dom_globals_1.console.log('onHide ' + name);
            },
        });
    };
    tinymce.init({
        selector: 'textarea.tiny-text',
        theme: 'silver',
        toolbar: 'sidebar1 sidebar2 sidebar3',
        plugins: [
            'lists',
            'autolink',
            'autosave',
        ],
        resize: 'both',
        setup: function (ed) {
            makeSidebar(ed, 'sidebar1', 'green', 200);
            makeSidebar(ed, 'sidebar2', 'red', 300);
            makeSidebar(ed, 'sidebar3', 'blue', 150);
        }
    });
}
exports.default = default_1;
