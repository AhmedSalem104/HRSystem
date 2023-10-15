"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var CaptureBin_1 = require("../../util/CaptureBin");
var ResumeEditing_1 = require("../focus/ResumeEditing");
var stubborn = function (outerBody, cWin, page, frame) {
    var toEditing = function () {
        ResumeEditing_1.default.resume(cWin, frame);
    };
    var toReading = function () {
        CaptureBin_1.default.input(outerBody, sugar_1.Focus.blur);
    };
    var captureInput = sugar_1.DomEvent.bind(page, 'keydown', function (evt) {
        if (!katamari_1.Arr.contains(['input', 'textarea'], sugar_1.Node.name(evt.target()))) {
            toEditing();
        }
    });
    var onToolbarTouch = function () {
    };
    var destroy = function () {
        captureInput.unbind();
    };
    return {
        toReading: toReading,
        toEditing: toEditing,
        onToolbarTouch: onToolbarTouch,
        destroy: destroy
    };
};
var timid = function (outerBody, cWin, page, frame) {
    var dismissKeyboard = function () {
        sugar_1.Focus.blur(frame);
    };
    var onToolbarTouch = function () {
        dismissKeyboard();
    };
    var toReading = function () {
        dismissKeyboard();
    };
    var toEditing = function () {
        ResumeEditing_1.default.resume(cWin, frame);
    };
    return {
        toReading: toReading,
        toEditing: toEditing,
        onToolbarTouch: onToolbarTouch,
        destroy: katamari_1.Fun.noop
    };
};
exports.default = {
    stubborn: stubborn,
    timid: timid
};
