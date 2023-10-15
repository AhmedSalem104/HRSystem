"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReadonlyReceivingForOverflow = exports.setupReadonlyModeSwitch = exports.toggleToReadOnly = exports.setDisabledAll = exports.ReadOnlyDataSchema = exports.ReadOnlyChannel = void 0;
var alloy_1 = require("@ephox/alloy");
var boulder_1 = require("@ephox/boulder");
var sugar_1 = require("@ephox/sugar");
var Settings = require("./api/Settings");
exports.ReadOnlyChannel = 'silver.readonly';
exports.ReadOnlyDataSchema = boulder_1.ValueSchema.objOf([
    boulder_1.FieldSchema.strictBoolean('readonly')
]);
var setDisabledAll = function (element, state) {
    sugar_1.Selectors.all('*', element.element()).forEach(function (elm) {
        element.getSystem().getByDom(elm).each(function (comp) {
            if (comp.hasConfigured(alloy_1.Disabling)) {
                alloy_1.Disabling.set(comp, state);
            }
        });
    });
};
exports.setDisabledAll = setDisabledAll;
var broadcastReadonly = function (uiComponents, readonly) {
    var outerContainer = uiComponents.outerContainer;
    var target = outerContainer.element();
    if (readonly) {
        uiComponents.mothership.broadcastOn([alloy_1.Channels.dismissPopups()], { target: target });
        uiComponents.uiMothership.broadcastOn([alloy_1.Channels.dismissPopups()], { target: target });
    }
    uiComponents.mothership.broadcastOn([exports.ReadOnlyChannel], { readonly: readonly });
    uiComponents.uiMothership.broadcastOn([exports.ReadOnlyChannel], { readonly: readonly });
};
var toggleToReadOnly = function (uiComponents, readonly) {
    var outerContainer = uiComponents.outerContainer;
    broadcastReadonly(uiComponents, readonly);
    sugar_1.Selectors.all('*', outerContainer.element()).forEach(function (elm) {
        outerContainer.getSystem().getByDom(elm).each(function (comp) {
            if (comp.hasConfigured(alloy_1.Disabling)) {
                alloy_1.Disabling.set(comp, readonly);
            }
        });
    });
};
exports.toggleToReadOnly = toggleToReadOnly;
var setupReadonlyModeSwitch = function (editor, uiComponents) {
    editor.on('init', function () {
        if (editor.readonly) {
            (0, exports.toggleToReadOnly)(uiComponents, true);
        }
    });
    editor.on('SwitchMode', function () { return (0, exports.toggleToReadOnly)(uiComponents, editor.readonly); });
    if (Settings.isReadOnly(editor)) {
        editor.setMode('readonly');
    }
};
exports.setupReadonlyModeSwitch = setupReadonlyModeSwitch;
var createReadonlyReceivingForOverflow = function (getOverflow) {
    var _a;
    return alloy_1.Receiving.config({
        channels: (_a = {},
            _a[exports.ReadOnlyChannel] = {
                schema: exports.ReadOnlyDataSchema,
                onReceive: function (comp, data) {
                    getOverflow(comp).each(function (toolbar) {
                        (0, exports.setDisabledAll)(toolbar, data.readonly);
                    });
                }
            },
            _a)
    });
};
exports.createReadonlyReceivingForOverflow = createReadonlyReceivingForOverflow;
