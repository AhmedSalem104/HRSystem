"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interpretWithoutForm = exports.interpretInForm = void 0;
var boulder_1 = require("@ephox/boulder");
var dom_globals_1 = require("@ephox/dom-globals");
var katamari_1 = require("@ephox/katamari");
var AlertBanner_1 = require("tinymce/themes/silver/ui/general/AlertBanner");
var Autocomplete_1 = require("../dialog/Autocomplete");
var Bar_1 = require("../dialog/Bar");
var ColorInput_1 = require("../dialog/ColorInput");
var ColorPicker_1 = require("../dialog/ColorPicker");
var CustomEditor_1 = require("../dialog/CustomEditor");
var Dropzone_1 = require("../dialog/Dropzone");
var Grid_1 = require("../dialog/Grid");
var IFrame_1 = require("../dialog/IFrame");
var ImageTools_1 = require("../dialog/imagetools/ImageTools");
var SelectBox_1 = require("../dialog/SelectBox");
var SizeInput_1 = require("../dialog/SizeInput");
var TextField_1 = require("../dialog/TextField");
var UrlInput_1 = require("../dialog/UrlInput");
var Button_1 = require("./Button");
var Checkbox_1 = require("./Checkbox");
var HtmlPanel_1 = require("./HtmlPanel");
var Listbox_1 = require("./Listbox");
var Label_1 = require("../dialog/Label");
var Collection_1 = require("../dialog/Collection");
var Table_1 = require("../dialog/Table");
var Panel_1 = require("../dialog/Panel");
var make = function (render) {
    return function (parts, spec, backstage) {
        return boulder_1.Objects.readOptFrom(spec, 'name').fold(function () { return render(spec, backstage); }, function (fieldName) { return parts.field(fieldName, render(spec, backstage)); });
    };
};
var makeIframe = function (render) {
    return function (parts, spec, backstage) {
        var iframeSpec = katamari_1.Merger.deepMerge(spec, {
            source: 'dynamic'
        });
        return make(render)(parts, iframeSpec, backstage);
    };
};
var factories = {
    bar: make(function (spec, backstage) { return (0, Bar_1.renderBar)(spec, backstage.shared); }),
    collection: make(function (spec, backstage) { return (0, Collection_1.renderCollection)(spec, backstage.shared.providers); }),
    alloy: make(katamari_1.Fun.identity),
    alertbanner: make(function (spec, backstage) { return (0, AlertBanner_1.renderAlertBanner)(spec, backstage.shared.providers); }),
    input: make(function (spec, backstage) { return (0, TextField_1.renderInput)(spec, backstage.shared.providers); }),
    textarea: make(function (spec, backstage) { return (0, TextField_1.renderTextarea)(spec, backstage.shared.providers); }),
    listbox: make(function (spec, backstage) { return (0, Listbox_1.renderListbox)(spec, backstage.shared.providers); }),
    label: make(function (spec, backstage) { return (0, Label_1.renderLabel)(spec, backstage.shared); }),
    iframe: makeIframe(function (spec, backstage) { return (0, IFrame_1.renderIFrame)(spec, backstage.shared.providers); }),
    autocomplete: make(function (spec, backstage) { return (0, Autocomplete_1.renderAutocomplete)(spec, backstage); }),
    button: make(function (spec, backstage) { return (0, Button_1.renderDialogButton)(spec, backstage.shared.providers); }),
    checkbox: make(function (spec, backstage) { return (0, Checkbox_1.renderCheckbox)(spec, backstage.shared.providers); }),
    colorinput: make(function (spec, backstage) { return (0, ColorInput_1.renderColorInput)(spec, backstage.shared, backstage.colorinput); }),
    colorpicker: make(ColorPicker_1.renderColorPicker),
    dropzone: make(function (spec, backstage) { return (0, Dropzone_1.renderDropZone)(spec, backstage.shared.providers); }),
    grid: make(function (spec, backstage) { return (0, Grid_1.renderGrid)(spec, backstage.shared); }),
    selectbox: make(function (spec, backstage) { return (0, SelectBox_1.renderSelectBox)(spec, backstage.shared.providers); }),
    sizeinput: make(function (spec, backstage) { return (0, SizeInput_1.renderSizeInput)(spec, backstage.shared.providers); }),
    urlinput: make(function (spec, backstage) { return (0, UrlInput_1.renderUrlInput)(spec, backstage, backstage.urlinput); }),
    customeditor: make(CustomEditor_1.renderCustomEditor),
    htmlpanel: make(HtmlPanel_1.renderHtmlPanel),
    imagetools: make(function (spec, backstage) { return (0, ImageTools_1.renderImageTools)(spec, backstage.shared.providers); }),
    table: make(function (spec, backstage) { return (0, Table_1.renderTable)(spec, backstage.shared.providers); }),
    panel: make(function (spec, backstage) { return (0, Panel_1.renderPanel)(spec, backstage); }),
};
var noFormParts = {
    field: function (_name, spec) { return spec; }
};
var interpretInForm = function (parts, spec, oldBackstage) {
    var newBackstage = katamari_1.Merger.deepMerge(oldBackstage, {
        shared: {
            interpreter: function (childSpec) {
                return interpretParts(parts, childSpec, newBackstage);
            }
        }
    });
    return interpretParts(parts, spec, newBackstage);
};
exports.interpretInForm = interpretInForm;
var interpretParts = function (parts, spec, backstage) {
    return boulder_1.Objects.readOptFrom(factories, spec.type).fold(function () {
        dom_globals_1.console.error("Unknown factory type \"".concat(spec.type, "\", defaulting to container: "), spec);
        return spec;
    }, function (factory) {
        return factory(parts, spec, backstage);
    });
};
var interpretWithoutForm = function (spec, backstage) {
    var parts = noFormParts;
    return interpretParts(parts, spec, backstage);
};
exports.interpretWithoutForm = interpretWithoutForm;
