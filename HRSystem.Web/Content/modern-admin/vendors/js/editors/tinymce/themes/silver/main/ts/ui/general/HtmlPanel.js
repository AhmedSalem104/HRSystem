"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderHtmlPanel = void 0;
var alloy_1 = require("@ephox/alloy");
var renderHtmlPanel = function (spec) {
    if (spec.presets === 'presentation') {
        return alloy_1.Container.sketch({
            dom: {
                tag: 'div',
                classes: ['tox-form__group'],
                innerHtml: spec.html
            }
        });
    }
    else {
        return alloy_1.Container.sketch({
            dom: {
                tag: 'div',
                classes: ['tox-form__group'],
                innerHtml: spec.html,
                attributes: {
                    role: 'document'
                }
            },
            containerBehaviours: alloy_1.Behaviour.derive([
                alloy_1.Tabstopping.config({}),
                alloy_1.Focusing.config({})
            ])
        });
    }
};
exports.renderHtmlPanel = renderHtmlPanel;
