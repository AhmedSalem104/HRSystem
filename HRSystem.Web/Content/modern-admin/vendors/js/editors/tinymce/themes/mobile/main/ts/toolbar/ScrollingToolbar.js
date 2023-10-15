"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var Scrollables_1 = require("../ios/scroll/Scrollables");
var Styles_1 = require("../style/Styles");
var Scrollable_1 = require("../touch/scroll/Scrollable");
var UiDomFactory = require("../util/UiDomFactory");
function default_1() {
    var makeGroup = function (gSpec) {
        var scrollClass = gSpec.scrollable === true ? '${prefix}-toolbar-scrollable-group' : '';
        return {
            dom: UiDomFactory.dom('<div aria-label="' + gSpec.label + '" class="${prefix}-toolbar-group ' + scrollClass + '"></div>'),
            tgroupBehaviours: alloy_1.Behaviour.derive([
                alloy_1.AddEventsBehaviour.config('adhoc-scrollable-toolbar', gSpec.scrollable === true ? [
                    alloy_1.AlloyEvents.runOnInit(function (component, simulatedEvent) {
                        sugar_1.Css.set(component.element(), 'overflow-x', 'auto');
                        Scrollables_1.default.markAsHorizontal(component.element());
                        Scrollable_1.default.register(component.element());
                    })
                ] : [])
            ]),
            components: [
                alloy_1.Container.sketch({
                    components: [
                        alloy_1.ToolbarGroup.parts().items({})
                    ]
                })
            ],
            markers: {
                itemSelector: '.' + Styles_1.default.resolve('toolbar-group-item')
            },
            items: gSpec.items
        };
    };
    var toolbar = alloy_1.GuiFactory.build(alloy_1.Toolbar.sketch({
        dom: UiDomFactory.dom('<div class="${prefix}-toolbar"></div>'),
        components: [
            alloy_1.Toolbar.parts().groups({})
        ],
        toolbarBehaviours: alloy_1.Behaviour.derive([
            alloy_1.Toggling.config({
                toggleClass: Styles_1.default.resolve('context-toolbar'),
                toggleOnExecute: false,
                aria: {
                    mode: 'none'
                }
            }),
            alloy_1.Keying.config({
                mode: 'cyclic'
            })
        ]),
        shell: true
    }));
    var wrapper = alloy_1.GuiFactory.build(alloy_1.Container.sketch({
        dom: {
            classes: [Styles_1.default.resolve('toolstrip')]
        },
        components: [
            alloy_1.GuiFactory.premade(toolbar)
        ],
        containerBehaviours: alloy_1.Behaviour.derive([
            alloy_1.Toggling.config({
                toggleClass: Styles_1.default.resolve('android-selection-context-toolbar'),
                toggleOnExecute: false
            })
        ])
    }));
    var resetGroups = function () {
        alloy_1.Toolbar.setGroups(toolbar, initGroups.get());
        alloy_1.Toggling.off(toolbar);
    };
    var initGroups = (0, katamari_1.Cell)([]);
    var setGroups = function (gs) {
        initGroups.set(gs);
        resetGroups();
    };
    var createGroups = function (gs) {
        return katamari_1.Arr.map(gs, katamari_1.Fun.compose(alloy_1.ToolbarGroup.sketch, makeGroup));
    };
    var refresh = function () {
    };
    var setContextToolbar = function (gs) {
        alloy_1.Toggling.on(toolbar);
        alloy_1.Toolbar.setGroups(toolbar, gs);
    };
    var restoreToolbar = function () {
        if (alloy_1.Toggling.isOn(toolbar)) {
            resetGroups();
        }
    };
    var focus = function () {
        alloy_1.Keying.focusIn(toolbar);
    };
    return {
        wrapper: katamari_1.Fun.constant(wrapper),
        toolbar: katamari_1.Fun.constant(toolbar),
        createGroups: createGroups,
        setGroups: setGroups,
        setContextToolbar: setContextToolbar,
        restoreToolbar: restoreToolbar,
        refresh: refresh,
        focus: focus
    };
}
exports.default = default_1;
