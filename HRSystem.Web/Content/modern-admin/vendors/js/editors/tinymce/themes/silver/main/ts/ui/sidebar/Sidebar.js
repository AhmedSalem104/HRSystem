"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = exports.renderSidebar = exports.whichSidebar = exports.toggleSidebar = exports.setSidebar = void 0;
var alloy_1 = require("@ephox/alloy");
var bridge_1 = require("@ephox/bridge");
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var ComposingConfigs_1 = require("../alien/ComposingConfigs");
var SimpleBehaviours_1 = require("../alien/SimpleBehaviours");
var Controls_1 = require("tinymce/themes/silver/ui/controls/Controls");
var boulder_1 = require("@ephox/boulder");
var setup = function (editor) {
    var sidebars = editor.ui.registry.getAll().sidebars;
    katamari_1.Arr.each(katamari_1.Obj.keys(sidebars), function (name) {
        var spec = sidebars[name];
        var isActive = function () { return katamari_1.Option.from(editor.queryCommandValue('ToggleSidebar')).is(name); };
        editor.ui.registry.addToggleButton(name, {
            icon: spec.icon,
            tooltip: spec.tooltip,
            onAction: function (buttonApi) {
                editor.execCommand('ToggleSidebar', false, name);
                buttonApi.setActive(isActive());
            },
            onSetup: function (buttonApi) {
                var handleToggle = function () { return buttonApi.setActive(isActive()); };
                editor.on('ToggleSidebar', handleToggle);
                return function () {
                    editor.off('ToggleSidebar', handleToggle);
                };
            }
        });
    });
};
exports.setup = setup;
var getApi = function (comp) {
    return {
        element: function () {
            return comp.element().dom();
        }
    };
};
var makePanels = function (parts, panelConfigs) {
    var specs = katamari_1.Arr.map(katamari_1.Obj.keys(panelConfigs), function (name) {
        var spec = panelConfigs[name];
        var bridged = boulder_1.ValueSchema.getOrDie(bridge_1.Sidebar.createSidebar(spec));
        return {
            name: name,
            getApi: getApi,
            onSetup: bridged.onSetup,
            onShow: bridged.onShow,
            onHide: bridged.onHide
        };
    });
    return katamari_1.Arr.map(specs, function (spec) {
        var editorOffCell = (0, katamari_1.Cell)(katamari_1.Fun.noop);
        return parts.slot(spec.name, {
            dom: {
                tag: 'div',
                classes: ['tox-sidebar__pane']
            },
            behaviours: SimpleBehaviours_1.SimpleBehaviours.unnamedEvents([
                (0, Controls_1.onControlAttached)(spec, editorOffCell),
                (0, Controls_1.onControlDetached)(spec, editorOffCell),
                alloy_1.AlloyEvents.run(alloy_1.SystemEvents.slotVisibility(), function (sidepanel, se) {
                    var data = se.event();
                    var optSidePanelSpec = katamari_1.Arr.find(specs, function (config) { return config.name === data.name(); });
                    optSidePanelSpec.each(function (sidePanelSpec) {
                        var handler = data.visible() ? sidePanelSpec.onShow : sidePanelSpec.onHide;
                        handler(sidePanelSpec.getApi(sidepanel));
                    });
                })
            ])
        });
    });
};
var makeSidebar = function (panelConfigs) { return alloy_1.SlotContainer.sketch(function (parts) {
    return {
        dom: {
            tag: 'div',
            classes: ['tox-sidebar__pane-container'],
        },
        components: makePanels(parts, panelConfigs),
        slotBehaviours: SimpleBehaviours_1.SimpleBehaviours.unnamedEvents([
            alloy_1.AlloyEvents.runOnAttached(function (slotContainer) { return alloy_1.SlotContainer.hideAllSlots(slotContainer); })
        ])
    };
}); };
var setSidebar = function (sidebar, panelConfigs) {
    var optSlider = alloy_1.Composing.getCurrent(sidebar);
    optSlider.each(function (slider) { return alloy_1.Replacing.set(slider, [makeSidebar(panelConfigs)]); });
};
exports.setSidebar = setSidebar;
var toggleSidebar = function (sidebar, name) {
    var optSlider = alloy_1.Composing.getCurrent(sidebar);
    optSlider.each(function (slider) {
        var optSlotContainer = alloy_1.Composing.getCurrent(slider);
        optSlotContainer.each(function (slotContainer) {
            if (alloy_1.Sliding.hasGrown(slider)) {
                if (alloy_1.SlotContainer.isShowing(slotContainer, name)) {
                    alloy_1.Sliding.shrink(slider);
                }
                else {
                    alloy_1.SlotContainer.hideAllSlots(slotContainer);
                    alloy_1.SlotContainer.showSlot(slotContainer, name);
                }
            }
            else {
                alloy_1.SlotContainer.hideAllSlots(slotContainer);
                alloy_1.SlotContainer.showSlot(slotContainer, name);
                alloy_1.Sliding.grow(slider);
            }
        });
    });
};
exports.toggleSidebar = toggleSidebar;
var whichSidebar = function (sidebar) {
    var optSlider = alloy_1.Composing.getCurrent(sidebar);
    return optSlider.bind(function (slider) {
        var sidebarOpen = alloy_1.Sliding.isGrowing(slider) || alloy_1.Sliding.hasGrown(slider);
        if (sidebarOpen) {
            var optSlotContainer = alloy_1.Composing.getCurrent(slider);
            return optSlotContainer.bind(function (slotContainer) {
                return katamari_1.Arr.find(alloy_1.SlotContainer.getSlotNames(slotContainer), function (name) {
                    return alloy_1.SlotContainer.isShowing(slotContainer, name);
                });
            });
        }
        else {
            return katamari_1.Option.none();
        }
    });
};
exports.whichSidebar = whichSidebar;
var fixSize = katamari_1.Id.generate('FixSizeEvent');
var autoSize = katamari_1.Id.generate('AutoSizeEvent');
var renderSidebar = function (spec) {
    return {
        uid: spec.uid,
        dom: {
            tag: 'div',
            classes: ['tox-sidebar'],
            attributes: {
                role: 'complementary'
            }
        },
        components: [
            {
                dom: {
                    tag: 'div',
                    classes: ['tox-sidebar__slider']
                },
                components: [],
                behaviours: alloy_1.Behaviour.derive([
                    alloy_1.Tabstopping.config({}),
                    alloy_1.Focusing.config({}),
                    alloy_1.Sliding.config({
                        dimension: {
                            property: 'width'
                        },
                        closedClass: 'tox-sidebar--sliding-closed',
                        openClass: 'tox-sidebar--sliding-open',
                        shrinkingClass: 'tox-sidebar--sliding-shrinking',
                        growingClass: 'tox-sidebar--sliding-growing',
                        onShrunk: function (slider) {
                            var optSlotContainer = alloy_1.Composing.getCurrent(slider);
                            optSlotContainer.each(alloy_1.SlotContainer.hideAllSlots);
                            alloy_1.AlloyTriggers.emit(slider, autoSize);
                        },
                        onGrown: function (slider) {
                            alloy_1.AlloyTriggers.emit(slider, autoSize);
                        },
                        onStartGrow: function (slider) {
                            alloy_1.AlloyTriggers.emitWith(slider, fixSize, { width: sugar_1.Css.getRaw(slider.element(), 'width').getOr('') });
                        },
                        onStartShrink: function (slider) {
                            alloy_1.AlloyTriggers.emitWith(slider, fixSize, { width: sugar_1.Width.get(slider.element()) + 'px' });
                        }
                    }),
                    alloy_1.Replacing.config({}),
                    alloy_1.Composing.config({
                        find: function (comp) {
                            var children = alloy_1.Replacing.contents(comp);
                            return katamari_1.Arr.head(children);
                        }
                    })
                ])
            }
        ],
        behaviours: alloy_1.Behaviour.derive([
            ComposingConfigs_1.ComposingConfigs.childAt(0),
            alloy_1.AddEventsBehaviour.config('sidebar-sliding-events', [
                alloy_1.AlloyEvents.run(fixSize, function (comp, se) {
                    sugar_1.Css.set(comp.element(), 'width', se.event().width());
                }),
                alloy_1.AlloyEvents.run(autoSize, function (comp, se) {
                    sugar_1.Css.remove(comp.element(), 'width');
                })
            ])
        ])
    };
};
exports.renderSidebar = renderSidebar;
