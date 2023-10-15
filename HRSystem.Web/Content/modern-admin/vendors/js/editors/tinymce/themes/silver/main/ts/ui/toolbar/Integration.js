"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identifyButtons = exports.handleError = void 0;
var boulder_1 = require("@ephox/boulder");
var bridge_1 = require("@ephox/bridge");
var dom_globals_1 = require("@ephox/dom-globals");
var katamari_1 = require("@ephox/katamari");
var ButtonClasses_1 = require("./button/ButtonClasses");
var ToolbarButtons_1 = require("./button/ToolbarButtons");
var MenuButton_1 = require("../button/MenuButton");
var AlignSelect_1 = require("../core/complex/AlignSelect");
var FontSelect_1 = require("../core/complex/FontSelect");
var FontsizeSelect_1 = require("../core/complex/FontsizeSelect");
var FormatSelect_1 = require("../core/complex/FormatSelect");
var StyleSelect_1 = require("../core/complex/StyleSelect");
var handleError = function (error) {
    dom_globals_1.console.error(boulder_1.ValueSchema.formatError(error));
};
exports.handleError = handleError;
var defaultToolbar = [
    {
        name: 'history', items: ['undo', 'redo']
    },
    {
        name: 'styles', items: ['styleselect']
    },
    {
        name: 'formatting', items: ['bold', 'italic']
    },
    {
        name: 'alignment', items: ['alignleft', 'aligncenter', 'alignright', 'alignjustify']
    },
    {
        name: 'indentation', items: ['outdent', 'indent']
    },
    {
        name: 'permanent pen', items: ['permanentpen']
    },
    {
        name: 'comments', items: ['addcomment']
    }
];
var renderFromBridge = function (bridgeBuilder, render) {
    return function (spec, extras) {
        var internal = bridgeBuilder(spec).mapError(function (errInfo) { return boulder_1.ValueSchema.formatError(errInfo); }).getOrDie();
        return render(internal, extras);
    };
};
var types = {
    button: renderFromBridge(bridge_1.Toolbar.createToolbarButton, function (s, extras) {
        return (0, ToolbarButtons_1.renderToolbarButton)(s, extras.backstage.shared.providers);
    }),
    togglebutton: renderFromBridge(bridge_1.Toolbar.createToggleButton, function (s, extras) {
        return (0, ToolbarButtons_1.renderToolbarToggleButton)(s, extras.backstage.shared.providers);
    }),
    menubutton: renderFromBridge(bridge_1.Toolbar.createMenuButton, function (s, extras) {
        return (0, MenuButton_1.renderMenuButton)(s, ButtonClasses_1.ToolbarButtonClasses.Button, extras.backstage, katamari_1.Option.none());
    }),
    splitbutton: renderFromBridge(bridge_1.Toolbar.createSplitButton, function (s, extras) {
        return (0, ToolbarButtons_1.renderSplitButton)(s, extras.backstage.shared);
    }),
    styleSelectButton: function (editor, extras) { return (0, StyleSelect_1.createStyleSelect)(editor, extras.backstage); },
    fontsizeSelectButton: function (editor, extras) { return (0, FontsizeSelect_1.createFontsizeSelect)(editor, extras.backstage); },
    fontSelectButton: function (editor, extras) { return (0, FontSelect_1.createFontSelect)(editor, extras.backstage); },
    formatButton: function (editor, extras) { return (0, FormatSelect_1.createFormatSelect)(editor, extras.backstage); },
    alignMenuButton: function (editor, extras) { return (0, AlignSelect_1.createAlignSelect)(editor, extras.backstage); }
};
var extractFrom = function (spec, extras) {
    return katamari_1.Obj.get(types, spec.type).fold(function () {
        dom_globals_1.console.error('skipping button defined by', spec);
        return katamari_1.Option.none();
    }, function (render) {
        return katamari_1.Option.some(render(spec, extras));
    });
};
var bespokeButtons = {
    styleselect: types.styleSelectButton,
    fontsizeselect: types.fontsizeSelectButton,
    fontselect: types.fontSelectButton,
    formatselect: types.formatButton,
    align: types.alignMenuButton
};
var removeUnusedDefaults = function (buttons) {
    var filteredItemGroups = katamari_1.Arr.map(defaultToolbar, function (group) {
        var items = katamari_1.Arr.filter(group.items, function (subItem) {
            return katamari_1.Obj.has(buttons, subItem) || katamari_1.Obj.has(bespokeButtons, subItem);
        });
        return {
            name: group.name,
            items: items
        };
    });
    return katamari_1.Arr.filter(filteredItemGroups, function (group) { return group.items.length > 0; });
};
var convertStringToolbar = function (strToolbar) {
    var groupsStrings = strToolbar.split('|');
    return katamari_1.Arr.map(groupsStrings, function (g) {
        return {
            items: g.trim().split(' ')
        };
    });
};
var isToolbarGroupSettingArray = function (toolbar) { return katamari_1.Type.isArrayOf(toolbar, function (t) { return katamari_1.Obj.has(t, 'name') && katamari_1.Obj.has(t, 'items'); }); };
var createToolbar = function (toolbarConfig) {
    var toolbar = toolbarConfig.toolbar;
    var buttons = toolbarConfig.buttons;
    if (toolbar === false) {
        return [];
    }
    else if (toolbar === undefined || toolbar === true) {
        return removeUnusedDefaults(buttons);
    }
    else if (katamari_1.Type.isString(toolbar)) {
        return convertStringToolbar(toolbar);
    }
    else if (isToolbarGroupSettingArray(toolbar)) {
        return toolbar;
    }
    else {
        dom_globals_1.console.error('Toolbar type should be string, string[], boolean or ToolbarGroup[]');
        return [];
    }
};
var lookupButton = function (editor, buttons, toolbarItem, extras, prefixes) {
    return katamari_1.Obj.get(buttons, toolbarItem.toLowerCase()).orThunk(function () {
        return prefixes.bind(function (ps) {
            return katamari_1.Options.findMap(ps, function (prefix) {
                return katamari_1.Obj.get(buttons, prefix + toolbarItem.toLowerCase());
            });
        });
    }).fold(function () {
        return katamari_1.Obj.get(bespokeButtons, toolbarItem.toLowerCase()).map(function (r) {
            return r(editor, extras);
        }).orThunk(function () {
            return katamari_1.Option.none();
        });
    }, function (spec) {
        return extractFrom(spec, extras);
    });
};
var identifyButtons = function (editor, toolbarConfig, extras, prefixes) {
    var toolbarGroups = createToolbar(toolbarConfig);
    var groups = katamari_1.Arr.map(toolbarGroups, function (group) {
        var items = katamari_1.Arr.bind(group.items, function (toolbarItem) {
            return toolbarItem.trim().length === 0 ? [] : lookupButton(editor, toolbarConfig.buttons, toolbarItem, extras, prefixes).toArray();
        });
        return {
            title: katamari_1.Option.from(editor.translate(group.name)),
            items: items
        };
    });
    return katamari_1.Arr.filter(groups, function (group) {
        return group.items.length > 0;
    });
};
exports.identifyButtons = identifyButtons;
