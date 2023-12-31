"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formResizeEvent = exports.formTabChangeEvent = exports.formUnblockEvent = exports.formBlockEvent = exports.formCancelEvent = exports.formCloseEvent = exports.formSubmitEvent = exports.formActionEvent = exports.formChangeEvent = void 0;
var katamari_1 = require("@ephox/katamari");
var formChangeEvent = katamari_1.Id.generate('form-component-change');
exports.formChangeEvent = formChangeEvent;
var formCloseEvent = katamari_1.Id.generate('form-close');
exports.formCloseEvent = formCloseEvent;
var formCancelEvent = katamari_1.Id.generate('form-cancel');
exports.formCancelEvent = formCancelEvent;
var formActionEvent = katamari_1.Id.generate('form-action');
exports.formActionEvent = formActionEvent;
var formSubmitEvent = katamari_1.Id.generate('form-submit');
exports.formSubmitEvent = formSubmitEvent;
var formBlockEvent = katamari_1.Id.generate('form-block');
exports.formBlockEvent = formBlockEvent;
var formUnblockEvent = katamari_1.Id.generate('form-unblock');
exports.formUnblockEvent = formUnblockEvent;
var formTabChangeEvent = katamari_1.Id.generate('form-tabchange');
exports.formTabChangeEvent = formTabChangeEvent;
var formResizeEvent = katamari_1.Id.generate('form-resize');
exports.formResizeEvent = formResizeEvent;
