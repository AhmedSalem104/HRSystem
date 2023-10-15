"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var boulder_1 = require("@ephox/boulder");
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
exports.default = boulder_1.ValueSchema.objOf([
    boulder_1.FieldSchema.strictObjOf('editor', [
        boulder_1.FieldSchema.strict('getFrame'),
        boulder_1.FieldSchema.option('getBody'),
        boulder_1.FieldSchema.option('getDoc'),
        boulder_1.FieldSchema.option('getWin'),
        boulder_1.FieldSchema.option('getSelection'),
        boulder_1.FieldSchema.option('setSelection'),
        boulder_1.FieldSchema.option('clearSelection'),
        boulder_1.FieldSchema.option('cursorSaver'),
        boulder_1.FieldSchema.option('onKeyup'),
        boulder_1.FieldSchema.option('onNodeChanged'),
        boulder_1.FieldSchema.option('getCursorBox'),
        boulder_1.FieldSchema.strict('onDomChanged'),
        boulder_1.FieldSchema.defaulted('onTouchContent', katamari_1.Fun.noop),
        boulder_1.FieldSchema.defaulted('onTapContent', katamari_1.Fun.noop),
        boulder_1.FieldSchema.defaulted('onTouchToolstrip', katamari_1.Fun.noop),
        boulder_1.FieldSchema.defaulted('onScrollToCursor', katamari_1.Fun.constant({ unbind: katamari_1.Fun.noop })),
        boulder_1.FieldSchema.defaulted('onScrollToElement', katamari_1.Fun.constant({ unbind: katamari_1.Fun.noop })),
        boulder_1.FieldSchema.defaulted('onToEditing', katamari_1.Fun.constant({ unbind: katamari_1.Fun.noop })),
        boulder_1.FieldSchema.defaulted('onToReading', katamari_1.Fun.constant({ unbind: katamari_1.Fun.noop })),
        boulder_1.FieldSchema.defaulted('onToolbarScrollStart', katamari_1.Fun.identity)
    ]),
    boulder_1.FieldSchema.strict('socket'),
    boulder_1.FieldSchema.strict('toolstrip'),
    boulder_1.FieldSchema.strict('dropup'),
    boulder_1.FieldSchema.strict('toolbar'),
    boulder_1.FieldSchema.strict('container'),
    boulder_1.FieldSchema.strict('alloy'),
    boulder_1.FieldSchema.state('win', function (spec) {
        return sugar_1.Traverse.owner(spec.socket).dom().defaultView;
    }),
    boulder_1.FieldSchema.state('body', function (spec) {
        return sugar_1.Element.fromDom(spec.socket.dom().ownerDocument.body);
    }),
    boulder_1.FieldSchema.defaulted('translate', katamari_1.Fun.identity),
    boulder_1.FieldSchema.defaulted('setReadOnly', katamari_1.Fun.noop),
    boulder_1.FieldSchema.defaulted('readOnlyOnInit', katamari_1.Fun.constant(true))
]);
