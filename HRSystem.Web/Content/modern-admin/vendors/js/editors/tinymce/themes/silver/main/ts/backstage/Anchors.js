"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var Settings_1 = require("../api/Settings");
var bubbleAlignments = {
    valignCentre: [],
    alignCentre: [],
    alignLeft: [],
    alignRight: [],
    right: [],
    left: [],
    bottom: [],
    top: []
};
var getToolbarAnchor = function (bodyElement, lazyAnchorbar, useFixedToolbarContainer) {
    var fixedToolbarAnchor = function () { return ({
        anchor: 'node',
        root: bodyElement(),
        node: katamari_1.Option.from(bodyElement()),
        bubble: alloy_1.Bubble.nu(-12, -12, bubbleAlignments),
        layouts: {
            onRtl: function () { return [alloy_1.LayoutInside.northeast]; },
            onLtr: function () { return [alloy_1.LayoutInside.northwest]; }
        }
    }); };
    var standardAnchor = function () { return ({
        anchor: 'hotspot',
        hotspot: lazyAnchorbar(),
        bubble: alloy_1.Bubble.nu(-12, 12, bubbleAlignments),
        layouts: {
            onRtl: function () { return [alloy_1.Layout.southeast]; },
            onLtr: function () { return [alloy_1.Layout.southwest]; }
        }
    }); };
    return useFixedToolbarContainer ? fixedToolbarAnchor : standardAnchor;
};
var getBannerAnchor = function (bodyElement, lazyAnchorbar, useFixedToolbarContainer) {
    var fixedToolbarAnchor = function () { return ({
        anchor: 'node',
        root: bodyElement(),
        node: katamari_1.Option.from(bodyElement()),
        layouts: {
            onRtl: function () { return [alloy_1.LayoutInside.north]; },
            onLtr: function () { return [alloy_1.LayoutInside.north]; }
        }
    }); };
    var standardAnchor = function () { return ({
        anchor: 'hotspot',
        hotspot: lazyAnchorbar(),
        layouts: {
            onRtl: function () { return [alloy_1.Layout.south]; },
            onLtr: function () { return [alloy_1.Layout.south]; }
        }
    }); };
    return useFixedToolbarContainer ? fixedToolbarAnchor : standardAnchor;
};
var getToolbarOverflowAnchor = function (lazyMoreButton) { return function () {
    return {
        anchor: 'hotspot',
        hotspot: lazyMoreButton(),
        layouts: {
            onRtl: function () { return [alloy_1.Layout.southeast]; },
            onLtr: function () { return [alloy_1.Layout.southwest]; }
        }
    };
}; };
var getCursorAnchor = function (editor, bodyElement) { return function () {
    return {
        anchor: 'selection',
        root: bodyElement(),
        getSelection: function () {
            var rng = editor.selection.getRng();
            return katamari_1.Option.some(sugar_1.Selection.range(sugar_1.Element.fromDom(rng.startContainer), rng.startOffset, sugar_1.Element.fromDom(rng.endContainer), rng.endOffset));
        }
    };
}; };
var getNodeAnchor = function (bodyElement) { return function (element) {
    return {
        anchor: 'node',
        root: bodyElement(),
        node: element
    };
}; };
var getAnchors = function (editor, lazyAnchorbar, lazyMoreButton) {
    var useFixedToolbarContainer = (0, Settings_1.useFixedContainer)(editor);
    var bodyElement = function () { return sugar_1.Element.fromDom(editor.getBody()); };
    return {
        toolbar: getToolbarAnchor(bodyElement, lazyAnchorbar, useFixedToolbarContainer),
        toolbarOverflow: getToolbarOverflowAnchor(lazyMoreButton),
        banner: getBannerAnchor(bodyElement, lazyAnchorbar, useFixedToolbarContainer),
        cursor: getCursorAnchor(editor, bodyElement),
        node: getNodeAnchor(bodyElement)
    };
};
exports.default = {
    getAnchors: getAnchors
};
