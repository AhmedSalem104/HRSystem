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
exports.getFetch = exports.renderMenuButton = void 0;
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var CommonDropdown_1 = require("../dropdown/CommonDropdown");
var NestedMenus = require("../menus/menu/NestedMenus");
var ItemResponse_1 = require("../menus/item/ItemResponse");
var ButtonClasses_1 = require("../toolbar/button/ButtonClasses");
var sugar_1 = require("@ephox/sugar");
var FormEvents_1 = require("tinymce/themes/silver/ui/general/FormEvents");
var getMenuButtonApi = function (component) {
    return {
        isDisabled: function () { return alloy_1.Disabling.isDisabled(component); },
        setDisabled: function (state) { return alloy_1.Disabling.set(component, state); },
        setActive: function (state) {
            var elm = component.element();
            if (state) {
                sugar_1.Class.add(elm, ButtonClasses_1.ToolbarButtonClasses.Ticked);
                sugar_1.Attr.set(elm, 'aria-pressed', true);
            }
            else {
                sugar_1.Class.remove(elm, ButtonClasses_1.ToolbarButtonClasses.Ticked);
                sugar_1.Attr.remove(elm, 'aria-pressed');
            }
        },
        isActive: function () { return sugar_1.Class.has(component.element(), ButtonClasses_1.ToolbarButtonClasses.Ticked); }
    };
};
var renderMenuButton = function (spec, prefix, backstage, role) {
    return (0, CommonDropdown_1.renderCommonDropdown)({
        text: spec.text,
        icon: spec.icon,
        tooltip: spec.tooltip,
        role: role,
        fetch: function (callback) {
            spec.fetch(function (items) {
                callback(NestedMenus.build(items, ItemResponse_1.default.CLOSE_ON_EXECUTE, backstage));
            });
        },
        onSetup: spec.onSetup,
        getApi: getMenuButtonApi,
        columns: 1,
        presets: 'normal',
        classes: [],
        dropdownBehaviours: [
            alloy_1.Tabstopping.config({})
        ]
    }, prefix, backstage.shared);
};
exports.renderMenuButton = renderMenuButton;
var getFetch = function (items, getButton, backstage) {
    var getMenuItemAction = function (item) {
        return function (api) {
            backstage.shared.getSink().each(function (sink) {
                getButton().getOpt(sink).each(function (orig) {
                    sugar_1.Focus.focus(orig.element());
                    alloy_1.AlloyTriggers.emitWith(orig, FormEvents_1.formActionEvent, {
                        name: item.name,
                        value: item.storage.get()
                    });
                });
            });
            var newValue = !api.isActive();
            api.setActive(newValue);
            item.storage.set(newValue);
        };
    };
    var getMenuItemSetup = function (item) {
        return function (api) {
            api.setActive(item.storage.get());
        };
    };
    return function (success) {
        success(katamari_1.Arr.map(items, function (item) {
            var text = item.text.fold(function () {
                return {};
            }, function (text) {
                return {
                    text: text
                };
            });
            return __assign(__assign({ type: item.type }, text), { onAction: getMenuItemAction(item), onSetup: getMenuItemSetup(item) });
        }));
    };
};
exports.getFetch = getFetch;
