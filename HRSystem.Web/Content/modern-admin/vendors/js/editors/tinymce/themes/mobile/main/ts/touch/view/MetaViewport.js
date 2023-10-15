"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sugar_1 = require("@ephox/sugar");
var tag = function () {
    var head = sugar_1.SelectorFind.first('head').getOrDie();
    var nu = function () {
        var meta = sugar_1.Element.fromTag('meta');
        sugar_1.Attr.set(meta, 'name', 'viewport');
        sugar_1.Insert.append(head, meta);
        return meta;
    };
    var element = sugar_1.SelectorFind.first('meta[name="viewport"]').getOrThunk(nu);
    var backup = sugar_1.Attr.get(element, 'content');
    var maximize = function () {
        sugar_1.Attr.set(element, 'content', 'width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0');
    };
    var restore = function () {
        if (backup !== undefined && backup !== null && backup.length > 0) {
            sugar_1.Attr.set(element, 'content', backup);
        }
        else {
            sugar_1.Attr.set(element, 'content', 'user-scalable=yes');
        }
    };
    return {
        maximize: maximize,
        restore: restore
    };
};
exports.default = {
    tag: tag
};
