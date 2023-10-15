"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderDialogButton = exports.renderFooterButton = exports.renderButton = exports.renderButtonSpec = exports.renderIconButton = exports.renderIconButtonSpec = void 0;
var alloy_1 = require("@ephox/alloy");
var dom_globals_1 = require("@ephox/dom-globals");
var katamari_1 = require("@ephox/katamari");
var FormEvents_1 = require("tinymce/themes/silver/ui/general/FormEvents");
var ComposingConfigs_1 = require("../alien/ComposingConfigs");
var DisablingConfigs_1 = require("../alien/DisablingConfigs");
var RepresentingConfigs_1 = require("../alien/RepresentingConfigs");
var ButtonSlices_1 = require("../button/ButtonSlices");
var MenuButton_1 = require("../button/MenuButton");
var CommonMenuItem_1 = require("../menus/item/build/CommonMenuItem");
var ButtonClasses_1 = require("../toolbar/button/ButtonClasses");
var FieldLabeller_1 = require("../alien/FieldLabeller");
var renderCommonSpec = function (spec, actionOpt, extraBehaviours, dom, components) {
    if (extraBehaviours === void 0) { extraBehaviours = []; }
    var action = actionOpt.fold(function () {
        return {};
    }, function (action) {
        return {
            action: action
        };
    });
    var common = __assign({ buttonBehaviours: alloy_1.Behaviour.derive([
            DisablingConfigs_1.DisablingConfigs.button(spec.disabled),
            alloy_1.Tabstopping.config({}),
            alloy_1.AddEventsBehaviour.config('button press', [
                alloy_1.AlloyEvents.preventDefault('click'),
                alloy_1.AlloyEvents.preventDefault('mousedown')
            ])
        ].concat(extraBehaviours)), eventOrder: {
            click: ['button press', 'alloy.base.behaviour'],
            mousedown: ['button press', 'alloy.base.behaviour']
        } }, action);
    var domFinal = katamari_1.Merger.deepMerge(common, { dom: dom });
    return katamari_1.Merger.deepMerge(domFinal, { components: components });
};
var renderIconButtonSpec = function (spec, action, providersBackstage, extraBehaviours) {
    if (extraBehaviours === void 0) { extraBehaviours = []; }
    var tooltipAttributes = spec.tooltip.map(function (tooltip) { return ({
        'aria-label': providersBackstage.translate(tooltip),
        'title': providersBackstage.translate(tooltip)
    }); }).getOr({});
    var dom = {
        tag: 'button',
        classes: [ButtonClasses_1.ToolbarButtonClasses.Button],
        attributes: tooltipAttributes
    };
    var icon = spec.icon.map(function (iconName) { return (0, ButtonSlices_1.renderIconFromPack)(iconName, providersBackstage.icons); });
    var components = (0, CommonMenuItem_1.componentRenderPipeline)([
        icon
    ]);
    return renderCommonSpec(spec, action, extraBehaviours, dom, components);
};
exports.renderIconButtonSpec = renderIconButtonSpec;
var renderIconButton = function (spec, action, providersBackstage, extraBehaviours) {
    if (extraBehaviours === void 0) { extraBehaviours = []; }
    var iconButtonSpec = (0, exports.renderIconButtonSpec)(spec, katamari_1.Option.some(action), providersBackstage, extraBehaviours);
    return alloy_1.Button.sketch(iconButtonSpec);
};
exports.renderIconButton = renderIconButton;
var renderButtonSpec = function (spec, action, providersBackstage, extraBehaviours, extraClasses) {
    if (extraBehaviours === void 0) { extraBehaviours = []; }
    if (extraClasses === void 0) { extraClasses = []; }
    var translatedText = providersBackstage.translate(spec.text);
    var icon = spec.icon ? spec.icon.map(function (iconName) { return (0, ButtonSlices_1.renderIconFromPack)(iconName, providersBackstage.icons); }) : katamari_1.Option.none();
    var components = icon.isSome() ? (0, CommonMenuItem_1.componentRenderPipeline)([icon]) : [];
    var innerHtml = icon.isSome() ? {} : {
        innerHtml: translatedText
    };
    var classes = __spreadArray(__spreadArray(__spreadArray(__spreadArray([], !spec.primary && !spec.borderless ? ['tox-button', 'tox-button--secondary'] : ['tox-button'], true), icon.isSome() ? ['tox-button--icon'] : [], true), spec.borderless ? ['tox-button--naked'] : [], true), extraClasses, true);
    var dom = __assign(__assign({ tag: 'button', classes: classes }, innerHtml), { attributes: {
            title: translatedText
        } });
    return renderCommonSpec(spec, action, extraBehaviours, dom, components);
};
exports.renderButtonSpec = renderButtonSpec;
var renderButton = function (spec, action, providersBackstage, extraBehaviours, extraClasses) {
    if (extraBehaviours === void 0) { extraBehaviours = []; }
    if (extraClasses === void 0) { extraClasses = []; }
    var buttonSpec = (0, exports.renderButtonSpec)(spec, katamari_1.Option.some(action), providersBackstage, extraBehaviours, extraClasses);
    return alloy_1.Button.sketch(buttonSpec);
};
exports.renderButton = renderButton;
var getAction = function (name, buttonType) {
    return function (comp) {
        if (buttonType === 'custom') {
            alloy_1.AlloyTriggers.emitWith(comp, FormEvents_1.formActionEvent, {
                name: name,
                value: {}
            });
        }
        else if (buttonType === 'submit') {
            alloy_1.AlloyTriggers.emit(comp, FormEvents_1.formSubmitEvent);
        }
        else if (buttonType === 'cancel') {
            alloy_1.AlloyTriggers.emit(comp, FormEvents_1.formCancelEvent);
        }
        else {
            dom_globals_1.console.error('Unknown button type: ', buttonType);
        }
    };
};
var isMenuFooterButtonSpec = function (spec, buttonType) {
    return buttonType === 'menu';
};
var isNormalFooterButtonSpec = function (spec, buttonType) {
    return buttonType === 'custom' || buttonType === 'cancel' || buttonType === 'submit';
};
var renderFooterButton = function (spec, buttonType, backstage) {
    if (isMenuFooterButtonSpec(spec, buttonType)) {
        var getButton = function () { return memButton_1; };
        var menuButtonSpec = spec;
        var fixedSpec = __assign(__assign({}, spec), { fetch: (0, MenuButton_1.getFetch)(menuButtonSpec.items, getButton, backstage) });
        var memButton_1 = alloy_1.Memento.record((0, MenuButton_1.renderMenuButton)(fixedSpec, ButtonClasses_1.ToolbarButtonClasses.Button, backstage, katamari_1.Option.none()));
        return memButton_1.asSpec();
    }
    else if (isNormalFooterButtonSpec(spec, buttonType)) {
        var action = getAction(spec.name, buttonType);
        var buttonSpec = __assign(__assign({}, spec), { borderless: false });
        return (0, exports.renderButton)(buttonSpec, action, backstage.shared.providers, []);
    }
    else {
        dom_globals_1.console.error('Unknown footer button type: ', buttonType);
    }
};
exports.renderFooterButton = renderFooterButton;
var renderDialogButton = function (spec, providersBackstage) {
    var action = getAction(spec.name, 'custom');
    return (0, FieldLabeller_1.renderFormField)(katamari_1.Option.none(), alloy_1.FormField.parts().field(__assign({ factory: alloy_1.Button }, (0, exports.renderButtonSpec)(spec, katamari_1.Option.some(action), providersBackstage, [
        RepresentingConfigs_1.RepresentingConfigs.memory(''),
        ComposingConfigs_1.ComposingConfigs.self()
    ]))));
};
exports.renderDialogButton = renderDialogButton;
