"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var Styles_1 = require("../../style/Styles");
var UiDomFactory = require("../../util/UiDomFactory");
var sketch = function (onView, translate) {
    var memIcon = alloy_1.Memento.record(alloy_1.Container.sketch({
        dom: UiDomFactory.dom('<div aria-hidden="true" class="${prefix}-mask-tap-icon"></div>'),
        containerBehaviours: alloy_1.Behaviour.derive([
            alloy_1.Toggling.config({
                toggleClass: Styles_1.default.resolve('mask-tap-icon-selected'),
                toggleOnExecute: false
            })
        ])
    }));
    var onViewThrottle = katamari_1.Throttler.first(onView, 200);
    return alloy_1.Container.sketch({
        dom: UiDomFactory.dom('<div class="${prefix}-disabled-mask"></div>'),
        components: [
            alloy_1.Container.sketch({
                dom: UiDomFactory.dom('<div class="${prefix}-content-container"></div>'),
                components: [
                    alloy_1.Button.sketch({
                        dom: UiDomFactory.dom('<div class="${prefix}-content-tap-section"></div>'),
                        components: [
                            memIcon.asSpec()
                        ],
                        action: function (button) {
                            onViewThrottle.throttle();
                        },
                        buttonBehaviours: alloy_1.Behaviour.derive([
                            alloy_1.Toggling.config({
                                toggleClass: Styles_1.default.resolve('mask-tap-icon-selected')
                            })
                        ])
                    })
                ]
            })
        ]
    });
};
exports.default = {
    sketch: sketch
};
