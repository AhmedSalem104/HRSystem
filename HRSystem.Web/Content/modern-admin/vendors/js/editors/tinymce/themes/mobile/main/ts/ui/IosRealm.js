"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var IosWebapp_1 = require("../api/IosWebapp");
var Styles_1 = require("../style/Styles");
var ScrollingToolbar_1 = require("../toolbar/ScrollingToolbar");
var CommonRealm_1 = require("./CommonRealm");
var Dropup = require("./Dropup");
var OuterContainer_1 = require("./OuterContainer");
function default_1(scrollIntoView) {
    var alloy = (0, OuterContainer_1.default)({
        classes: [Styles_1.default.resolve('ios-container')]
    });
    var toolbar = (0, ScrollingToolbar_1.default)();
    var webapp = katamari_1.Singleton.api();
    var switchToEdit = CommonRealm_1.default.makeEditSwitch(webapp);
    var socket = CommonRealm_1.default.makeSocket();
    var dropup = Dropup.build(function () {
        webapp.run(function (w) {
            w.refreshStructure();
        });
    }, scrollIntoView);
    alloy.add(toolbar.wrapper());
    alloy.add(socket);
    alloy.add(dropup.component());
    var setToolbarGroups = function (rawGroups) {
        var groups = toolbar.createGroups(rawGroups);
        toolbar.setGroups(groups);
    };
    var setContextToolbar = function (rawGroups) {
        var groups = toolbar.createGroups(rawGroups);
        toolbar.setContextToolbar(groups);
    };
    var focusToolbar = function () {
        toolbar.focus();
    };
    var restoreToolbar = function () {
        toolbar.restoreToolbar();
    };
    var init = function (spec) {
        webapp.set(IosWebapp_1.default.produce(spec));
    };
    var exit = function () {
        webapp.run(function (w) {
            alloy_1.Replacing.remove(socket, switchToEdit);
            w.exit();
        });
    };
    var updateMode = function (readOnly) {
        CommonRealm_1.default.updateMode(socket, switchToEdit, readOnly, alloy.root());
    };
    return {
        system: katamari_1.Fun.constant(alloy),
        element: alloy.element,
        init: init,
        exit: exit,
        setToolbarGroups: setToolbarGroups,
        setContextToolbar: setContextToolbar,
        focusToolbar: focusToolbar,
        restoreToolbar: restoreToolbar,
        updateMode: updateMode,
        socket: katamari_1.Fun.constant(socket),
        dropup: katamari_1.Fun.constant(dropup)
    };
}
exports.default = default_1;
