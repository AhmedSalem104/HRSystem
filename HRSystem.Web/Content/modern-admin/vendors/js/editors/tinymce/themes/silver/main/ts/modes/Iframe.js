"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var DOMUtils_1 = require("tinymce/core/api/dom/DOMUtils");
var Events_1 = require("../api/Events");
var Settings = require("../api/Settings");
var ReadOnly_1 = require("../ReadOnly");
var OuterContainer_1 = require("../ui/general/OuterContainer");
var Integration_1 = require("../ui/menus/menubar/Integration");
var Loader_1 = require("./../ui/skin/Loader");
var Toolbars_1 = require("./Toolbars");
var sand_1 = require("@ephox/sand");
var DOM = DOMUtils_1.default.DOM;
var detection = sand_1.PlatformDetection.detect();
var isTouch = detection.deviceType.isTouch();
var setupEvents = function (editor) {
    var contentWindow = editor.getWin();
    var initialDocEle = editor.getDoc().documentElement;
    var lastWindowDimensions = (0, katamari_1.Cell)((0, sugar_1.Position)(contentWindow.innerWidth, contentWindow.innerHeight));
    var lastDocumentDimensions = (0, katamari_1.Cell)((0, sugar_1.Position)(initialDocEle.offsetWidth, initialDocEle.offsetHeight));
    var resize = function () {
        var docEle = editor.getDoc().documentElement;
        var outer = lastWindowDimensions.get();
        var inner = lastDocumentDimensions.get();
        if (outer.left() !== contentWindow.innerWidth || outer.top() !== contentWindow.innerHeight) {
            lastWindowDimensions.set((0, sugar_1.Position)(contentWindow.innerWidth, contentWindow.innerHeight));
            Events_1.default.fireResizeContent(editor);
        }
        else if (inner.left() !== docEle.offsetWidth || inner.top() !== docEle.offsetHeight) {
            lastDocumentDimensions.set((0, sugar_1.Position)(docEle.offsetWidth, docEle.offsetHeight));
            Events_1.default.fireResizeContent(editor);
        }
    };
    DOM.bind(contentWindow, 'resize', resize);
    var elementLoad = sugar_1.DomEvent.capture(sugar_1.Element.fromDom(editor.getBody()), 'load', resize);
    editor.on('remove', function () {
        elementLoad.unbind();
        DOM.unbind(contentWindow, 'resize', resize);
    });
};
var render = function (editor, uiComponents, rawUiConfig, backstage, args) {
    var lastToolbarWidth = (0, katamari_1.Cell)(0);
    (0, Loader_1.iframe)(editor);
    alloy_1.Attachment.attachSystemAfter(sugar_1.Element.fromDom(args.targetNode), uiComponents.mothership);
    alloy_1.Attachment.attachSystem(sugar_1.Body.body(), uiComponents.uiMothership);
    editor.on('init', function () {
        (0, Toolbars_1.setToolbar)(editor, uiComponents, rawUiConfig, backstage);
        lastToolbarWidth.set(editor.getWin().innerWidth);
        OuterContainer_1.default.setMenubar(uiComponents.outerContainer, (0, Integration_1.identifyMenus)(editor, rawUiConfig));
        OuterContainer_1.default.setSidebar(uiComponents.outerContainer, rawUiConfig.sidebar);
        setupEvents(editor);
    });
    var socket = OuterContainer_1.default.getSocket(uiComponents.outerContainer).getOrDie('Could not find expected socket element');
    if (isTouch === true) {
        sugar_1.Css.setAll(socket.element(), {
            'overflow': 'scroll',
            '-webkit-overflow-scrolling': 'touch'
        });
    }
    (0, ReadOnly_1.setupReadonlyModeSwitch)(editor, uiComponents);
    editor.addCommand('ToggleSidebar', function (ui, value) {
        OuterContainer_1.default.toggleSidebar(uiComponents.outerContainer, value);
        editor.fire('ToggleSidebar');
    });
    editor.addQueryValueHandler('ToggleSidebar', function () {
        return OuterContainer_1.default.whichSidebar(uiComponents.outerContainer);
    });
    var drawer = Settings.getToolbarDrawer(editor);
    var refreshDrawer = function () {
        OuterContainer_1.default.refreshToolbar(uiComponents.outerContainer);
    };
    if (drawer === Settings.ToolbarDrawer.sliding || drawer === Settings.ToolbarDrawer.floating) {
        editor.on('ResizeContent', function () {
            var width = editor.getWin().innerWidth;
            if (width !== lastToolbarWidth.get()) {
                refreshDrawer();
            }
            lastToolbarWidth.set(width);
        });
    }
    return {
        iframeContainer: socket.element().dom(),
        editorContainer: uiComponents.outerContainer.element().dom(),
    };
};
exports.default = {
    render: render,
    getBehaviours: function (_) { return []; }
};
