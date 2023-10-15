"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alloy_1 = require("@ephox/alloy");
var boulder_1 = require("@ephox/boulder");
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var MobileSchema_1 = require("./MobileSchema");
var IosMode_1 = require("../ios/core/IosMode");
var TapToEditMask_1 = require("../touch/view/TapToEditMask");
var produce = function (raw) {
    var mobile = boulder_1.ValueSchema.asRawOrDie('Getting IosWebapp schema', MobileSchema_1.default, raw);
    sugar_1.Css.set(mobile.toolstrip, 'width', '100%');
    sugar_1.Css.set(mobile.container, 'position', 'relative');
    var onView = function () {
        mobile.setReadOnly(mobile.readOnlyOnInit());
        mode.enter();
    };
    var mask = alloy_1.GuiFactory.build(TapToEditMask_1.default.sketch(onView, mobile.translate));
    mobile.alloy.add(mask);
    var maskApi = {
        show: function () {
            mobile.alloy.add(mask);
        },
        hide: function () {
            mobile.alloy.remove(mask);
        }
    };
    var mode = IosMode_1.default.create(mobile, maskApi);
    return {
        setReadOnly: mobile.setReadOnly,
        refreshStructure: mode.refreshStructure,
        enter: mode.enter,
        exit: mode.exit,
        destroy: katamari_1.Fun.noop
    };
};
exports.default = {
    produce: produce
};
