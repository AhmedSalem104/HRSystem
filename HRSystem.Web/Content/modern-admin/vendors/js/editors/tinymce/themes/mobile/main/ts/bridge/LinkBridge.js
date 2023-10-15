"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var isNotEmpty = function (val) {
    return val.length > 0;
};
var defaultToEmpty = function (str) {
    return str === undefined || str === null ? '' : str;
};
var noLink = function (editor) {
    var text = editor.selection.getContent({ format: 'text' });
    return {
        url: '',
        text: text,
        title: '',
        target: '',
        link: katamari_1.Option.none()
    };
};
var fromLink = function (link) {
    var text = sugar_1.TextContent.get(link);
    var url = sugar_1.Attr.get(link, 'href');
    var title = sugar_1.Attr.get(link, 'title');
    var target = sugar_1.Attr.get(link, 'target');
    return {
        url: defaultToEmpty(url),
        text: text !== url ? defaultToEmpty(text) : '',
        title: defaultToEmpty(title),
        target: defaultToEmpty(target),
        link: katamari_1.Option.some(link)
    };
};
var getInfo = function (editor) {
    return query(editor).fold(function () {
        return noLink(editor);
    }, function (link) {
        return fromLink(link);
    });
};
var wasSimple = function (link) {
    var prevHref = sugar_1.Attr.get(link, 'href');
    var prevText = sugar_1.TextContent.get(link);
    return prevHref === prevText;
};
var getTextToApply = function (link, url, info) {
    return info.text.toOption().filter(isNotEmpty).fold(function () {
        return wasSimple(link) ? katamari_1.Option.some(url) : katamari_1.Option.none();
    }, katamari_1.Option.some);
};
var unlinkIfRequired = function (editor, info) {
    var activeLink = info.link.bind(katamari_1.Fun.identity);
    activeLink.each(function (link) {
        editor.execCommand('unlink');
    });
};
var getAttrs = function (url, info) {
    var attrs = {};
    attrs.href = url;
    info.title.toOption().filter(isNotEmpty).each(function (title) {
        attrs.title = title;
    });
    info.target.toOption().filter(isNotEmpty).each(function (target) {
        attrs.target = target;
    });
    return attrs;
};
var applyInfo = function (editor, info) {
    info.url.toOption().filter(isNotEmpty).fold(function () {
        unlinkIfRequired(editor, info);
    }, function (url) {
        var attrs = getAttrs(url, info);
        var activeLink = info.link.bind(katamari_1.Fun.identity);
        activeLink.fold(function () {
            var text = info.text.toOption().filter(isNotEmpty).getOr(url);
            editor.insertContent(editor.dom.createHTML('a', attrs, editor.dom.encode(text)));
        }, function (link) {
            var text = getTextToApply(link, url, info);
            sugar_1.Attr.setAll(link, attrs);
            text.each(function (newText) {
                sugar_1.TextContent.set(link, newText);
            });
        });
    });
};
var query = function (editor) {
    var start = sugar_1.Element.fromDom(editor.selection.getStart());
    return sugar_1.SelectorFind.closest(start, 'a');
};
exports.default = {
    getInfo: getInfo,
    applyInfo: applyInfo,
    query: query
};
