"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDemo = void 0;
var alloy_1 = require("@ephox/alloy");
var dom_globals_1 = require("@ephox/dom-globals");
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var I18n_1 = require("tinymce/core/api/util/I18n");
var setupDemo = function () {
    var oldSink = dom_globals_1.document.querySelectorAll('.mce-silver-sink');
    if (oldSink.length > 0) {
        throw Error('old sinks found, a previous demo did not call helpers.destroy() leaving artifacts, found: ' + oldSink.length);
    }
    var sink = alloy_1.GuiFactory.build({
        dom: alloy_1.DomFactory.fromHtml('<div class="mce-silver-sink"></div>'),
        behaviours: alloy_1.Behaviour.derive([
            alloy_1.Positioning.config({
                useFixed: true
            })
        ])
    });
    var uiMothership = alloy_1.Gui.create();
    sugar_1.Class.add(uiMothership.element(), 'tox');
    var fakeHistory = function (fileType) {
        if (fileType === 'image') {
            return ['https://i.stack.imgur.com/8JoS3.png'];
        }
        else if (fileType === 'media') {
            return [];
        }
        else if (fileType === 'file') {
            return ['https://www.tiny.cloud/'];
        }
        return [];
    };
    var fakeLinkInfo = {
        targets: [
            { type: 'anchor', title: 'Google', url: 'http://www.google.com.au', level: 0, attach: katamari_1.Fun.noop },
            { type: 'header', title: 'Header', url: '#header', level: 1, attach: function () {
                    dom_globals_1.console.log('This is where the ID would be attached to the header so it can be linked');
                } }
        ],
        anchorTop: '#top',
        anchorBottom: '#bottom'
    };
    var fakeValidator = function (info, callback) {
        if (info.url === 'test-valid' || /^https?:\/\/www\.google\.com\/google\.jpg$/.test(info.url)) {
            callback({ message: 'Yep, that\'s valid...', status: 'valid' });
        }
        else if (info.url === 'test-unknown' || /\.(?:jpg|png|gif)$/.test(info.url)) {
            callback({ message: 'Hmm, I don\'t know...', status: 'unknown' });
        }
        else if (info.url === 'test-invalid') {
            callback({ message: 'No, no, definitly not, just don\'t, STOP...', status: 'invalid' });
        }
        else {
            callback({ message: '', status: 'none' });
        }
    };
    var choiceItem = 'choiceitem';
    var fakecolorinputBackstage = {
        colorPicker: katamari_1.Fun.noop,
        hasCustomColors: katamari_1.Fun.constant(false),
        getColors: function () { return [
            { type: choiceItem, text: 'Turquoise', value: '#18BC9B' },
            { type: choiceItem, text: 'Green', value: '#2FCC71' },
            { type: choiceItem, text: 'Blue', value: '#3598DB' },
            { type: choiceItem, text: 'Purple', value: '#9B59B6' },
            { type: choiceItem, text: 'Navy Blue', value: '#34495E' },
            { type: choiceItem, text: 'Dark Turquoise', value: '#18A085' },
            { type: choiceItem, text: 'Dark Green', value: '#27AE60' },
            { type: choiceItem, text: 'Medium Blue', value: '#2880B9' },
            { type: choiceItem, text: 'Medium Purple', value: '#8E44AD' },
            { type: choiceItem, text: 'Midnight Blue', value: '#2B3E50' },
            { type: choiceItem, text: 'Yellow', value: '#F1C40F' },
            { type: choiceItem, text: 'Orange', value: '#E67E23' },
            { type: choiceItem, text: 'Red', value: '#E74C3C' },
            { type: choiceItem, text: 'Light Gray', value: '#ECF0F1' },
            { type: choiceItem, text: 'Gray', value: '#95A5A6' },
            { type: choiceItem, text: 'Dark Yellow', value: '#F29D12' },
            { type: choiceItem, text: 'Dark Orange', value: '#D35400' },
            { type: choiceItem, text: 'Dark Red', value: '#E74C3C' },
            { type: choiceItem, text: 'Medium Gray', value: '#BDC3C7' },
            { type: choiceItem, text: 'Dark Gray', value: '#7E8C8D' },
            { type: choiceItem, text: 'Black', value: '#000000' },
            { type: choiceItem, text: 'White', value: '#ffffff' }
        ]; },
        getColorCols: katamari_1.Fun.constant(5)
    };
    var backstage = {
        shared: {
            providers: {
                icons: function () { return ({}); },
                menuItems: function () { return ({}); },
                translate: I18n_1.default.translate
            },
            interpreter: function (x) { return x; },
            getSink: function () { return katamari_1.Result.value(sink); },
            anchors: {
                toolbar: function () {
                    return {
                        anchor: 'hotspot',
                        hotspot: sink
                    };
                },
                toolbarOverflow: function () {
                    return {
                        anchor: 'hotspot',
                        hotspot: sink
                    };
                },
                banner: function () {
                    return {
                        anchor: 'hotspot',
                        hotspot: sink
                    };
                },
                cursor: function () {
                    return {
                        anchor: 'hotspot',
                        hotspot: sink
                    };
                },
                node: function (elem) {
                    return {
                        anchor: 'hotspot',
                        hotspot: sink
                    };
                }
            }
        },
        colorinput: fakecolorinputBackstage,
        urlinput: {
            getHistory: fakeHistory,
            addToHistory: function (url, fileType) { },
            getLinkInformation: function () { return katamari_1.Option.some(fakeLinkInfo); },
            getValidationHandler: function () { return katamari_1.Option.some(fakeValidator); },
            getUrlPicker: function (filetype) { return katamari_1.Option.some(function (entry) {
                var newUrl = katamari_1.Option.from(dom_globals_1.window.prompt('File browser would show instead of this...', entry.value));
                return katamari_1.Future.pure(__assign(__assign({}, entry), { value: newUrl.getOr(entry.value) }));
            }); }
        },
    };
    var mockEditor = {
        setContent: function (content) { },
        insertContent: function (content, args) { },
        execCommand: function (cmd, ui, value) { }
    };
    var extras = {
        editor: mockEditor,
        backstage: backstage
    };
    uiMothership.add(sink);
    alloy_1.Attachment.attachSystem(sugar_1.Body.body(), uiMothership);
    var destroy = function () {
        uiMothership.remove(sink);
        uiMothership.destroy();
    };
    alloy_1.Debugging.registerInspector(katamari_1.Id.generate('mothership'), uiMothership);
    dom_globals_1.document.addEventListener('mouseup', function () {
        uiMothership.broadcastOn([alloy_1.Channels.mouseReleased()], {});
    });
    return {
        uiMothership: uiMothership,
        sink: sink,
        extras: extras,
        destroy: destroy
    };
};
exports.setupDemo = setupDemo;
