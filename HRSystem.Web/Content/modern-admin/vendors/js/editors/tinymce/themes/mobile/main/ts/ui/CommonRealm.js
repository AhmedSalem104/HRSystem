"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alloy_1 = require("@ephox/alloy");
var UiDomFactory = require("../util/UiDomFactory");
var makeEditSwitch = function (webapp) {
    return alloy_1.GuiFactory.build(alloy_1.Button.sketch({
        dom: UiDomFactory.dom('<div class="${prefix}-mask-edit-icon ${prefix}-icon"></div>'),
        action: function () {
            webapp.run(function (w) {
                w.setReadOnly(false);
            });
        }
    }));
};
var makeSocket = function () {
    return alloy_1.GuiFactory.build(alloy_1.Container.sketch({
        dom: UiDomFactory.dom('<div class="${prefix}-editor-socket"></div>'),
        components: [],
        containerBehaviours: alloy_1.Behaviour.derive([
            alloy_1.Replacing.config({})
        ])
    }));
};
var showEdit = function (socket, switchToEdit) {
    alloy_1.Replacing.append(socket, alloy_1.GuiFactory.premade(switchToEdit));
};
var hideEdit = function (socket, switchToEdit) {
    alloy_1.Replacing.remove(socket, switchToEdit);
};
var updateMode = function (socket, switchToEdit, readOnly, root) {
    var swap = (readOnly === true) ? alloy_1.Swapping.toAlpha : alloy_1.Swapping.toOmega;
    swap(root);
    var f = readOnly ? showEdit : hideEdit;
    f(socket, switchToEdit);
};
exports.default = {
    makeEditSwitch: makeEditSwitch,
    makeSocket: makeSocket,
    updateMode: updateMode
};
