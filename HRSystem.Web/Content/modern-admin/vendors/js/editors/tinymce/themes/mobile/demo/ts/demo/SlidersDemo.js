"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var ColorSlider_1 = require("tinymce/themes/mobile/ui/ColorSlider");
var FontSizeSlider = require("tinymce/themes/mobile/ui/FontSizeSlider");
var UiDomFactory = require("tinymce/themes/mobile/util/UiDomFactory");
function default_1() {
    var ephoxUi = sugar_1.SelectorFind.first('#ephox-ui').getOrDie();
    var fontSlider = alloy_1.Container.sketch({
        dom: UiDomFactory.dom('<div class="${prefix}-toolbar ${prefix}-context-toolbar"></div>'),
        components: [
            {
                dom: UiDomFactory.dom('<div class="${prefix}-toolbar-group"></div>'),
                components: FontSizeSlider.makeItems({
                    onChange: katamari_1.Fun.noop,
                    getInitialValue: katamari_1.Fun.constant(2)
                })
            }
        ]
    });
    var colorSlider = alloy_1.Container.sketch({
        dom: UiDomFactory.dom('<div class="${prefix}-toolbar ${prefix}-context-toolbar"></div>'),
        components: [
            {
                dom: UiDomFactory.dom('<div class="${prefix}-toolbar-group"></div>'),
                components: ColorSlider_1.default.makeItems({
                    onChange: katamari_1.Fun.noop,
                    getInitialValue: katamari_1.Fun.constant(-1)
                })
            }
        ]
    });
    var gui = alloy_1.Gui.create();
    alloy_1.Attachment.attachSystem(ephoxUi, gui);
    var container = alloy_1.GuiFactory.build({
        dom: UiDomFactory.dom('<div class="{prefix}-outer-container ${prefix}-fullscreen-maximized"></div>'),
        components: [
            {
                dom: UiDomFactory.dom('<div class="${prefix}-toolstrip"></div>'),
                components: [fontSlider]
            },
            {
                dom: UiDomFactory.dom('<div class="${prefix}-toolstrip"></div>'),
                components: [colorSlider]
            }
        ]
    });
    gui.add(container);
}
exports.default = default_1;
