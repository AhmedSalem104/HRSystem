"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AlignmentButtons_1 = require("./AlignmentButtons");
var SimpleControls_1 = require("./SimpleControls");
var UndoRedo_1 = require("./UndoRedo");
var VisualAid_1 = require("./VisualAid");
var ColorSwatch_1 = require("./color/ColorSwatch");
var IndentOutdent_1 = require("./IndentOutdent");
var ComplexControls_1 = require("./ComplexControls");
var setup = function (editor, backstage) {
    AlignmentButtons_1.default.register(editor);
    SimpleControls_1.default.register(editor);
    ComplexControls_1.default.register(editor, backstage);
    UndoRedo_1.default.register(editor);
    ColorSwatch_1.default.register(editor);
    VisualAid_1.default.register(editor);
    IndentOutdent_1.default.register(editor);
};
exports.default = {
    setup: setup
};
