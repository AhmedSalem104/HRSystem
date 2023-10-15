"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Preview_1 = require("./preview/Preview");
var SearchReplace_1 = require("./searchreplace/SearchReplace");
var DialogComponentsDemo_1 = require("./DialogComponentsDemo");
var AlertDemo_1 = require("./alert/AlertDemo");
var NotificationDemo_1 = require("./notification/NotificationDemo");
window.components = {
    Preview: Preview_1.default,
    SearchReplace: SearchReplace_1.open,
    DialogComponentsDemo: DialogComponentsDemo_1.default,
    AlertDemo: AlertDemo_1.default,
    NotificationDemo: NotificationDemo_1.default
};
