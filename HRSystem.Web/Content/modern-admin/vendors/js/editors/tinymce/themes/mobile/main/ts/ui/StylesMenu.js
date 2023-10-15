"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alloy_1 = require("@ephox/alloy");
var boulder_1 = require("@ephox/boulder");
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var Receivers_1 = require("../channels/Receivers");
var Styles_1 = require("../style/Styles");
var Scrollable_1 = require("../touch/scroll/Scrollable");
var getValue = function (item) {
    return boulder_1.Objects.readOptFrom(item, 'format').getOr(item.title);
};
var convert = function (formats, memMenuThunk) {
    var mainMenu = makeMenu('Styles', [].concat(katamari_1.Arr.map(formats.items, function (k) {
        return makeItem(getValue(k), k.title, k.isSelected(), k.getPreview(), boulder_1.Objects.hasKey(formats.expansions, getValue(k)));
    })), memMenuThunk, false);
    var submenus = katamari_1.Obj.map(formats.menus, function (menuItems, menuName) {
        var items = katamari_1.Arr.map(menuItems, function (item) {
            return makeItem(getValue(item), item.title, item.isSelected !== undefined ? item.isSelected() : false, item.getPreview !== undefined ? item.getPreview() : '', boulder_1.Objects.hasKey(formats.expansions, getValue(item)));
        });
        return makeMenu(menuName, items, memMenuThunk, true);
    });
    var menus = katamari_1.Merger.deepMerge(submenus, boulder_1.Objects.wrap('styles', mainMenu));
    var tmenu = alloy_1.TieredMenu.tieredData('styles', menus, formats.expansions);
    return {
        tmenu: tmenu
    };
};
var makeItem = function (value, text, selected, preview, isMenu) {
    return {
        data: {
            value: value,
            text: text
        },
        type: 'item',
        dom: {
            tag: 'div',
            classes: isMenu ? [Styles_1.default.resolve('styles-item-is-menu')] : []
        },
        toggling: {
            toggleOnExecute: false,
            toggleClass: Styles_1.default.resolve('format-matches'),
            selected: selected
        },
        itemBehaviours: alloy_1.Behaviour.derive(isMenu ? [] : [
            Receivers_1.default.format(value, function (comp, status) {
                var toggle = status ? alloy_1.Toggling.on : alloy_1.Toggling.off;
                toggle(comp);
            })
        ]),
        components: [
            {
                dom: {
                    tag: 'div',
                    attributes: {
                        style: preview
                    },
                    innerHtml: text
                }
            }
        ]
    };
};
var makeMenu = function (value, items, memMenuThunk, collapsable) {
    return {
        value: value,
        dom: {
            tag: 'div'
        },
        components: [
            alloy_1.Button.sketch({
                dom: {
                    tag: 'div',
                    classes: [Styles_1.default.resolve('styles-collapser')]
                },
                components: collapsable ? [
                    {
                        dom: {
                            tag: 'span',
                            classes: [Styles_1.default.resolve('styles-collapse-icon')]
                        }
                    },
                    alloy_1.GuiFactory.text(value)
                ] : [alloy_1.GuiFactory.text(value)],
                action: function (item) {
                    if (collapsable) {
                        var comp = memMenuThunk().get(item);
                        alloy_1.TieredMenu.collapseMenu(comp);
                    }
                }
            }),
            {
                dom: {
                    tag: 'div',
                    classes: [Styles_1.default.resolve('styles-menu-items-container')]
                },
                components: [
                    alloy_1.Menu.parts().items({})
                ],
                behaviours: alloy_1.Behaviour.derive([
                    alloy_1.AddEventsBehaviour.config('adhoc-scrollable-menu', [
                        alloy_1.AlloyEvents.runOnAttached(function (component, simulatedEvent) {
                            sugar_1.Css.set(component.element(), 'overflow-y', 'auto');
                            sugar_1.Css.set(component.element(), '-webkit-overflow-scrolling', 'touch');
                            Scrollable_1.default.register(component.element());
                        }),
                        alloy_1.AlloyEvents.runOnDetached(function (component) {
                            sugar_1.Css.remove(component.element(), 'overflow-y');
                            sugar_1.Css.remove(component.element(), '-webkit-overflow-scrolling');
                            Scrollable_1.default.deregister(component.element());
                        })
                    ])
                ])
            }
        ],
        items: items,
        menuBehaviours: alloy_1.Behaviour.derive([
            alloy_1.Transitioning.config({
                initialState: 'after',
                routes: alloy_1.Transitioning.createTristate('before', 'current', 'after', {
                    transition: {
                        property: 'transform',
                        transitionClass: 'transitioning'
                    }
                })
            })
        ])
    };
};
var sketch = function (settings) {
    var dataset = convert(settings.formats, function () {
        return memMenu;
    });
    var memMenu = alloy_1.Memento.record(alloy_1.TieredMenu.sketch({
        dom: {
            tag: 'div',
            classes: [Styles_1.default.resolve('styles-menu')]
        },
        components: [],
        fakeFocus: true,
        stayInDom: true,
        onExecute: function (tmenu, item) {
            var v = alloy_1.Representing.getValue(item);
            settings.handle(item, v.value);
            return katamari_1.Option.none();
        },
        onEscape: function () {
            return katamari_1.Option.none();
        },
        onOpenMenu: function (container, menu) {
            var w = sugar_1.Width.get(container.element());
            sugar_1.Width.set(menu.element(), w);
            alloy_1.Transitioning.jumpTo(menu, 'current');
        },
        onOpenSubmenu: function (container, item, submenu) {
            var w = sugar_1.Width.get(container.element());
            var menu = sugar_1.SelectorFind.ancestor(item.element(), '[role="menu"]').getOrDie('hacky');
            var menuComp = container.getSystem().getByDom(menu).getOrDie();
            sugar_1.Width.set(submenu.element(), w);
            alloy_1.Transitioning.progressTo(menuComp, 'before');
            alloy_1.Transitioning.jumpTo(submenu, 'after');
            alloy_1.Transitioning.progressTo(submenu, 'current');
        },
        onCollapseMenu: function (container, item, menu) {
            var submenu = sugar_1.SelectorFind.ancestor(item.element(), '[role="menu"]').getOrDie('hacky');
            var submenuComp = container.getSystem().getByDom(submenu).getOrDie();
            alloy_1.Transitioning.progressTo(submenuComp, 'after');
            alloy_1.Transitioning.progressTo(menu, 'current');
        },
        navigateOnHover: false,
        highlightImmediately: true,
        data: dataset.tmenu,
        markers: {
            backgroundMenu: Styles_1.default.resolve('styles-background-menu'),
            menu: Styles_1.default.resolve('styles-menu'),
            selectedMenu: Styles_1.default.resolve('styles-selected-menu'),
            item: Styles_1.default.resolve('styles-item'),
            selectedItem: Styles_1.default.resolve('styles-selected-item')
        }
    }));
    return memMenu.asSpec();
};
exports.default = {
    sketch: sketch
};
