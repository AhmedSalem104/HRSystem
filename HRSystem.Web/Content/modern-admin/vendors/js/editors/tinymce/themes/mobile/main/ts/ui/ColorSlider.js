"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alloy_1 = require("@ephox/alloy");
var sugar_1 = require("@ephox/sugar");
var Receivers_1 = require("../channels/Receivers");
var Styles_1 = require("../style/Styles");
var UiDomFactory = require("../util/UiDomFactory");
var ToolbarWidgets = require("./ToolbarWidgets");
var BLACK = -1;
var makeSlider = function (spec) {
    var getColor = function (hue) {
        if (hue < 0) {
            return 'black';
        }
        else if (hue > 360) {
            return 'white';
        }
        else {
            return 'hsl(' + hue + ', 100%, 50%)';
        }
    };
    var onInit = function (slider, thumb, spectrum, value) {
        var color = getColor(value.x());
        sugar_1.Css.set(thumb.element(), 'background-color', color);
    };
    var onChange = function (slider, thumb, value) {
        var color = getColor(value.x());
        sugar_1.Css.set(thumb.element(), 'background-color', color);
        spec.onChange(slider, thumb, color);
    };
    return alloy_1.Slider.sketch({
        dom: UiDomFactory.dom('<div class="${prefix}-slider ${prefix}-hue-slider-container"></div>'),
        components: [
            alloy_1.Slider.parts()['left-edge'](UiDomFactory.spec('<div class="${prefix}-hue-slider-black"></div>')),
            alloy_1.Slider.parts().spectrum({
                dom: UiDomFactory.dom('<div class="${prefix}-slider-gradient-container"></div>'),
                components: [
                    UiDomFactory.spec('<div class="${prefix}-slider-gradient"></div>')
                ],
                behaviours: alloy_1.Behaviour.derive([
                    alloy_1.Toggling.config({
                        toggleClass: Styles_1.default.resolve('thumb-active')
                    })
                ])
            }),
            alloy_1.Slider.parts()['right-edge'](UiDomFactory.spec('<div class="${prefix}-hue-slider-white"></div>')),
            alloy_1.Slider.parts().thumb({
                dom: UiDomFactory.dom('<div class="${prefix}-slider-thumb"></div>'),
                behaviours: alloy_1.Behaviour.derive([
                    alloy_1.Toggling.config({
                        toggleClass: Styles_1.default.resolve('thumb-active')
                    })
                ])
            })
        ],
        onChange: onChange,
        onDragStart: function (slider, thumb) {
            alloy_1.Toggling.on(thumb);
        },
        onDragEnd: function (slider, thumb) {
            alloy_1.Toggling.off(thumb);
        },
        onInit: onInit,
        stepSize: 10,
        model: {
            mode: 'x',
            minX: 0,
            maxX: 360,
            getInitialValue: function () {
                return {
                    x: function () { return spec.getInitialValue(); }
                };
            }
        },
        sliderBehaviours: alloy_1.Behaviour.derive([
            Receivers_1.default.orientation(alloy_1.Slider.refresh)
        ])
    });
};
var makeItems = function (spec) {
    return [
        makeSlider(spec)
    ];
};
var sketch = function (realm, editor) {
    var spec = {
        onChange: function (slider, thumb, color) {
            editor.undoManager.transact(function () {
                editor.formatter.apply('forecolor', { value: color });
                editor.nodeChanged();
            });
        },
        getInitialValue: function () {
            return BLACK;
        }
    };
    return ToolbarWidgets.button(realm, 'color-levels', function () {
        return makeItems(spec);
    }, editor);
};
exports.default = {
    makeItems: makeItems,
    sketch: sketch
};
