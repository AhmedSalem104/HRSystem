"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FontSelect_1 = require("./complex/FontSelect");
var StyleSelect_1 = require("./complex/StyleSelect");
var FormatSelect_1 = require("./complex/FormatSelect");
var FontsizeSelect_1 = require("./complex/FontsizeSelect");
var AlignSelect_1 = require("./complex/AlignSelect");
var register = function (editor, backstage) {
    (0, AlignSelect_1.alignSelectMenu)(editor, backstage);
    (0, FontSelect_1.fontSelectMenu)(editor, backstage);
    (0, StyleSelect_1.styleSelectMenu)(editor, backstage);
    (0, FormatSelect_1.formatSelectMenu)(editor, backstage);
    (0, FontsizeSelect_1.fontsizeSelectMenu)(editor, backstage);
};
exports.default = { register: register };
