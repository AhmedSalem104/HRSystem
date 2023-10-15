"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuItemEventOrder = exports.onMenuItemExecute = void 0;
var alloy_1 = require("@ephox/alloy");
var Controls_1 = require("../../controls/Controls");
var ItemResponse_1 = require("./ItemResponse");
var onMenuItemExecute = function (info, itemResponse) {
    return alloy_1.AlloyEvents.runOnExecute(function (comp, simulatedEvent) {
        (0, Controls_1.runWithApi)(info, comp)(info.onAction);
        if (!info.triggersSubmenu && itemResponse === ItemResponse_1.default.CLOSE_ON_EXECUTE) {
            alloy_1.AlloyTriggers.emit(comp, alloy_1.SystemEvents.sandboxClose());
            simulatedEvent.stop();
        }
    });
};
exports.onMenuItemExecute = onMenuItemExecute;
var menuItemEventOrder = {
    'alloy.execute': ['disabling', 'alloy.base.behaviour', 'toggling', 'item-events']
};
exports.menuItemEventOrder = menuItemEventOrder;
