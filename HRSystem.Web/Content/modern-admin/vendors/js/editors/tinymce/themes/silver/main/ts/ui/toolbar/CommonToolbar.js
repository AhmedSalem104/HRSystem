"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderSlidingMoreToolbar = exports.renderFloatingMoreToolbar = exports.renderToolbar = exports.renderToolbarGroup = void 0;
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var Button_1 = require("../general/Button");
var ButtonClasses_1 = require("./button/ButtonClasses");
var ReadOnly_1 = require("../../ReadOnly");
var renderToolbarGroupCommon = function (toolbarGroup) {
    var attributes = toolbarGroup.title.fold(function () {
        return {};
    }, function (title) {
        return { attributes: { title: title } };
    });
    return {
        dom: __assign({ tag: 'div', classes: ['tox-toolbar__group'] }, attributes),
        components: [
            alloy_1.ToolbarGroup.parts().items({})
        ],
        items: toolbarGroup.items,
        markers: {
            itemSelector: '*:not(.tox-split-button) > .tox-tbtn:not([disabled]), .tox-split-button:not([disabled]), .tox-toolbar-nav-js:not([disabled])'
        },
        tgroupBehaviours: alloy_1.Behaviour.derive([
            alloy_1.Tabstopping.config({}),
            alloy_1.Focusing.config({})
        ])
    };
};
var renderToolbarGroup = function (toolbarGroup) {
    return alloy_1.ToolbarGroup.sketch(renderToolbarGroupCommon(toolbarGroup));
};
exports.renderToolbarGroup = renderToolbarGroup;
var getToolbarbehaviours = function (toolbarSpec, modeName, getOverflow) {
    var onAttached = alloy_1.AlloyEvents.runOnAttached(function (component) {
        var groups = katamari_1.Arr.map(toolbarSpec.initGroups, renderToolbarGroup);
        alloy_1.Toolbar.setGroups(component, groups);
    });
    return alloy_1.Behaviour.derive([
        alloy_1.Keying.config({
            mode: modeName,
            onEscape: toolbarSpec.onEscape,
            selector: '.tox-toolbar__group'
        }),
        alloy_1.AddEventsBehaviour.config('toolbar-events', [onAttached]),
        (0, ReadOnly_1.createReadonlyReceivingForOverflow)(getOverflow)
    ]);
};
var renderMoreToolbarCommon = function (toolbarSpec, getOverflow) {
    var modeName = toolbarSpec.cyclicKeying ? 'cyclic' : 'acyclic';
    return {
        uid: toolbarSpec.uid,
        dom: {
            tag: 'div',
            classes: ['tox-toolbar-overlord']
        },
        parts: {
            'overflow-group': renderToolbarGroupCommon({
                title: katamari_1.Option.none(),
                items: []
            }),
            'overflow-button': (0, Button_1.renderIconButtonSpec)({
                name: 'more',
                icon: katamari_1.Option.some('more-drawer'),
                disabled: false,
                tooltip: katamari_1.Option.some('More...'),
                primary: false,
                borderless: false
            }, katamari_1.Option.none(), toolbarSpec.backstage.shared.providers)
        },
        splitToolbarBehaviours: getToolbarbehaviours(toolbarSpec, modeName, getOverflow)
    };
};
var renderFloatingMoreToolbar = function (toolbarSpec) {
    var baseSpec = renderMoreToolbarCommon(toolbarSpec, alloy_1.SplitFloatingToolbar.getOverflow);
    var primary = alloy_1.SplitFloatingToolbar.parts().primary({
        dom: {
            tag: 'div',
            classes: ['tox-toolbar__primary']
        }
    });
    return alloy_1.SplitFloatingToolbar.sketch(__assign(__assign({}, baseSpec), { lazySink: toolbarSpec.getSink, getAnchor: function () { return toolbarSpec.backstage.shared.anchors.toolbarOverflow(); }, parts: __assign(__assign({}, baseSpec.parts), { overflow: {
                dom: {
                    tag: 'div',
                    classes: ['tox-toolbar__overflow']
                }
            } }), components: [primary], markers: {
            overflowToggledClass: ButtonClasses_1.ToolbarButtonClasses.Ticked
        } }));
};
exports.renderFloatingMoreToolbar = renderFloatingMoreToolbar;
var renderSlidingMoreToolbar = function (toolbarSpec) {
    var primary = alloy_1.SplitSlidingToolbar.parts().primary({
        dom: {
            tag: 'div',
            classes: ['tox-toolbar__primary']
        }
    });
    var overflow = alloy_1.SplitSlidingToolbar.parts().overflow({
        dom: {
            tag: 'div',
            classes: ['tox-toolbar__overflow']
        }
    });
    var baseSpec = renderMoreToolbarCommon(toolbarSpec, alloy_1.SplitSlidingToolbar.getOverflow);
    return alloy_1.SplitSlidingToolbar.sketch(__assign(__assign({}, baseSpec), { components: [primary, overflow], markers: {
            openClass: 'tox-toolbar__overflow--open',
            closedClass: 'tox-toolbar__overflow--closed',
            growingClass: 'tox-toolbar__overflow--growing',
            shrinkingClass: 'tox-toolbar__overflow--shrinking',
            overflowToggledClass: ButtonClasses_1.ToolbarButtonClasses.Ticked
        } }));
};
exports.renderSlidingMoreToolbar = renderSlidingMoreToolbar;
var renderToolbar = function (toolbarSpec) {
    var modeName = toolbarSpec.cyclicKeying ? 'cyclic' : 'acyclic';
    return alloy_1.Toolbar.sketch({
        uid: toolbarSpec.uid,
        dom: {
            tag: 'div',
            classes: ['tox-toolbar']
        },
        components: [
            alloy_1.Toolbar.parts().groups({})
        ],
        toolbarBehaviours: getToolbarbehaviours(toolbarSpec, modeName, katamari_1.Fun.constant(katamari_1.Option.none()))
    });
};
exports.renderToolbar = renderToolbar;
