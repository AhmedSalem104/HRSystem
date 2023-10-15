"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ephox/katamari");
var DemoDialogBuilder_1 = require("./DemoDialogBuilder");
var AnchorDialogSpec_1 = require("./spec/AnchorDialogSpec");
var CharmapDialogSpec_1 = require("./spec/CharmapDialogSpec");
var CodeSampleDialogSpec_1 = require("./spec/CodeSampleDialogSpec");
var ColorPickerDialogSpec_1 = require("./spec/ColorPickerDialogSpec");
var DocumentPropsDialogSpec_1 = require("./spec/DocumentPropsDialogSpec");
var FindReplaceDialogSpec_1 = require("./spec/FindReplaceDialogSpec");
var ImageDialogSpec_1 = require("./spec/ImageDialogSpec");
var LinkDialogSpec_1 = require("./spec/LinkDialogSpec");
var MediaDialogSpec_1 = require("./spec/MediaDialogSpec");
var PreviewDialogSpec_1 = require("./spec/PreviewDialogSpec");
var TableCellDialogSpec_1 = require("./spec/TableCellDialogSpec");
var TableDialogSpec_1 = require("./spec/TableDialogSpec");
var TableRowDialogSpec_1 = require("./spec/TableRowDialogSpec");
var TemplateDialogSpec_1 = require("./spec/TemplateDialogSpec");
var AlertBannerDialogSpec_1 = require("./spec/AlertBannerDialogSpec");
var CustomRediallingSpec_1 = require("./spec/CustomRediallingSpec");
var UrlDialogDemo_1 = require("./UrlDialogDemo");
var demo = function () {
    katamari_1.Arr.map([
        CustomRediallingSpec_1.default,
        AlertBannerDialogSpec_1.default,
        AnchorDialogSpec_1.default,
        CharmapDialogSpec_1.default,
        CodeSampleDialogSpec_1.default,
        ColorPickerDialogSpec_1.default,
        DocumentPropsDialogSpec_1.default,
        FindReplaceDialogSpec_1.default,
        ImageDialogSpec_1.default,
        LinkDialogSpec_1.default,
        MediaDialogSpec_1.default,
        PreviewDialogSpec_1.default,
        TableCellDialogSpec_1.default,
        TableDialogSpec_1.default,
        TableRowDialogSpec_1.default,
        TemplateDialogSpec_1.default
    ], DemoDialogBuilder_1.buildDemoDialog);
};
window.dialogdemos = {
    demo: demo,
    UrlDialogDemo: UrlDialogDemo_1.default
};
