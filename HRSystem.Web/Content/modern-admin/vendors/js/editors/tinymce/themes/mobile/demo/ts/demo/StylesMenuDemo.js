"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alloy_1 = require("@ephox/alloy");
var dom_globals_1 = require("@ephox/dom-globals");
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var StylesMenu_1 = require("tinymce/themes/mobile/ui/StylesMenu");
var UiDomFactory = require("tinymce/themes/mobile/util/UiDomFactory");
function default_1() {
    var ephoxUi = sugar_1.SelectorFind.first('#ephox-ui').getOrDie();
    var menu = StylesMenu_1.default.sketch({
        formats: {
            menus: {
                Beta: [
                    { title: 'Beta-1', isSelected: katamari_1.Fun.constant(false), getPreview: katamari_1.Fun.constant('') },
                    { title: 'Beta-2', isSelected: katamari_1.Fun.constant(false), getPreview: katamari_1.Fun.constant('') },
                    { title: 'Beta-3', isSelected: katamari_1.Fun.constant(false), getPreview: katamari_1.Fun.constant('') }
                ]
            },
            expansions: {
                Beta: 'Beta'
            },
            items: [
                { title: 'Alpha', isSelected: katamari_1.Fun.constant(false), getPreview: katamari_1.Fun.constant('') },
                { title: 'Beta', isSelected: katamari_1.Fun.constant(false), getPreview: katamari_1.Fun.constant('') },
                { title: 'Gamma', isSelected: katamari_1.Fun.constant(true), getPreview: katamari_1.Fun.constant('') }
            ]
        },
        handle: function (format) {
            dom_globals_1.console.log('firing', format);
        }
    });
    var gui = alloy_1.Gui.create();
    alloy_1.Attachment.attachSystem(ephoxUi, gui);
    var container = alloy_1.GuiFactory.build({
        dom: UiDomFactory.dom('<div class="${prefix}-outer-container ${prefix}-fullscreen-maximized"></div>'),
        components: [
            {
                dom: UiDomFactory.dom('<div class="${prefix}-dropup" style="height: 500px;"></div>'),
                components: [
                    menu
                ]
            }
        ]
    });
    gui.add(container);
}
exports.default = default_1;
