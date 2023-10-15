"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var Styles_1 = require("../../style/Styles");
var Scrollable_1 = require("../../touch/scroll/Scrollable");
var MetaViewport_1 = require("../../touch/view/MetaViewport");
var Thor_1 = require("../../util/Thor");
var Scrollables_1 = require("../scroll/Scrollables");
var IosKeyboard_1 = require("../view/IosKeyboard");
var IosEvents_1 = require("./IosEvents");
var IosSetup_1 = require("./IosSetup");
var PlatformEditor_1 = require("./PlatformEditor");
var dom_globals_1 = require("@ephox/dom-globals");
var create = function (platform, mask) {
    var meta = MetaViewport_1.default.tag();
    var priorState = katamari_1.Singleton.value();
    var scrollEvents = katamari_1.Singleton.value();
    var iosApi = katamari_1.Singleton.api();
    var iosEvents = katamari_1.Singleton.api();
    var enter = function () {
        mask.hide();
        var doc = sugar_1.Element.fromDom(dom_globals_1.document);
        PlatformEditor_1.default.getActiveApi(platform.editor).each(function (editorApi) {
            priorState.set({
                socketHeight: sugar_1.Css.getRaw(platform.socket, 'height'),
                iframeHeight: sugar_1.Css.getRaw(editorApi.frame(), 'height'),
                outerScroll: dom_globals_1.document.body.scrollTop
            });
            scrollEvents.set({
                exclusives: Scrollables_1.default.exclusive(doc, '.' + Scrollable_1.default.scrollable())
            });
            sugar_1.Class.add(platform.container, Styles_1.default.resolve('fullscreen-maximized'));
            Thor_1.default.clobberStyles(platform.container, editorApi.body());
            meta.maximize();
            sugar_1.Css.set(platform.socket, 'overflow', 'scroll');
            sugar_1.Css.set(platform.socket, '-webkit-overflow-scrolling', 'touch');
            sugar_1.Focus.focus(editorApi.body());
            var setupBag = katamari_1.Struct.immutableBag([
                'cWin',
                'ceBody',
                'socket',
                'toolstrip',
                'toolbar',
                'dropup',
                'contentElement',
                'cursor',
                'keyboardType',
                'isScrolling',
                'outerWindow',
                'outerBody'
            ], []);
            iosApi.set(IosSetup_1.default.setup(setupBag({
                cWin: editorApi.win(),
                ceBody: editorApi.body(),
                socket: platform.socket,
                toolstrip: platform.toolstrip,
                toolbar: platform.toolbar,
                dropup: platform.dropup.element(),
                contentElement: editorApi.frame(),
                cursor: katamari_1.Fun.noop,
                outerBody: platform.body,
                outerWindow: platform.win,
                keyboardType: IosKeyboard_1.default.stubborn,
                isScrolling: function () {
                    var scrollValue = scrollEvents;
                    return scrollValue.get().exists(function (s) {
                        return s.socket.isScrolling();
                    });
                }
            })));
            iosApi.run(function (api) {
                api.syncHeight();
            });
            iosEvents.set(IosEvents_1.default.initEvents(editorApi, iosApi, platform.toolstrip, platform.socket, platform.dropup));
        });
    };
    var exit = function () {
        meta.restore();
        iosEvents.clear();
        iosApi.clear();
        mask.show();
        priorState.on(function (s) {
            s.socketHeight.each(function (h) {
                sugar_1.Css.set(platform.socket, 'height', h);
            });
            s.iframeHeight.each(function (h) {
                sugar_1.Css.set(platform.editor.getFrame(), 'height', h);
            });
            dom_globals_1.document.body.scrollTop = s.scrollTop;
        });
        priorState.clear();
        scrollEvents.on(function (s) {
            s.exclusives.unbind();
        });
        scrollEvents.clear();
        sugar_1.Class.remove(platform.container, Styles_1.default.resolve('fullscreen-maximized'));
        Thor_1.default.restoreStyles();
        Scrollable_1.default.deregister(platform.toolbar);
        sugar_1.Css.remove(platform.socket, 'overflow');
        sugar_1.Css.remove(platform.socket, '-webkit-overflow-scrolling');
        sugar_1.Focus.blur(platform.editor.getFrame());
        PlatformEditor_1.default.getActiveApi(platform.editor).each(function (editorApi) {
            editorApi.clearSelection();
        });
    };
    var refreshStructure = function () {
        iosApi.run(function (api) {
            api.refreshStructure();
        });
    };
    return {
        enter: enter,
        refreshStructure: refreshStructure,
        exit: exit
    };
};
exports.default = {
    create: create
};
