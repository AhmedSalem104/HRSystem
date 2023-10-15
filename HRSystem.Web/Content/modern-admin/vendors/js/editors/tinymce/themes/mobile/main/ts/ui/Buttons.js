"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var Receivers_1 = require("../channels/Receivers");
var Styles_1 = require("../style/Styles");
var UiDomFactory = require("../util/UiDomFactory");
var forToolbarCommand = function (editor, command) {
    return forToolbar(command, function () {
        editor.execCommand(command);
    }, {}, editor);
};
var getToggleBehaviours = function (command) {
    return alloy_1.Behaviour.derive([
        alloy_1.Toggling.config({
            toggleClass: Styles_1.default.resolve('toolbar-button-selected'),
            toggleOnExecute: false,
            aria: {
                mode: 'pressed'
            }
        }),
        Receivers_1.default.format(command, function (button, status) {
            var toggle = status ? alloy_1.Toggling.on : alloy_1.Toggling.off;
            toggle(button);
        })
    ]);
};
var forToolbarStateCommand = function (editor, command) {
    var extraBehaviours = getToggleBehaviours(command);
    return forToolbar(command, function () {
        editor.execCommand(command);
    }, extraBehaviours, editor);
};
var forToolbarStateAction = function (editor, clazz, command, action) {
    var extraBehaviours = getToggleBehaviours(command);
    return forToolbar(clazz, action, extraBehaviours, editor);
};
var getToolbarIconButton = function (clazz, editor) {
    var icons = editor.ui.registry.getAll().icons;
    var optOxideIcon = katamari_1.Option.from(icons[clazz]);
    return optOxideIcon.fold(function () { return UiDomFactory.dom('<span class="${prefix}-toolbar-button ${prefix}-toolbar-group-item ${prefix}-icon-' + clazz + ' ${prefix}-icon"></span>'); }, function (icon) { return UiDomFactory.dom('<span class="${prefix}-toolbar-button ${prefix}-toolbar-group-item">' + icon + '</span>'); });
};
var forToolbar = function (clazz, action, extraBehaviours, editor) {
    return alloy_1.Button.sketch({
        dom: getToolbarIconButton(clazz, editor),
        action: action,
        buttonBehaviours: katamari_1.Merger.deepMerge(alloy_1.Behaviour.derive([
            alloy_1.Unselecting.config({})
        ]), extraBehaviours)
    });
};
exports.default = {
    forToolbar: forToolbar,
    forToolbarCommand: forToolbarCommand,
    forToolbarStateAction: forToolbarStateAction,
    forToolbarStateCommand: forToolbarStateCommand,
    getToolbarIconButton: getToolbarIconButton
};
