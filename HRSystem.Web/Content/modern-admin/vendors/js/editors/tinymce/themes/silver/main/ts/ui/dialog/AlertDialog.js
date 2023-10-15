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
        var closeDialog = function () {
            alloy_1.ModalDialog.hide(alertDialog);
            callback();
        };
        var memFooterClose = alloy_1.Memento.record((0, Button_1.renderFooterButton)({
            name: 'close-alert',
            text: 'OK',
            primary: true,
            align: 'end',
            disabled: false,
            icon: katamari_1.Option.none()
        }, 'cancel', extras.backstage));
        var alertDialog = alloy_1.GuiFactory.build(Dialogs.renderDialog({
            lazySink: function () { return sharedBackstage.getSink(); },
            headerOverride: katamari_1.Option.some(Dialogs.hiddenHeader),
            partSpecs: {
                title: Dialogs.pUntitled(),
                close: Dialogs.pClose(function () {
                    closeDialog();
                }, sharedBackstage.providers),
                body: Dialogs.pBodyMessage(message, sharedBackstage.providers),
                footer: Dialogs.pFooter(Dialogs.pFooterGroup([], [
                    memFooterClose.asSpec()
                ]))
            },
            onCancel: function () { return closeDialog(); },
            onSubmit: katamari_1.Fun.noop,
            extraClasses: ['tox-alert-dialog']
        }));
        alloy_1.ModalDialog.show(alertDialog);
        var footerCloseButton = memFooterClose.get(alertDialog);
        alloy_1.Focusing.focus(footerCloseButton);
    };
    return {
        open: open
    };
};
exports.setup = setup;
