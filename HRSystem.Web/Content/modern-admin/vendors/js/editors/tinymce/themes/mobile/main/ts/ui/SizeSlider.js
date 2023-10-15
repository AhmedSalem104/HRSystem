"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alloy_1 = require("@ephox/alloy");
var boulder_1 = require("@ephox/boulder");
var Receivers_1 = require("../channels/Receivers");
var Styles_1 = require("../style/Styles");
var UiDomFactory = require("../util/UiDomFactory");
var schema = boulder_1.ValueSchema.objOfOnly([
    boulder_1.FieldSchema.strict('getInitialValue'),
    boulder_1.FieldSchema.strict('onChange'),
    boulder_1.FieldSchema.strict('category'),
    boulder_1.FieldSchema.strict('sizes')
]);
var sketch = function (rawSpec) {
    var spec = boulder_1.ValueSchema.asRawOrDie('SizeSlider', schema, rawSpec);
    var isValidValue = function (valueIndex) {
        return valueIndex >= 0 && valueIndex < spec.sizes.length;
    };
    var onChange = function (slider, thumb, valueIndex) {
        var index = valueIndex.x();
        if (isValidValue(index)) {
            spec.onChange(index);
        }
    };
    return alloy_1.Slider.sketch({
        dom: {
            tag: 'div',
            classes: [
                Styles_1.default.resolve('slider-' + spec.category + '-size-container'),
                Styles_1.default.resolve('slider'),
                Styles_1.default.resolve('slider-size-container')
            ]
        },
        onChange: onChange,
        onDragStart: function (slider, thumb) {
            alloy_1.Toggling.on(thumb);
        },
        onDragEnd: function (slider, thumb) {
            alloy_1.Toggling.off(thumb);
        },
        model: {
            mode: 'x',
            minX: 0,
            maxX: spec.sizes.length - 1,
            getInitialValue: function () {
                return {
                    x: function () { return spec.getInitialValue(); }
                };
            }
        },
        stepSize: 1,
        snapToGrid: true,
        sliderBehaviours: alloy_1.Behaviour.derive([
            Receivers_1.default.orientation(alloy_1.Slider.refresh)
        ]),
        components: [
            alloy_1.Slider.parts().spectrum({
                dom: UiDomFactory.dom('<div class="${prefix}-slider-size-container"></div>'),
                components: [
                    UiDomFactory.spec('<div class="${prefix}-slider-size-line"></div>')
                ]
            }),
            alloy_1.Slider.parts().thumb({
                dom: UiDomFactory.dom('<div class="${prefix}-slider-thumb"></div>'),
                behaviours: alloy_1.Behaviour.derive([
                    alloy_1.Toggling.config({
                        toggleClass: Styles_1.default.resolve('thumb-active')
                    })
                ])
            })
        ]
    });
};
exports.default = {
    sketch: sketch
};
