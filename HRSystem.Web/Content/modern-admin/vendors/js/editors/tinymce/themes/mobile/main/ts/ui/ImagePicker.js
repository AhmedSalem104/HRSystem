"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sketch = void 0;
var alloy_1 = require("@ephox/alloy");
var imagetools_1 = require("@ephox/imagetools");
var katamari_1 = require("@ephox/katamari");
var Buttons_1 = require("../ui/Buttons");
var addImage = function (editor, blob) {
    imagetools_1.BlobConversions.blobToBase64(blob).then(function (base64) {
        editor.undoManager.transact(function () {
            var cache = editor.editorUpload.blobCache;
            var info = cache.create(katamari_1.Id.generate('mceu'), blob, base64);
            cache.add(info);
            var img = editor.dom.createHTML('img', {
                src: info.blobUri()
            });
            editor.insertContent(img);
        });
    });
};
var extractBlob = function (simulatedEvent) {
    var event = simulatedEvent.event();
    var files = event.raw().target.files || event.raw().dataTransfer.files;
    return katamari_1.Option.from(files[0]);
};
var sketch = function (editor) {
    var pickerDom = {
        tag: 'input',
        attributes: { accept: 'image/*', type: 'file', title: '' },
        styles: { visibility: 'hidden', position: 'absolute' }
    };
    var memPicker = alloy_1.Memento.record({
        dom: pickerDom,
        events: alloy_1.AlloyEvents.derive([
            alloy_1.AlloyEvents.cutter(alloy_1.NativeEvents.click()),
            alloy_1.AlloyEvents.run(alloy_1.NativeEvents.change(), function (picker, simulatedEvent) {
                extractBlob(simulatedEvent).each(function (blob) {
                    addImage(editor, blob);
                });
            })
        ])
    });
    return alloy_1.Button.sketch({
        dom: Buttons_1.default.getToolbarIconButton('image', editor),
        components: [
            memPicker.asSpec()
        ],
        action: function (button) {
            var picker = memPicker.get(button);
            picker.element().dom().click();
        }
    });
};
exports.sketch = sketch;
