"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Events_1 = require("../../api/Events");
var fireSkinLoaded = function (editor) {
    var done = function () {
        editor._skinLoaded = true;
        Events_1.default.fireSkinLoaded(editor);
    };
    return function () {
        if (editor.initialized) {
            done();
        }
        else {
            editor.on('init', done);
        }
    };
};
exports.default = {
    fireSkinLoaded: fireSkinLoaded
};
