"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var boulder_1 = require("@ephox/boulder");
var EditorManager_1 = require("tinymce/core/api/EditorManager");
var derive = function (editor) {
    var base = boulder_1.Objects.readOptFrom(editor.settings, 'skin_url').fold(function () {
        return EditorManager_1.default.baseURL + '/skins/ui/oxide';
    }, function (url) {
        return url;
    });
    return {
        content: base + '/content.mobile.min.css',
        ui: base + '/skin.mobile.min.css'
    };
};
exports.default = {
    derive: derive
};
