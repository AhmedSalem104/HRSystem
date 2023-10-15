"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = void 0;
var alloy_1 = require("@ephox/alloy");
var Button_1 = require("tinymce/themes/silver/ui/general/Button");
var Dialogs = require("./Dialogs");
var katamari_1 = require("@ephox/katamari");
var setup = function (extras) {
    var sharedBackstage = extras.backstage.shared;
    var open = function (message, callback) {
        var closeDialog = function (state) {
            alloy_1.ModalDialog.hide(confirmDialog);
            callback(state);
        };
        var memFooterYes = alloy_1.Memento.record((0, Button_1.renderFooterButton)({
            name: 'yes',
            text: 'Yes',
            primary: true,
            align: 'end',
            disabled: false,
            icon: katamari_1.Option.none()
        }, 'submit', extras.backstage));
        var footerNo = (0, Button_1.renderFooterButton)({
            name: 'no',
            text: 'No',
            primary: true,
            align: 'end',
            disabled: false,
            icon: katamari_1.Option.none()
        }, 'cancel', extras.backstage);
        var confirmDialog = alloy_1.GuiFactory.build(Dialogs.renderDialog({
            lazySink: function () { return sharedBackstage.getSink(); },
            headerOverride: katamari_1.Option.some(Dialogs.hiddenHeader),
            partSpecs: {
                title: Dialogs.pUntitled(),
                close: Dialogs.pClose(function () {
                    closeDialog(false);
                }, sharedBackstage.providers),
                body: Dialogs.pBodyMessage(message, sharedBackstage.providers),
                footer: Dialogs.pFooter(Dialogs.pFooterGroup([], [
                    footerNo,
                    memFooterYes.asSpec()
                ]))
            },
            onCancel: function () { return closeDialog(false); },
            onSubmit: function () { return closeDialog(true); },
            extraClasses: ['tox-confirm-dialog']
        }));
        alloy_1.ModalDialog.show(confirmDialog);
        var footerYesButton = memFooterYes.get(confirmDialog);
        alloy_1.Focusing.focus(footerYesButton);
    };
    return {
        open: open
    };
};
exports.setup = setup;
