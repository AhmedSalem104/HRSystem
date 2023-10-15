"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var Inputs = require("tinymce/themes/mobile/ui/Inputs");
var SerialisedDialog = require("tinymce/themes/mobile/ui/SerialisedDialog");
var UiDomFactory = require("tinymce/themes/mobile/util/UiDomFactory");
function default_1() {
    var ephoxUi = sugar_1.SelectorFind.first('#ephox-ui').getOrDie();
    var form = SerialisedDialog.sketch({
        onExecute: function () { },
        getInitialValue: function () {
            return katamari_1.Option.some({
                alpha: 'Alpha',
                beta: '',
                gamma: '',
                delta: ''
            });
        },
        fields: [
            Inputs.field('alpha', 'placeholder-alpha'),
            Inputs.field('beta', 'placeholder-beta'),
            Inputs.field('gamma', 'placeholder-gamma'),
            Inputs.field('delta', 'placeholder-delta')
        ]
    });
    var gui = alloy_1.Gui.create();
    alloy_1.Attachment.attachSystem(ephoxUi, gui);
    var container = alloy_1.GuiFactory.build({
        dom: UiDomFactory.dom('<div class="${prefix}-outer-container ${prefix}-fullscreen-maximized"></div>'),
        components: [
            {
                dom: UiDomFactory.dom('<div class="${prefix}-toolstrip"></div>'),
                components: [
                    {
                        dom: UiDomFactory.dom('<div class="${prefix}-toolbar ${prefix}-context-toolbar"></div>'),
                        components: [
                            {
                                dom: UiDomFactory.dom('<div class="${prefix}-toolbar-group"></div>'),
                                components: [
                                    form
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    });
    gui.add(container);
}
exports.default = default_1;
