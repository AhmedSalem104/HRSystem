"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fireSkinLoaded = function (editor) {
    var done = function () {
        editor._skinLoaded = true;
        editor.fire('SkinLoaded');
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
