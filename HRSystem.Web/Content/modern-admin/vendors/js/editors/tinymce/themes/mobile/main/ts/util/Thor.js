"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ephox/katamari");
var sand_1 = require("@ephox/sand");
var sugar_1 = require("@ephox/sugar");
var attr = 'data-ephox-mobile-fullscreen-style';
var siblingStyles = 'display:none!important;';
var ancestorPosition = 'position:absolute!important;';
var ancestorStyles = 'top:0!important;left:0!important;margin:0!important;padding:0!important;width:100%!important;height:100%!important;overflow:visible!important;';
var bgFallback = 'background-color:rgb(255,255,255)!important;';
var isAndroid = sand_1.PlatformDetection.detect().os.isAndroid();
var matchColor = function (editorBody) {
    var color = sugar_1.Css.get(editorBody, 'background-color');
    return (color !== undefined && color !== '') ? 'background-color:' + color + '!important' : bgFallback;
};
var clobberStyles = function (container, editorBody) {
    var gatherSibilings = function (element) {
        var siblings = sugar_1.SelectorFilter.siblings(element, '*');
        return siblings;
    };
    var clobber = function (clobberStyle) {
        return function (element) {
            var styles = sugar_1.Attr.get(element, 'style');
            var backup = styles === undefined ? 'no-styles' : styles.trim();
            if (backup === clobberStyle) {
                return;
            }
            else {
                sugar_1.Attr.set(element, attr, backup);
                sugar_1.Attr.set(element, 'style', clobberStyle);
            }
        };
    };
    var ancestors = sugar_1.SelectorFilter.ancestors(container, '*');
    var siblings = katamari_1.Arr.bind(ancestors, gatherSibilings);
    var bgColor = matchColor(editorBody);
    katamari_1.Arr.each(siblings, clobber(siblingStyles));
    katamari_1.Arr.each(ancestors, clobber(ancestorPosition + ancestorStyles + bgColor));
    var containerStyles = isAndroid === true ? '' : ancestorPosition;
    clobber(containerStyles + ancestorStyles + bgColor)(container);
};
var restoreStyles = function () {
    var clobberedEls = sugar_1.SelectorFilter.all('[' + attr + ']');
    katamari_1.Arr.each(clobberedEls, function (element) {
        var restore = sugar_1.Attr.get(element, attr);
        if (restore !== 'no-styles') {
            sugar_1.Attr.set(element, 'style', restore);
        }
        else {
            sugar_1.Attr.remove(element, 'style');
        }
        sugar_1.Attr.remove(element, attr);
    });
};
exports.default = {
    clobberStyles: clobberStyles,
    restoreStyles: restoreStyles
};
