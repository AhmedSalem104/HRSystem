"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var TappingEvent_1 = require("../../util/TappingEvent");
var initEvents = function (editorApi, iosApi, toolstrip, socket, dropup) {
    var saveSelectionFirst = function () {
        iosApi.run(function (api) {
            api.highlightSelection();
        });
    };
    var refreshIosSelection = function () {
        iosApi.run(function (api) {
            api.refreshSelection();
        });
    };
    var scrollToY = function (yTop, height) {
        var y = yTop - socket.dom().scrollTop;
        iosApi.run(function (api) {
            api.scrollIntoView(y, y + height);
        });
    };
    var scrollToElement = function (target) {
        scrollToY(iosApi, socket);
    };
    var scrollToCursor = function () {
        editorApi.getCursorBox().each(function (box) {
            scrollToY(box.top(), box.height());
        });
    };
    var clearSelection = function () {
        iosApi.run(function (api) {
            api.clearSelection();
        });
    };
    var clearAndRefresh = function () {
        clearSelection();
        refreshThrottle.throttle();
    };
    var refreshView = function () {
        scrollToCursor();
        iosApi.run(function (api) {
            api.syncHeight();
        });
    };
    var reposition = function () {
        var toolbarHeight = sugar_1.Height.get(toolstrip);
        iosApi.run(function (api) {
            api.setViewportOffset(toolbarHeight);
        });
        refreshIosSelection();
        refreshView();
    };
    var toEditing = function () {
        iosApi.run(function (api) {
            api.toEditing();
        });
    };
    var toReading = function () {
        iosApi.run(function (api) {
            api.toReading();
        });
    };
    var onToolbarTouch = function (event) {
        iosApi.run(function (api) {
            api.onToolbarTouch(event);
        });
    };
    var tapping = TappingEvent_1.default.monitor(editorApi);
    var refreshThrottle = katamari_1.Throttler.last(refreshView, 300);
    var listeners = [
        editorApi.onKeyup(clearAndRefresh),
        editorApi.onNodeChanged(refreshIosSelection),
        editorApi.onDomChanged(refreshThrottle.throttle),
        editorApi.onDomChanged(refreshIosSelection),
        editorApi.onScrollToCursor(function (tinyEvent) {
            tinyEvent.preventDefault();
            refreshThrottle.throttle();
        }),
        editorApi.onScrollToElement(function (event) {
            scrollToElement(event.element());
        }),
        editorApi.onToEditing(toEditing),
        editorApi.onToReading(toReading),
        sugar_1.DomEvent.bind(editorApi.doc(), 'touchend', function (touchEvent) {
            if (sugar_1.Compare.eq(editorApi.html(), touchEvent.target()) || sugar_1.Compare.eq(editorApi.body(), touchEvent.target())) {
            }
        }),
        sugar_1.DomEvent.bind(toolstrip, 'transitionend', function (transitionEvent) {
            if (transitionEvent.raw().propertyName === 'height') {
                reposition();
            }
        }),
        sugar_1.DomEvent.capture(toolstrip, 'touchstart', function (touchEvent) {
            saveSelectionFirst();
            onToolbarTouch(touchEvent);
            editorApi.onTouchToolstrip();
        }),
        sugar_1.DomEvent.bind(editorApi.body(), 'touchstart', function (evt) {
            clearSelection();
            editorApi.onTouchContent();
            tapping.fireTouchstart(evt);
        }),
        tapping.onTouchmove(),
        tapping.onTouchend(),
        sugar_1.DomEvent.bind(editorApi.body(), 'click', function (event) {
            event.kill();
        }),
        sugar_1.DomEvent.bind(toolstrip, 'touchmove', function () {
            editorApi.onToolbarScrollStart();
        })
    ];
    var destroy = function () {
        katamari_1.Arr.each(listeners, function (l) {
            l.unbind();
        });
    };
    return {
        destroy: destroy
    };
};
exports.default = {
    initEvents: initEvents
};
