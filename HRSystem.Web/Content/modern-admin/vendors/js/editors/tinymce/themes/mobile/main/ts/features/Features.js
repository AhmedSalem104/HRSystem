"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alloy_1 = require("@ephox/alloy");
var boulder_1 = require("@ephox/boulder");
var katamari_1 = require("@ephox/katamari");
var Receivers_1 = require("../channels/Receivers");
var TinyChannels_1 = require("../channels/TinyChannels");
var Styles_1 = require("../style/Styles");
var Buttons_1 = require("../ui/Buttons");
var ColorSlider_1 = require("../ui/ColorSlider");
var FontSizeSlider = require("../ui/FontSizeSlider");
var ImagePicker = require("../ui/ImagePicker");
var LinkButton = require("../ui/LinkButton");
var StyleFormats_1 = require("../util/StyleFormats");
var defaults = ['undo', 'bold', 'italic', 'link', 'image', 'bullist', 'styleselect'];
var extract = function (rawToolbar) {
    var toolbar = rawToolbar.replace(/\|/g, ' ').trim();
    return toolbar.length > 0 ? toolbar.split(/\s+/) : [];
};
var identifyFromArray = function (toolbar) {
    return katamari_1.Arr.bind(toolbar, function (item) {
        return katamari_1.Type.isArray(item) ? identifyFromArray(item) : extract(item);
    });
};
var identify = function (settings) {
    var toolbar = settings.toolbar !== undefined ? settings.toolbar : defaults;
    return katamari_1.Type.isArray(toolbar) ? identifyFromArray(toolbar) : extract(toolbar);
};
var setup = function (realm, editor) {
    var commandSketch = function (name) {
        return function () {
            return Buttons_1.default.forToolbarCommand(editor, name);
        };
    };
    var stateCommandSketch = function (name) {
        return function () {
            return Buttons_1.default.forToolbarStateCommand(editor, name);
        };
    };
    var actionSketch = function (name, query, action) {
        return function () {
            return Buttons_1.default.forToolbarStateAction(editor, name, query, action);
        };
    };
    var undo = commandSketch('undo');
    var redo = commandSketch('redo');
    var bold = stateCommandSketch('bold');
    var italic = stateCommandSketch('italic');
    var underline = stateCommandSketch('underline');
    var removeformat = commandSketch('removeformat');
    var link = function () {
        return LinkButton.sketch(realm, editor);
    };
    var unlink = actionSketch('unlink', 'link', function () {
        editor.execCommand('unlink', null, false);
    });
    var image = function () {
        return ImagePicker.sketch(editor);
    };
    var bullist = actionSketch('unordered-list', 'ul', function () {
        editor.execCommand('InsertUnorderedList', null, false);
    });
    var numlist = actionSketch('ordered-list', 'ol', function () {
        editor.execCommand('InsertOrderedList', null, false);
    });
    var fontsizeselect = function () {
        return FontSizeSlider.sketch(realm, editor);
    };
    var forecolor = function () {
        return ColorSlider_1.default.sketch(realm, editor);
    };
    var styleFormats = StyleFormats_1.default.register(editor, editor.settings);
    var styleFormatsMenu = function () {
        return StyleFormats_1.default.ui(editor, styleFormats, function () {
            editor.fire('scrollIntoView');
        });
    };
    var styleselect = function () {
        return Buttons_1.default.forToolbar('style-formats', function (button) {
            editor.fire('toReading');
            realm.dropup().appear(styleFormatsMenu, alloy_1.Toggling.on, button);
        }, alloy_1.Behaviour.derive([
            alloy_1.Toggling.config({
                toggleClass: Styles_1.default.resolve('toolbar-button-selected'),
                toggleOnExecute: false,
                aria: {
                    mode: 'pressed'
                }
            }),
            alloy_1.Receiving.config({
                channels: boulder_1.Objects.wrapAll([
                    Receivers_1.default.receive(TinyChannels_1.default.orientationChanged(), alloy_1.Toggling.off),
                    Receivers_1.default.receive(TinyChannels_1.default.dropupDismissed(), alloy_1.Toggling.off)
                ])
            })
        ]), editor);
    };
    var feature = function (prereq, sketch) {
        return {
            isSupported: function () {
                var buttons = editor.ui.registry.getAll().buttons;
                return prereq.forall(function (p) {
                    return boulder_1.Objects.hasKey(buttons, p);
                });
            },
            sketch: sketch
        };
    };
    return {
        undo: feature(katamari_1.Option.none(), undo),
        redo: feature(katamari_1.Option.none(), redo),
        bold: feature(katamari_1.Option.none(), bold),
        italic: feature(katamari_1.Option.none(), italic),
        underline: feature(katamari_1.Option.none(), underline),
        removeformat: feature(katamari_1.Option.none(), removeformat),
        link: feature(katamari_1.Option.none(), link),
        unlink: feature(katamari_1.Option.none(), unlink),
        image: feature(katamari_1.Option.none(), image),
        bullist: feature(katamari_1.Option.some('bullist'), bullist),
        numlist: feature(katamari_1.Option.some('numlist'), numlist),
        fontsizeselect: feature(katamari_1.Option.none(), fontsizeselect),
        forecolor: feature(katamari_1.Option.none(), forecolor),
        styleselect: feature(katamari_1.Option.none(), styleselect)
    };
};
var detect = function (settings, features) {
    var itemNames = identify(settings);
    var present = {};
    return katamari_1.Arr.bind(itemNames, function (iName) {
        var r = !boulder_1.Objects.hasKey(present, iName) && boulder_1.Objects.hasKey(features, iName) && features[iName].isSupported() ? [features[iName].sketch()] : [];
        present[iName] = true;
        return r;
    });
};
exports.default = {
    identify: identify,
    setup: setup,
    detect: detect
};
