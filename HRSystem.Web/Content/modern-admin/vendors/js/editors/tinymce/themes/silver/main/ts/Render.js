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
var alloy_1 = require("@ephox/alloy");
var dom_globals_1 = require("@ephox/dom-globals");
var katamari_1 = require("@ephox/katamari");
var sand_1 = require("@ephox/sand");
var sugar_1 = require("@ephox/sugar");
var DOMUtils_1 = require("tinymce/core/api/dom/DOMUtils");
var I18n_1 = require("tinymce/core/api/util/I18n");
var Settings_1 = require("./api/Settings");
var Backstage = require("./backstage/Backstage");
var ContextToolbar_1 = require("./ContextToolbar");
var Events_1 = require("./Events");
var Iframe_1 = require("./modes/Iframe");
var Inline_1 = require("./modes/Inline");
var FormatControls_1 = require("./ui/core/FormatControls");
var OuterContainer_1 = require("./ui/general/OuterContainer");
var SilverContextMenu = require("./ui/menus/contextmenu/SilverContextMenu");
var Sidebar = require("./ui/sidebar/Sidebar");
var Throbber = require("./ui/throbber/Throbber");
var Utils_1 = require("./ui/sizing/Utils");
var Statusbar_1 = require("./ui/statusbar/Statusbar");
var setup = function (editor) {
    var isInline = editor.getParam('inline', false, 'boolean');
    var mode = isInline ? Inline_1.default : Iframe_1.default;
    var lazyOuterContainer = katamari_1.Option.none();
    var platform = sand_1.PlatformDetection.detect();
    var isIE = platform.browser.isIE();
    var platformClasses = isIE ? ['tox-platform-ie'] : [];
    var dirAttributes = I18n_1.default.isRtl() ? {
        attributes: {
            dir: 'rtl'
        }
    } : {};
    var sink = alloy_1.GuiFactory.build({
        dom: __assign({ tag: 'div', classes: ['tox', 'tox-silver-sink', 'tox-tinymce-aux'].concat(platformClasses) }, dirAttributes),
        behaviours: alloy_1.Behaviour.derive([
            alloy_1.Positioning.config({
                useFixed: false
            })
        ])
    });
    var memAnchorBar = alloy_1.Memento.record({
        dom: {
            tag: 'div',
            classes: ['tox-anchorbar']
        }
    });
    var lazyAnchorBar = function () { return lazyOuterContainer.bind(function (container) {
        return memAnchorBar.getOpt(container);
    }).getOrDie('Could not find a anchor bar element'); };
    var lazyMoreButton = function () { return lazyOuterContainer.bind(function (container) {
        return OuterContainer_1.default.getMoreButton(container);
    }).getOrDie('Could not find more button element'); };
    var lazyToolbar = function () { return lazyOuterContainer.bind(function (container) {
        return OuterContainer_1.default.getToolbar(container);
    }).getOrDie('Could not find more toolbar element'); };
    var lazyThrobber = function () { return lazyOuterContainer.bind(function (container) {
        return OuterContainer_1.default.getThrobber(container);
    }).getOrDie('Could not find throbber element'); };
    var backstage = Backstage.init(sink, editor, lazyAnchorBar, lazyMoreButton);
    var lazySink = function () { return katamari_1.Result.value(sink); };
    var partMenubar = OuterContainer_1.default.parts().menubar({
        dom: {
            tag: 'div',
            classes: ['tox-menubar']
        },
        backstage: backstage,
        onEscape: function () {
            editor.focus();
        }
    });
    var toolbarDrawer = function (editor) { return (0, Settings_1.getToolbarDrawer)(editor); };
    var partToolbar = OuterContainer_1.default.parts().toolbar({
        dom: {
            tag: 'div',
            classes: ['tox-toolbar']
        },
        getSink: lazySink,
        backstage: backstage,
        onEscape: function () {
            editor.focus();
        },
        split: toolbarDrawer(editor),
        lazyToolbar: lazyToolbar,
        lazyMoreButton: lazyMoreButton
    });
    var partMultipleToolbar = OuterContainer_1.default.parts()['multiple-toolbar']({
        dom: {
            tag: 'div',
            classes: ['tox-toolbar-overlord']
        },
        onEscape: function () { }
    });
    var partSocket = OuterContainer_1.default.parts().socket({
        dom: {
            tag: 'div',
            classes: ['tox-edit-area']
        }
    });
    var partSidebar = OuterContainer_1.default.parts().sidebar({
        dom: {
            tag: 'div',
            classes: ['tox-sidebar']
        }
    });
    var partThrobber = OuterContainer_1.default.parts().throbber({
        dom: {
            tag: 'div',
            classes: ['tox-throbber']
        },
        backstage: backstage
    });
    var sb = editor.getParam('statusbar', true, 'boolean');
    var statusbar = sb && !isInline ? katamari_1.Option.some((0, Statusbar_1.renderStatusbar)(editor, backstage.shared.providers)) : katamari_1.Option.none();
    var socketSidebarContainer = {
        dom: {
            tag: 'div',
            classes: ['tox-sidebar-wrap']
        },
        components: [
            partSocket,
            partSidebar
        ]
    };
    var hasMultipleToolbar = (0, Settings_1.isMultipleToolbars)(editor);
    var hasToolbar = (0, Settings_1.isToolbarEnabled)(editor);
    var hasMenubar = (0, Settings_1.isMenubarEnabled)(editor);
    var hasToolbarDrawer = toolbarDrawer(editor) !== Settings_1.ToolbarDrawer.default;
    var getPartToolbar = function () {
        if (hasMultipleToolbar) {
            if (hasToolbarDrawer) {
                dom_globals_1.console.warn('Toolbar drawer cannot be applied when multiple toolbars are active');
            }
            return [partMultipleToolbar];
        }
        else if (hasToolbar) {
            return [partToolbar];
        }
        else {
            return [];
        }
    };
    var editorComponents = katamari_1.Arr.flatten([
        hasMenubar ? [partMenubar] : [],
        getPartToolbar(),
        (0, Settings_1.useFixedContainer)(editor) ? [] : [memAnchorBar.asSpec()],
        isInline ? [] : [socketSidebarContainer]
    ]);
    var editorContainer = {
        dom: {
            tag: 'div',
            classes: ['tox-editor-container']
        },
        components: editorComponents,
    };
    var containerComponents = katamari_1.Arr.flatten([
        [editorContainer],
        isInline ? [] : statusbar.toArray(),
        [partThrobber]
    ]);
    var isHidden = isInline && !hasMenubar && !hasToolbar && !hasMultipleToolbar;
    var attributes = __assign(__assign({ role: 'application' }, I18n_1.default.isRtl() ? { dir: 'rtl' } : {}), isHidden ? { 'aria-hidden': 'true' } : {});
    var outerContainer = alloy_1.GuiFactory.build(OuterContainer_1.default.sketch({
        dom: {
            tag: 'div',
            classes: ['tox', 'tox-tinymce'].concat(isInline ? ['tox-tinymce-inline'] : []).concat(platformClasses),
            styles: __assign({ visibility: 'hidden' }, isHidden ? { opacity: '0', border: '0' } : {}),
            attributes: attributes
        },
        components: containerComponents,
        behaviours: alloy_1.Behaviour.derive(mode.getBehaviours(editor).concat([
            alloy_1.Keying.config({
                mode: 'cyclic',
                selector: '.tox-menubar, .tox-toolbar, .tox-toolbar__primary, .tox-toolbar__overflow--open, .tox-sidebar__overflow--open, .tox-statusbar__path, .tox-statusbar__wordcount, .tox-statusbar__branding a'
            })
        ]))
    }));
    lazyOuterContainer = katamari_1.Option.some(outerContainer);
    editor.shortcuts.add('alt+F9', 'focus menubar', function () {
        OuterContainer_1.default.focusMenubar(outerContainer);
    });
    editor.shortcuts.add('alt+F10', 'focus toolbar', function () {
        OuterContainer_1.default.focusToolbar(outerContainer);
    });
    var mothership = alloy_1.Gui.takeover(outerContainer);
    var uiMothership = alloy_1.Gui.takeover(sink);
    Events_1.default.setup(editor, mothership, uiMothership);
    var getUi = function () {
        var channels = {
            broadcastAll: uiMothership.broadcast,
            broadcastOn: uiMothership.broadcastOn,
            register: function () { }
        };
        return { channels: channels };
    };
    var setEditorSize = function (elm) {
        var DOM = DOMUtils_1.default.DOM;
        var baseWidth = editor.getParam('width', DOM.getStyle(elm, 'width'));
        var baseHeight = (0, Settings_1.getHeightSetting)(editor);
        var minWidth = (0, Settings_1.getMinWidthSetting)(editor);
        var minHeight = (0, Settings_1.getMinHeightSetting)(editor);
        var parsedWidth = Utils_1.default.parseToInt(baseWidth).bind(function (w) {
            return Utils_1.default.numToPx(minWidth.map(function (mw) { return Math.max(w, mw); }));
        }).getOr(Utils_1.default.numToPx(baseWidth));
        var parsedHeight = Utils_1.default.parseToInt(baseHeight).bind(function (h) {
            return minHeight.map(function (mh) { return Math.max(h, mh); });
        }).getOr(baseHeight);
        var stringWidth = Utils_1.default.numToPx(parsedWidth);
        if (sugar_1.Css.isValidValue('div', 'width', stringWidth)) {
            sugar_1.Css.set(outerContainer.element(), 'width', stringWidth);
        }
        if (!editor.inline) {
            var stringHeight = Utils_1.default.numToPx(parsedHeight);
            if (sugar_1.Css.isValidValue('div', 'height', stringHeight)) {
                sugar_1.Css.set(outerContainer.element(), 'height', stringHeight);
            }
            else {
                sugar_1.Css.set(outerContainer.element(), 'height', '200px');
            }
        }
        return parsedHeight;
    };
    var renderUI = function () {
        FormatControls_1.default.setup(editor, backstage);
        SilverContextMenu.setup(editor, lazySink, backstage);
        Sidebar.setup(editor);
        Throbber.setup(editor, lazyThrobber, backstage.shared);
        var _a = editor.ui.registry.getAll(), buttons = _a.buttons, menuItems = _a.menuItems, contextToolbars = _a.contextToolbars, sidebars = _a.sidebars;
        var toolbarOpt = (0, Settings_1.getMultipleToolbarsSetting)(editor);
        var rawUiConfig = {
            menuItems: menuItems,
            menus: !editor.settings.menu ? {} : katamari_1.Obj.map(editor.settings.menu, function (menu) { return katamari_1.Merger.merge(menu, { items: menu.items }); }),
            menubar: editor.settings.menubar,
            toolbar: toolbarOpt.getOrThunk(function () { return editor.getParam('toolbar', true); }),
            buttons: buttons,
            sidebar: sidebars
        };
        ContextToolbar_1.default.register(editor, contextToolbars, sink, { backstage: backstage });
        var elm = editor.getElement();
        var height = setEditorSize(elm);
        var uiComponents = { mothership: mothership, uiMothership: uiMothership, outerContainer: outerContainer };
        var args = { targetNode: elm, height: height };
        return mode.render(editor, uiComponents, rawUiConfig, backstage, args);
    };
    return { mothership: mothership, uiMothership: uiMothership, backstage: backstage, renderUI: renderUI, getUi: getUi };
};
exports.default = {
    setup: setup
};
