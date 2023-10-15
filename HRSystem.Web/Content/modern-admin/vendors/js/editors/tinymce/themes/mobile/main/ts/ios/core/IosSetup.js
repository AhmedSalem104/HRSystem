"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var Orientation_1 = require("../../touch/view/Orientation");
var CaptureBin_1 = require("../../util/CaptureBin");
var Rectangles_1 = require("../../util/Rectangles");
var FakeSelection_1 = require("../focus/FakeSelection");
var IosScrolling_1 = require("../scroll/IosScrolling");
var BackgroundActivity_1 = require("../smooth/BackgroundActivity");
var Greenzone_1 = require("../view/Greenzone");
var IosUpdates_1 = require("../view/IosUpdates");
var IosViewport_1 = require("../view/IosViewport");
var VIEW_MARGIN = 5;
var register = function (toolstrip, socket, container, outerWindow, structure, cWin) {
    var scroller = (0, BackgroundActivity_1.default)(function (y) {
        return IosScrolling_1.default.moveWindowScroll(toolstrip, socket, y);
    });
    var scrollBounds = function () {
        var rects = Rectangles_1.default.getRectangles(cWin);
        return katamari_1.Option.from(rects[0]).bind(function (rect) {
            var viewTop = rect.top() - socket.dom().scrollTop;
            var outside = viewTop > outerWindow.innerHeight + VIEW_MARGIN || viewTop < -VIEW_MARGIN;
            return outside ? katamari_1.Option.some({
                top: katamari_1.Fun.constant(viewTop),
                bottom: katamari_1.Fun.constant(viewTop + rect.height())
            }) : katamari_1.Option.none();
        });
    };
    var scrollThrottle = katamari_1.Throttler.last(function () {
        scroller.idle(function () {
            IosUpdates_1.default.updatePositions(container, outerWindow.pageYOffset).get(function () {
                var extraScroll = scrollBounds();
                extraScroll.each(function (extra) {
                    socket.dom().scrollTop = socket.dom().scrollTop + extra.top();
                });
                scroller.start(0);
                structure.refresh();
            });
        });
    }, 1000);
    var onScroll = sugar_1.DomEvent.bind(sugar_1.Element.fromDom(outerWindow), 'scroll', function () {
        if (outerWindow.pageYOffset < 0) {
            return;
        }
        scrollThrottle.throttle();
    });
    IosUpdates_1.default.updatePositions(container, outerWindow.pageYOffset).get(katamari_1.Fun.identity);
    return {
        unbind: onScroll.unbind
    };
};
var setup = function (bag) {
    var cWin = bag.cWin();
    var ceBody = bag.ceBody();
    var socket = bag.socket();
    var toolstrip = bag.toolstrip();
    var toolbar = bag.toolbar();
    var contentElement = bag.contentElement();
    var keyboardType = bag.keyboardType();
    var outerWindow = bag.outerWindow();
    var dropup = bag.dropup();
    var structure = IosViewport_1.default.takeover(socket, ceBody, toolstrip, dropup);
    var keyboardModel = keyboardType(bag.outerBody(), cWin, sugar_1.Body.body(), contentElement, toolstrip, toolbar);
    var toEditing = function () {
        keyboardModel.toEditing();
        clearSelection();
    };
    var toReading = function () {
        keyboardModel.toReading();
    };
    var onToolbarTouch = function (event) {
        keyboardModel.onToolbarTouch(event);
    };
    var onOrientation = Orientation_1.default.onChange(outerWindow, {
        onChange: katamari_1.Fun.noop,
        onReady: structure.refresh
    });
    onOrientation.onAdjustment(function () {
        structure.refresh();
    });
    var onResize = sugar_1.DomEvent.bind(sugar_1.Element.fromDom(outerWindow), 'resize', function () {
        if (structure.isExpanding()) {
            structure.refresh();
        }
    });
    var onScroll = register(toolstrip, socket, bag.outerBody(), outerWindow, structure, cWin);
    var unfocusedSelection = (0, FakeSelection_1.default)(cWin, contentElement);
    var refreshSelection = function () {
        if (unfocusedSelection.isActive()) {
            unfocusedSelection.update();
        }
    };
    var highlightSelection = function () {
        unfocusedSelection.update();
    };
    var clearSelection = function () {
        unfocusedSelection.clear();
    };
    var scrollIntoView = function (top, bottom) {
        Greenzone_1.default.scrollIntoView(cWin, socket, dropup, top, bottom);
    };
    var syncHeight = function () {
        sugar_1.Css.set(contentElement, 'height', contentElement.dom().contentWindow.document.body.scrollHeight + 'px');
    };
    var setViewportOffset = function (newYOffset) {
        structure.setViewportOffset(newYOffset);
        IosScrolling_1.default.moveOnlyTop(socket, newYOffset).get(katamari_1.Fun.identity);
    };
    var destroy = function () {
        structure.restore();
        onOrientation.destroy();
        onScroll.unbind();
        onResize.unbind();
        keyboardModel.destroy();
        unfocusedSelection.destroy();
        CaptureBin_1.default.input(sugar_1.Body.body(), sugar_1.Focus.blur);
    };
    return {
        toEditing: toEditing,
        toReading: toReading,
        onToolbarTouch: onToolbarTouch,
        refreshSelection: refreshSelection,
        clearSelection: clearSelection,
        highlightSelection: highlightSelection,
        scrollIntoView: scrollIntoView,
        updateToolbarPadding: katamari_1.Fun.noop,
        setViewportOffset: setViewportOffset,
        syncHeight: syncHeight,
        refreshStructure: structure.refresh,
        destroy: destroy
    };
};
exports.default = {
    setup: setup
};
