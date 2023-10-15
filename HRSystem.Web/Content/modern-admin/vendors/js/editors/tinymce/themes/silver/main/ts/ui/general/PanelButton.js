"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderPanelButton = void 0;
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var MenuParts = require("../menus/menu/MenuParts");
var SingleMenu_1 = require("../menus/menu/SingleMenu");
var MenuChoice_1 = require("../menus/menu/MenuChoice");
var MenuMovement_1 = require("../menus/menu/MenuMovement");
var ItemResponse_1 = require("../menus/item/ItemResponse");
var renderPanelButton = function (spec, sharedBackstage) {
    return alloy_1.Dropdown.sketch({
        dom: spec.dom,
        components: spec.components,
        toggleClass: 'mce-active',
        dropdownBehaviours: alloy_1.Behaviour.derive([
            alloy_1.Unselecting.config({}),
            alloy_1.Tabstopping.config({})
        ]),
        layouts: spec.layouts,
        sandboxClasses: ['tox-dialog__popups'],
        lazySink: sharedBackstage.getSink,
        fetch: function (comp) {
            return katamari_1.Future.nu(function (callback) {
                return spec.fetch(callback);
            }).map(function (items) {
                return katamari_1.Option.from((0, SingleMenu_1.createTieredDataFrom)(katamari_1.Merger.deepMerge((0, MenuChoice_1.createPartialChoiceMenu)(katamari_1.Id.generate('menu-value'), items, function (value) {
                    spec.onItemAction(comp, value);
                }, spec.columns, spec.presets, ItemResponse_1.default.CLOSE_ON_EXECUTE, function () { return false; }, sharedBackstage.providers), {
                    movement: (0, MenuMovement_1.deriveMenuMovement)(spec.columns, spec.presets)
                })));
            });
        },
        parts: {
            menu: MenuParts.part(false, 1, spec.presets)
        }
    });
};
exports.renderPanelButton = renderPanelButton;
