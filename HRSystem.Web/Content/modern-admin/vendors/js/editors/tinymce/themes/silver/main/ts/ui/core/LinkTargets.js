"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkTargets = void 0;
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var Tools_1 = require("tinymce/core/api/util/Tools");
var trim = Tools_1.default.trim;
var hasContentEditableState = function (value) {
    return function (node) {
        if (node && node.nodeType === 1) {
            if (node.contentEditable === value) {
                return true;
            }
            if (node.getAttribute('data-mce-contenteditable') === value) {
                return true;
            }
        }
        return false;
    };
};
var isContentEditableTrue = hasContentEditableState('true');
var isContentEditableFalse = hasContentEditableState('false');
var create = function (type, title, url, level, attach) {
    return {
        type: type,
        title: title,
        url: url,
        level: level,
        attach: attach
    };
};
var isChildOfContentEditableTrue = function (node) {
    while ((node = node.parentNode)) {
        var value = node.contentEditable;
        if (value && value !== 'inherit') {
            return isContentEditableTrue(node);
        }
    }
    return false;
};
var select = function (selector, root) {
    return katamari_1.Arr.map(sugar_1.SelectorFilter.descendants(sugar_1.Element.fromDom(root), selector), function (element) {
        return element.dom();
    });
};
var getElementText = function (elm) {
    return elm.innerText || elm.textContent;
};
var getOrGenerateId = function (elm) {
    return elm.id ? elm.id : katamari_1.Id.generate('h');
};
var isAnchor = function (elm) {
    return elm && elm.nodeName === 'A' && (elm.id || elm.name) !== undefined;
};
var isValidAnchor = function (elm) {
    return isAnchor(elm) && isEditable(elm);
};
var isHeader = function (elm) {
    return elm && /^(H[1-6])$/.test(elm.nodeName);
};
var isEditable = function (elm) {
    return isChildOfContentEditableTrue(elm) && !isContentEditableFalse(elm);
};
var isValidHeader = function (elm) {
    return isHeader(elm) && isEditable(elm);
};
var getLevel = function (elm) {
    return isHeader(elm) ? parseInt(elm.nodeName.substr(1), 10) : 0;
};
var headerTarget = function (elm) {
    var headerId = getOrGenerateId(elm);
    var attach = function () {
        elm.id = headerId;
    };
    return create('header', getElementText(elm), '#' + headerId, getLevel(elm), attach);
};
var anchorTarget = function (elm) {
    var anchorId = elm.id || elm.name;
    var anchorText = getElementText(elm);
    return create('anchor', anchorText ? anchorText : '#' + anchorId, '#' + anchorId, 0, katamari_1.Fun.noop);
};
var getHeaderTargets = function (elms) {
    return katamari_1.Arr.map(katamari_1.Arr.filter(elms, isValidHeader), headerTarget);
};
var getAnchorTargets = function (elms) {
    return katamari_1.Arr.map(katamari_1.Arr.filter(elms, isValidAnchor), anchorTarget);
};
var getTargetElements = function (elm) {
    var elms = select('h1,h2,h3,h4,h5,h6,a:not([href])', elm);
    return elms;
};
var hasTitle = function (target) {
    return trim(target.title).length > 0;
};
var find = function (elm) {
    var elms = getTargetElements(elm);
    return katamari_1.Arr.filter(getHeaderTargets(elms).concat(getAnchorTargets(elms)), hasTitle);
};
exports.LinkTargets = {
    find: find
};
