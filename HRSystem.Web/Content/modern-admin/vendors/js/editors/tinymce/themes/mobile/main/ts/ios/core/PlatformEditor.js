"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var getBodyFromFrame = function (frame) {
    return katamari_1.Option.some(sugar_1.Element.fromDom(frame.dom().contentWindow.document.body));
};
var getDocFromFrame = function (frame) {
    return katamari_1.Option.some(sugar_1.Element.fromDom(frame.dom().contentWindow.document));
};
var getWinFromFrame = function (frame) {
    return katamari_1.Option.from(frame.dom().contentWindow);
};
var getSelectionFromFrame = function (frame) {
    var optWin = getWinFromFrame(frame);
    return optWin.bind(sugar_1.WindowSelection.getExact);
};
var getFrame = function (editor) {
    return editor.getFrame();
};
var getOrDerive = function (name, f) {
    return function (editor) {
        var g = editor[name].getOrThunk(function () {
            var frame = getFrame(editor);
            return function () {
                return f(frame);
            };
        });
        return g();
    };
};
var getOrListen = function (editor, doc, name, type) {
    return editor[name].getOrThunk(function () {
        return function (handler) {
            return sugar_1.DomEvent.bind(doc, type, handler);
        };
    });
};
var toRect = function (rect) {
    return {
        left: katamari_1.Fun.constant(rect.left),
        top: katamari_1.Fun.constant(rect.top),
        right: katamari_1.Fun.constant(rect.right),
        bottom: katamari_1.Fun.constant(rect.bottom),
        width: katamari_1.Fun.constant(rect.width),
        height: katamari_1.Fun.constant(rect.height)
    };
};
var getActiveApi = function (editor) {
    var frame = getFrame(editor);
    var tryFallbackBox = function (win) {
        var isCollapsed = function (sel) {
            return sugar_1.Compare.eq(sel.start(), sel.finish()) && sel.soffset() === sel.foffset();
        };
        var toStartRect = function (sel) {
            var rect = sel.start().dom().getBoundingClientRect();
            return rect.width > 0 || rect.height > 0 ? katamari_1.Option.some(rect).map(toRect) : katamari_1.Option.none();
        };
        return sugar_1.WindowSelection.getExact(win).filter(isCollapsed).bind(toStartRect);
    };
    return getBodyFromFrame(frame).bind(function (body) {
        return getDocFromFrame(frame).bind(function (doc) {
            return getWinFromFrame(frame).map(function (win) {
                var html = sugar_1.Element.fromDom(doc.dom().documentElement);
                var getCursorBox = editor.getCursorBox.getOrThunk(function () {
                    return function () {
                        return sugar_1.WindowSelection.get(win).bind(function (sel) {
                            return sugar_1.WindowSelection.getFirstRect(win, sel).orThunk(function () {
                                return tryFallbackBox(win);
                            });
                        });
                    };
                });
                var setSelection = editor.setSelection.getOrThunk(function () {
                    return function (start, soffset, finish, foffset) {
                        sugar_1.WindowSelection.setExact(win, start, soffset, finish, foffset);
                    };
                });
                var clearSelection = editor.clearSelection.getOrThunk(function () {
                    return function () {
                        sugar_1.WindowSelection.clear(win);
                    };
                });
                return {
                    body: katamari_1.Fun.constant(body),
                    doc: katamari_1.Fun.constant(doc),
                    win: katamari_1.Fun.constant(win),
                    html: katamari_1.Fun.constant(html),
                    getSelection: katamari_1.Fun.curry(getSelectionFromFrame, frame),
                    setSelection: setSelection,
                    clearSelection: clearSelection,
                    frame: katamari_1.Fun.constant(frame),
                    onKeyup: getOrListen(editor, doc, 'onKeyup', 'keyup'),
                    onNodeChanged: getOrListen(editor, doc, 'onNodeChanged', 'SelectionChange'),
                    onDomChanged: editor.onDomChanged,
                    onScrollToCursor: editor.onScrollToCursor,
                    onScrollToElement: editor.onScrollToElement,
                    onToReading: editor.onToReading,
                    onToEditing: editor.onToEditing,
                    onToolbarScrollStart: editor.onToolbarScrollStart,
                    onTouchContent: editor.onTouchContent,
                    onTapContent: editor.onTapContent,
                    onTouchToolstrip: editor.onTouchToolstrip,
                    getCursorBox: getCursorBox
                };
            });
        });
    });
};
exports.default = {
    getBody: getOrDerive('getBody', getBodyFromFrame),
    getDoc: getOrDerive('getDoc', getDocFromFrame),
    getWin: getOrDerive('getWin', getWinFromFrame),
    getSelection: getOrDerive('getSelection', getSelectionFromFrame),
    getFrame: getFrame,
    getActiveApi: getActiveApi
};
