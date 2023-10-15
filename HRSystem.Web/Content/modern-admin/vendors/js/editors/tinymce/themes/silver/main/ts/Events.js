"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alloy_1 = require("@ephox/alloy");
var dom_globals_1 = require("@ephox/dom-globals");
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var setup = function (editor, mothership, uiMothership) {
    var onMousedown = sugar_1.DomEvent.bind(sugar_1.Element.fromDom(dom_globals_1.document), 'mousedown', function (evt) {
        katamari_1.Arr.each([mothership, uiMothership], function (ship) {
            ship.broadcastOn([alloy_1.Channels.dismissPopups()], {
                target: evt.target()
            });
        });
    });
    var onTouchstart = sugar_1.DomEvent.bind(sugar_1.Element.fromDom(dom_globals_1.document), 'touchstart', function (evt) {
        katamari_1.Arr.each([mothership, uiMothership], function (ship) {
            ship.broadcastOn([alloy_1.Channels.dismissPopups()], {
                target: evt.target()
            });
        });
    });
    var onMouseup = sugar_1.DomEvent.bind(sugar_1.Element.fromDom(dom_globals_1.document), 'mouseup', function (evt) {
        if (evt.raw().button === 0) {
            katamari_1.Arr.each([mothership, uiMothership], function (ship) {
                ship.broadcastOn([alloy_1.Channels.mouseReleased()], {
                    target: evt.target()
                });
            });
        }
    });
    var onContentMousedown = function (raw) {
        katamari_1.Arr.each([mothership, uiMothership], function (ship) {
            ship.broadcastOn([alloy_1.Channels.dismissPopups()], {
                target: sugar_1.Element.fromDom(raw.target)
            });
        });
    };
    editor.on('mousedown', onContentMousedown);
    editor.on('touchstart', onContentMousedown);
    var onContentMouseup = function (raw) {
        if (raw.button === 0) {
            katamari_1.Arr.each([mothership, uiMothership], function (ship) {
                ship.broadcastOn([alloy_1.Channels.mouseReleased()], {
                    target: sugar_1.Element.fromDom(raw.target)
                });
            });
        }
    };
    editor.on('mouseup', onContentMouseup);
    var onWindowScroll = function (evt) {
        katamari_1.Arr.each([mothership, uiMothership], function (ship) {
            ship.broadcastEvent(alloy_1.SystemEvents.windowScroll(), evt);
        });
    };
    editor.on('ScrollWindow', onWindowScroll);
    var onWindowResize = function (evt) {
        katamari_1.Arr.each([mothership, uiMothership], function (ship) {
            ship.broadcastEvent(alloy_1.SystemEvents.windowResize(), evt);
        });
    };
    editor.on('ResizeWindow', onWindowResize);
    editor.on('remove', function () {
        editor.off('mousedown', onContentMousedown);
        editor.off('touchstart', onContentMousedown);
        editor.off('mouseup', onContentMouseup);
        editor.off('ResizeWindow', onWindowResize);
        editor.off('ScrollWindow', onWindowScroll);
        onMousedown.unbind();
        onTouchstart.unbind();
        onMouseup.unbind();
    });
    editor.on('detach', function () {
        alloy_1.Attachment.detachSystem(mothership);
        alloy_1.Attachment.detachSystem(uiMothership);
        mothership.destroy();
        uiMothership.destroy();
    });
};
exports.default = { setup: setup };
