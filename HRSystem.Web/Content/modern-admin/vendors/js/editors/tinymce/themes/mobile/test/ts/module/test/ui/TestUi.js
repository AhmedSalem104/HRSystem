"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agar_1 = require("@ephox/agar");
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var cGetFocused = agar_1.Chain.binder(function () {
    return sugar_1.Focus.active().fold(function () {
        return katamari_1.Result.error('Could not find focused element');
    }, katamari_1.Result.value);
});
var cGetParent = agar_1.Chain.binder(function (elem) {
    return sugar_1.Traverse.parent(elem).fold(function () {
        return katamari_1.Result.error('Could not find parent of ' + alloy_1.AlloyLogger.element(elem));
    }, katamari_1.Result.value);
});
var sSetFieldValue = function (value) {
    return agar_1.Chain.asStep({}, [
        cGetFocused,
        agar_1.UiControls.cSetValue(value)
    ]);
};
var sSetFieldOptValue = function (optVal) {
    return optVal.fold(function () {
        return agar_1.Step.pass;
    }, sSetFieldValue);
};
var sStartEditor = function (alloy) {
    return agar_1.Step.sync(function () {
        var button = agar_1.UiFinder.findIn(alloy.element(), '[role="button"]').getOrDie();
        var x = alloy.getByDom(button).getOrDie();
        alloy_1.AlloyTriggers.emit(x, alloy_1.NativeEvents.click());
    });
};
var sClickComponent = function (realm, memento) {
    return agar_1.Chain.asStep({}, [
        agar_1.Chain.mapper(function () {
            return memento.get(realm.socket()).element();
        }),
        agar_1.Mouse.cClick
    ]);
};
var sWaitForToggledState = function (label, state, realm, memento) {
    return agar_1.Waiter.sTryUntil(label, agar_1.Step.sync(function () {
        var component = memento.get(realm.socket());
        agar_1.Assertions.assertEq('Selected/Pressed state of component: (' + sugar_1.Attr.get(component.element(), 'class') + ')', state, alloy_1.Toggling.isOn(component));
    }), 100, 8000);
};
var sBroadcastState = function (realm, channels, command, state) {
    return agar_1.Step.sync(function () {
        realm.system().broadcastOn(channels, {
            command: command,
            state: state
        });
    });
};
exports.default = {
    cGetFocused: cGetFocused,
    cGetParent: cGetParent,
    sSetFieldValue: sSetFieldValue,
    sSetFieldOptValue: sSetFieldOptValue,
    sWaitForToggledState: sWaitForToggledState,
    sClickComponent: sClickComponent,
    sStartEditor: sStartEditor,
    sBroadcastState: sBroadcastState
};
