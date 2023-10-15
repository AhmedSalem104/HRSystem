"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var DOMUtils_1 = require("tinymce/core/api/dom/DOMUtils");
var Settings_1 = require("../api/Settings");
var ReadOnly_1 = require("../ReadOnly");
var OuterContainer_1 = require("../ui/general/OuterContainer");
var Integration_1 = require("../ui/menus/menubar/Integration");
var Loader_1 = require("./../ui/skin/Loader");
var Toolbars_1 = require("./Toolbars");
var render = function (editor, uiComponents, rawUiConfig, backstage, args) {
    var floatContainer;
    var DOM = DOMUtils_1.default.DOM;
    var useFixedToolbarContainer = (0, Settings_1.useFixedContainer)(editor);
    var splitSetting = (0, Settings_1.getToolbarDrawer)(editor);
    var split = splitSetting === Settings_1.ToolbarDrawer.sliding || splitSetting === Settings_1.ToolbarDrawer.floating;
    (0, Loader_1.inline)(editor);
    var calcPosition = function (offset) {
        if (offset === void 0) { offset = 0; }
        var location = sugar_1.Location.absolute(sugar_1.Element.fromDom(editor.getBody()));
        return {
            top: Math.round(location.top() - sugar_1.Height.get(floatContainer.element())) + offset,
            left: Math.round(location.left())
        };
    };
    var setChromePosition = function (toolbar) {
        var isDocked = sugar_1.Css.getRaw(floatContainer.element(), 'position').is('fixed');
        var offset = split ? toolbar.fold(function () { return 0; }, function (tbar) {
            return tbar.components().length > 1 ? sugar_1.Height.get(tbar.components()[1].element()) : 0;
        }) : 0;
        var position = calcPosition(offset);
        if (isDocked) {
            sugar_1.Attr.setAll(floatContainer.element(), katamari_1.Obj.tupleMap(position, function (value, key) { return ({ k: "data-dock-".concat(key), v: value }); }));
        }
        else {
            sugar_1.Css.setAll(floatContainer.element(), katamari_1.Obj.map(position, function (value) { return value + 'px'; }));
        }
        alloy_1.Docking.refresh(floatContainer);
    };
    var updateChromeUi = function () {
        var toolbar = OuterContainer_1.default.getToolbar(uiComponents.outerContainer);
        if (split) {
            OuterContainer_1.default.refreshToolbar(uiComponents.outerContainer);
        }
        if (!useFixedToolbarContainer) {
            setChromePosition(toolbar);
        }
    };
    var show = function () {
        sugar_1.Css.set(uiComponents.outerContainer.element(), 'display', 'flex');
        DOM.addClass(editor.getBody(), 'mce-edit-focus');
        sugar_1.Css.remove(uiComponents.uiMothership.element(), 'display');
        updateChromeUi();
    };
    var hide = function () {
        if (uiComponents.outerContainer) {
            sugar_1.Css.set(uiComponents.outerContainer.element(), 'display', 'none');
            DOM.removeClass(editor.getBody(), 'mce-edit-focus');
        }
        sugar_1.Css.set(uiComponents.uiMothership.element(), 'display', 'none');
    };
    var render = function () {
        if (floatContainer) {
            show();
            return;
        }
        floatContainer = uiComponents.outerContainer;
        var uiContainer = (0, Settings_1.getUiContainer)(editor);
        alloy_1.Attachment.attachSystem(uiContainer, uiComponents.mothership);
        alloy_1.Attachment.attachSystem(uiContainer, uiComponents.uiMothership);
        (0, Toolbars_1.setToolbar)(editor, uiComponents, rawUiConfig, backstage);
        OuterContainer_1.default.setMenubar(uiComponents.outerContainer, (0, Integration_1.identifyMenus)(editor, rawUiConfig));
        if (!useFixedToolbarContainer) {
            sugar_1.Css.set(floatContainer.element(), 'position', 'absolute');
        }
        updateChromeUi();
        show();
        editor.on('NodeChange ResizeWindow', updateChromeUi);
        editor.on('activate', show);
        editor.on('deactivate', hide);
        editor.nodeChanged();
    };
    editor.on('focus', render);
    editor.on('blur hide', hide);
    editor.on('init', function () {
        if (editor.hasFocus()) {
            render();
        }
    });
    (0, ReadOnly_1.setupReadonlyModeSwitch)(editor, uiComponents);
    return {
        editorContainer: uiComponents.outerContainer.element().dom()
    };
};
var getBehaviours = function (editor) {
    return (0, Settings_1.useFixedContainer)(editor) ? [] : [
        alloy_1.Docking.config({
            leftAttr: 'data-dock-left',
            topAttr: 'data-dock-top',
            contextual: {
                lazyContext: function (_) {
                    return katamari_1.Option.from(editor).map(function (ed) { return sugar_1.Element.fromDom(ed.getBody()); });
                },
                fadeInClass: 'tox-toolbar-dock-fadein',
                fadeOutClass: 'tox-toolbar-dock-fadeout',
                transitionClass: 'tox-toolbar-dock-transition'
            }
        }),
        alloy_1.Focusing.config({})
    ];
};
exports.default = { render: render, getBehaviours: getBehaviours };
