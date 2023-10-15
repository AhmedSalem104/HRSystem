"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setToolbar = void 0;
var katamari_1 = require("@ephox/katamari");
var Integration_1 = require("../ui/toolbar/Integration");
var OuterContainer_1 = require("../ui/general/OuterContainer");
var setToolbar = function (editor, uiComponents, rawUiConfig, backstage) {
    var comp = uiComponents.outerContainer;
    var toolbarConfig = rawUiConfig.toolbar;
    var toolbarButtonsConfig = rawUiConfig.buttons;
    if (katamari_1.Type.isArrayOf(toolbarConfig, katamari_1.Type.isString)) {
        var toolbars = toolbarConfig.map(function (t) {
            var config = { toolbar: t, buttons: toolbarButtonsConfig };
            return (0, Integration_1.identifyButtons)(editor, config, { backstage: backstage }, katamari_1.Option.none());
        });
        OuterContainer_1.default.setToolbars(comp, toolbars);
    }
    else {
        OuterContainer_1.default.setToolbar(comp, (0, Integration_1.identifyButtons)(editor, rawUiConfig, { backstage: backstage }, katamari_1.Option.none()));
    }
};
exports.setToolbar = setToolbar;
