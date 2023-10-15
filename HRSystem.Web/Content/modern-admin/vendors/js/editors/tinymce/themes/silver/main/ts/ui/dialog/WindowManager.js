"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alloy_1 = require("@ephox/alloy");
var boulder_1 = require("@ephox/boulder");
var bridge_1 = require("@ephox/bridge");
var FormEvents_1 = require("../general/FormEvents");
var SilverDialog_1 = require("../window/SilverDialog");
var SilverUrlDialog_1 = require("../window/SilverUrlDialog");
var SilverInlineDialog_1 = require("../window/SilverInlineDialog");
var AlertDialog = require("./AlertDialog");
var ConfirmDialog = require("./ConfirmDialog");
var validateData = function (data, validator) {
    return boulder_1.ValueSchema.getOrDie(boulder_1.ValueSchema.asRaw('data', validator, data));
};
var setup = function (extras) {
    var alertDialog = AlertDialog.setup(extras);
    var confirmDialog = ConfirmDialog.setup(extras);
    var open = function (config, params, closeWindow) {
        if (params !== undefined && params.inline === 'toolbar') {
            return openInlineDialog(config, extras.backstage.shared.anchors.toolbar(), closeWindow, params.ariaAttrs);
        }
        else if (params !== undefined && params.inline === 'cursor') {
            return openInlineDialog(config, extras.backstage.shared.anchors.cursor(), closeWindow, params.ariaAttrs);
        }
        else {
            return openModalDialog(config, closeWindow);
        }
    };
    var openUrl = function (config, closeWindow) {
        return openModalUrlDialog(config, closeWindow);
    };
    var openModalUrlDialog = function (config, closeWindow) {
        var factory = function (contents) {
            var dialog = (0, SilverUrlDialog_1.renderUrlDialog)(contents, {
                closeWindow: function () {
                    alloy_1.ModalDialog.hide(dialog.dialog);
                    closeWindow(dialog.instanceApi);
                }
            }, extras.editor, extras.backstage);
            alloy_1.ModalDialog.show(dialog.dialog);
            return dialog.instanceApi;
        };
        return bridge_1.DialogManager.DialogManager.openUrl(factory, config);
    };
    var openModalDialog = function (config, closeWindow) {
        var factory = function (contents, internalInitialData, dataValidator) {
            var initialData = internalInitialData;
            var dialogInit = {
                dataValidator: dataValidator,
                initialData: initialData,
                internalDialog: contents
            };
            var dialog = (0, SilverDialog_1.renderDialog)(dialogInit, {
                redial: bridge_1.DialogManager.DialogManager.redial,
                closeWindow: function () {
                    alloy_1.ModalDialog.hide(dialog.dialog);
                    closeWindow(dialog.instanceApi);
                }
            }, extras.backstage);
            alloy_1.ModalDialog.show(dialog.dialog);
            dialog.instanceApi.setData(initialData);
            return dialog.instanceApi;
        };
        return bridge_1.DialogManager.DialogManager.open(factory, config);
    };
    var openInlineDialog = function (config, anchor, closeWindow, ariaAttrs) {
        var factory = function (contents, internalInitialData, dataValidator) {
            var initialData = validateData(internalInitialData, dataValidator);
            var dialogInit = {
                dataValidator: dataValidator,
                initialData: initialData,
                internalDialog: contents
            };
            var dialogUi = (0, SilverInlineDialog_1.renderInlineDialog)(dialogInit, {
                redial: bridge_1.DialogManager.DialogManager.redial,
                closeWindow: function () {
                    alloy_1.InlineView.hide(inlineDialog);
                    closeWindow(dialogUi.instanceApi);
                }
            }, extras.backstage, ariaAttrs);
            var inlineDialog = alloy_1.GuiFactory.build(alloy_1.InlineView.sketch({
                lazySink: extras.backstage.shared.getSink,
                dom: {
                    tag: 'div',
                    classes: []
                },
                fireDismissalEventInstead: {},
                inlineBehaviours: alloy_1.Behaviour.derive([
                    alloy_1.AddEventsBehaviour.config('window-manager-inline-events', [
                        alloy_1.AlloyEvents.run(alloy_1.SystemEvents.dismissRequested(), function (comp, se) {
                            alloy_1.AlloyTriggers.emit(dialogUi.dialog, FormEvents_1.formCancelEvent);
                        })
                    ])
                ])
            }));
            alloy_1.InlineView.showAt(inlineDialog, anchor, alloy_1.GuiFactory.premade(dialogUi.dialog));
            dialogUi.instanceApi.setData(initialData);
            alloy_1.Keying.focusIn(dialogUi.dialog);
            return dialogUi.instanceApi;
        };
        return bridge_1.DialogManager.DialogManager.open(factory, config);
    };
    var confirm = function (message, callback) {
        confirmDialog.open(message, function (state) {
            callback(state);
        });
    };
    var alert = function (message, callback) {
        alertDialog.open(message, function () {
            callback();
        });
    };
    var close = function (instanceApi) {
        instanceApi.close();
    };
    return {
        open: open,
        openUrl: openUrl,
        alert: alert,
        close: close,
        confirm: confirm
    };
};
exports.default = {
    setup: setup
};
