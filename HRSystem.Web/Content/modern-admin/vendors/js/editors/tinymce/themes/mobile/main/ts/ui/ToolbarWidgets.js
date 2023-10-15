"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.button = void 0;
var Buttons_1 = require("./Buttons");
var button = function (realm, clazz, makeItems, editor) {
    return Buttons_1.default.forToolbar(clazz, function () {
        var items = makeItems();
        realm.setContextToolbar([
            {
                label: clazz + ' group',
                items: items
            }
        ]);
    }, {}, editor);
};
exports.button = button;
