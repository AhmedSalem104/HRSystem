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
exports.renderLabel = exports.renderReplacableIconFromPack = exports.renderIconFromPack = void 0;
var alloy_1 = require("@ephox/alloy");
var Icons_1 = require("../icons/Icons");
var ButtonClasses_1 = require("../toolbar/button/ButtonClasses");
var renderIcon = function (iconHtml, behaviours) {
    return (__assign({ dom: {
            tag: 'span',
            innerHtml: iconHtml,
            classes: [ButtonClasses_1.ToolbarButtonClasses.Icon, ButtonClasses_1.ToolbarButtonClasses.IconWrap]
        } }, behaviours));
};
var renderIconFromPack = function (iconName, iconsProvider) {
    return renderIcon((0, Icons_1.get)(iconName, iconsProvider), {});
};
exports.renderIconFromPack = renderIconFromPack;
var renderReplacableIconFromPack = function (iconName, iconsProvider) {
    return renderIcon((0, Icons_1.get)(iconName, iconsProvider), {
        behaviours: alloy_1.Behaviour.derive([
            alloy_1.Replacing.config({})
        ])
    });
};
exports.renderReplacableIconFromPack = renderReplacableIconFromPack;
var renderLabel = function (text, prefix, providersBackstage) { return ({
    dom: {
        tag: 'span',
        innerHtml: providersBackstage.translate(text),
        classes: ["".concat(prefix, "__select-label")]
    },
    behaviours: alloy_1.Behaviour.derive([
        alloy_1.Replacing.config({})
    ])
}); };
exports.renderLabel = renderLabel;
