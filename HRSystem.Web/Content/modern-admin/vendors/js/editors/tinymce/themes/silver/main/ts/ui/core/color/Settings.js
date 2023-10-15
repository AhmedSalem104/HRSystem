"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ColorCache_1 = require("./ColorCache");
var katamari_1 = require("@ephox/katamari");
var dom_globals_1 = require("@ephox/dom-globals");
var choiceItem = 'choiceitem';
var defaultColors = [
    { type: choiceItem, text: 'Light Green', value: '#BFEDD2' },
    { type: choiceItem, text: 'Light Yellow', value: '#FBEEB8' },
    { type: choiceItem, text: 'Light Red', value: '#F8CAC6' },
    { type: choiceItem, text: 'Light Purple', value: '#ECCAFA' },
    { type: choiceItem, text: 'Light Blue', value: '#C2E0F4' },
    { type: choiceItem, text: 'Green', value: '#2DC26B' },
    { type: choiceItem, text: 'Yellow', value: '#F1C40F' },
    { type: choiceItem, text: 'Red', value: '#E03E2D' },
    { type: choiceItem, text: 'Purple', value: '#B96AD9' },
    { type: choiceItem, text: 'Blue', value: '#3598DB' },
    { type: choiceItem, text: 'Dark Turquoise', value: '#169179' },
    { type: choiceItem, text: 'Orange', value: '#E67E23' },
    { type: choiceItem, text: 'Dark Red', value: '#BA372A' },
    { type: choiceItem, text: 'Dark Purple', value: '#843FA1' },
    { type: choiceItem, text: 'Dark Blue', value: '#236FA1' },
    { type: choiceItem, text: 'Light Gray', value: '#ECF0F1' },
    { type: choiceItem, text: 'Medium Gray', value: '#CED4D9' },
    { type: choiceItem, text: 'Gray', value: '#95A5A6' },
    { type: choiceItem, text: 'Dark Gray', value: '#7E8C8D' },
    { type: choiceItem, text: 'Navy Blue', value: '#34495E' },
    { type: choiceItem, text: 'Black', value: '#000000' },
    { type: choiceItem, text: 'White', value: '#ffffff' }
];
var colorCache = (0, ColorCache_1.default)(10);
var mapColors = function (colorMap) {
    var colors = [];
    var canvas = dom_globals_1.document.createElement('canvas');
    canvas.height = 1;
    canvas.width = 1;
    var ctx = canvas.getContext('2d');
    var byteAsHex = function (colorByte, alphaByte) {
        var bg = 255;
        var alpha = (alphaByte / 255);
        var colorByteWithWhiteBg = Math.round((colorByte * alpha) + (bg * (1 - alpha)));
        return ('0' + colorByteWithWhiteBg.toString(16)).slice(-2).toUpperCase();
    };
    var asHexColor = function (color) {
        if (/^[0-9A-Fa-f]{6}$/.test(color)) {
            return '#' + color.toUpperCase();
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 1, 1);
        var rgba = ctx.getImageData(0, 0, 1, 1).data;
        var r = rgba[0], g = rgba[1], b = rgba[2], a = rgba[3];
        return '#' + byteAsHex(r, a) + byteAsHex(g, a) + byteAsHex(b, a);
    };
    for (var i = 0; i < colorMap.length; i += 2) {
        colors.push({
            text: colorMap[i + 1],
            value: asHexColor(colorMap[i]),
            type: 'choiceitem'
        });
    }
    return colors;
};
var getColorCols = function (editor, defaultCols) {
    return editor.getParam('color_cols', defaultCols, 'number');
};
var hasCustomColors = function (editor) {
    return editor.getParam('custom_colors') !== false;
};
var getColorMap = function (editor) {
    return editor.getParam('color_map');
};
var getColors = function (editor) {
    var unmapped = getColorMap(editor);
    return unmapped !== undefined ? mapColors(unmapped) : defaultColors;
};
var getCurrentColors = function () {
    return katamari_1.Arr.map(colorCache.state(), function (color) {
        return {
            type: choiceItem,
            text: color,
            value: color
        };
    });
};
var addColor = function (color) {
    colorCache.add(color);
};
exports.default = {
    mapColors: mapColors,
    getColorCols: getColorCols,
    hasCustomColors: hasCustomColors,
    getColorMap: getColorMap,
    getColors: getColors,
    getCurrentColors: getCurrentColors,
    addColor: addColor
};
