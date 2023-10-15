"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderDialog = void 0;
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var SilverDialogBody_1 = require("./SilverDialogBody");
var SilverDialogEvents_1 = require("./SilverDialogEvents");
var SilverDialogFooter_1 = require("./SilverDialogFooter");
var SilverDialogInstanceApi_1 = require("./SilverDialogInstanceApi");
var SilverDialogCommon = require("./SilverDialogCommon");
var renderDialog = function (dialogInit, extra, backstage) {
    var header = SilverDialogCommon.getHeader(dialogInit.internalDialog.title, backstage);
    var body = (0, SilverDialogBody_1.renderModalBody)({
        body: dialogInit.internalDialog.body
    }, backstage);
    var storagedMenuButtons = SilverDialogCommon.mapMenuButtons(dialogInit.internalDialog.buttons);
    var objOfCells = SilverDialogCommon.extractCellsToObject(storagedMenuButtons);
    var footer = (0, SilverDialogFooter_1.renderModalFooter)({
        buttons: storagedMenuButtons
    }, backstage);
    var dialogEvents = SilverDialogEvents_1.SilverDialogEvents.initDialog(function () { return instanceApi; }, SilverDialogCommon.getEventExtras(function () { return dialog; }, extra));
    var dialogSize = dialogInit.internalDialog.size !== 'normal'
        ? dialogInit.internalDialog.size === 'large'
            ? ['tox-dialog--width-lg']
            : ['tox-dialog--width-md']
        : [];
    var spec = {
        header: header,
        body: body,
        footer: katamari_1.Option.some(footer),
        extraClasses: dialogSize,
        extraBehaviours: [],
        extraStyles: {}
    };
    var dialog = SilverDialogCommon.renderModalDialog(spec, dialogInit, dialogEvents, backstage);
    var modalAccess = (function () {
        var getForm = function () {
            var outerForm = alloy_1.ModalDialog.getBody(dialog);
            return alloy_1.Composing.getCurrent(outerForm).getOr(outerForm);
        };
        return {
            getRoot: function () { return dialog; },
            getBody: function () { return alloy_1.ModalDialog.getBody(dialog); },
            getFooter: function () { return alloy_1.ModalDialog.getFooter(dialog); },
            getFormWrapper: getForm
        };
    })();
    var instanceApi = (0, SilverDialogInstanceApi_1.getDialogApi)(modalAccess, extra.redial, objOfCells);
    return {
        dialog: dialog,
        instanceApi: instanceApi
    };
};
exports.renderDialog = renderDialog;
