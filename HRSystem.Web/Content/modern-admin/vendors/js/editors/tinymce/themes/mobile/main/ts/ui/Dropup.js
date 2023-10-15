"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var Receivers_1 = require("../channels/Receivers");
var Styles_1 = require("../style/Styles");
var dom_globals_1 = require("@ephox/dom-globals");
var build = function (refresh, scrollIntoView) {
    var dropup = alloy_1.GuiFactory.build(alloy_1.Container.sketch({
        dom: {
            tag: 'div',
            classes: [Styles_1.default.resolve('dropup')]
        },
        components: [],
        containerBehaviours: alloy_1.Behaviour.derive([
            alloy_1.Replacing.config({}),
            alloy_1.Sliding.config({
                closedClass: Styles_1.default.resolve('dropup-closed'),
                openClass: Styles_1.default.resolve('dropup-open'),
                shrinkingClass: Styles_1.default.resolve('dropup-shrinking'),
                growingClass: Styles_1.default.resolve('dropup-growing'),
                dimension: {
                    property: 'height'
                },
                onShrunk: function (component) {
                    refresh();
                    scrollIntoView();
                    alloy_1.Replacing.set(component, []);
                },
                onGrown: function (component) {
                    refresh();
                    scrollIntoView();
                }
            }),
            Receivers_1.default.orientation(function (component, data) {
                disappear(katamari_1.Fun.noop);
            })
        ])
    }));
    var appear = function (menu, update, component) {
        if (alloy_1.Sliding.hasShrunk(dropup) === true && alloy_1.Sliding.isTransitioning(dropup) === false) {
            dom_globals_1.window.requestAnimationFrame(function () {
                update(component);
                alloy_1.Replacing.set(dropup, [menu()]);
                alloy_1.Sliding.grow(dropup);
            });
        }
    };
    var disappear = function (onReadyToShrink) {
        dom_globals_1.window.requestAnimationFrame(function () {
            onReadyToShrink();
            alloy_1.Sliding.shrink(dropup);
        });
    };
    return {
        appear: appear,
        disappear: disappear,
        component: katamari_1.Fun.constant(dropup),
        element: dropup.element
    };
};
exports.build = build;
