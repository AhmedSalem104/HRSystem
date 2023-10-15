"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var AndroidEvents_1 = require("./AndroidEvents");
var AndroidSetup_1 = require("./AndroidSetup");
var PlatformEditor_1 = require("../../ios/core/PlatformEditor");
var Thor_1 = require("../../util/Thor");
var Styles_1 = require("../../style/Styles");
var MetaViewport_1 = require("../../touch/view/MetaViewport");
var create = function (platform, mask) {
    var meta = MetaViewport_1.default.tag();
    var androidApi = katamari_1.Singleton.api();
    var androidEvents = katamari_1.Singleton.api();
    var enter = function () {
        mask.hide();
        sugar_1.Class.add(platform.container, Styles_1.default.resolve('fullscreen-maximized'));
        sugar_1.Class.add(platform.container, Styles_1.default.resolve('android-maximized'));
        meta.maximize();
        sugar_1.Class.add(platform.body, Styles_1.default.resolve('android-scroll-reload'));
        androidApi.set(AndroidSetup_1.default.setup(platform.win, PlatformEditor_1.default.getWin(platform.editor).getOrDie('no')));
        PlatformEditor_1.default.getActiveApi(platform.editor).each(function (editorApi) {
            Thor_1.default.clobberStyles(platform.container, editorApi.body());
            androidEvents.set(AndroidEvents_1.default.initEvents(editorApi, platform.toolstrip, platform.alloy));
        });
    };
    var exit = function () {
        meta.restore();
        mask.show();
        sugar_1.Class.remove(platform.container, Styles_1.default.resolve('fullscreen-maximized'));
        sugar_1.Class.remove(platform.container, Styles_1.default.resolve('android-maximized'));
        Thor_1.default.restoreStyles();
        sugar_1.Class.remove(platform.body, Styles_1.default.resolve('android-scroll-reload'));
        androidEvents.clear();
        androidApi.clear();
    };
    return {
        enter: enter,
        exit: exit
    };
};
exports.default = {
    create: create
};
