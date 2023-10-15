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
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderIFrame = void 0;
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var sand_1 = require("@ephox/sand");
var sugar_1 = require("@ephox/sugar");
var RepresentingConfigs_1 = require("../alien/RepresentingConfigs");
var NavigableObject_1 = require("../general/NavigableObject");
var FieldLabeller_1 = require("../alien/FieldLabeller");
var platformNeedsSandboxing = !(sand_1.PlatformDetection.detect().browser.isIE() || sand_1.PlatformDetection.detect().browser.isEdge());
var getDynamicSource = function (isSandbox) {
    var cachedValue = (0, katamari_1.Cell)('');
    return {
        getValue: function (frameComponent) {
            return cachedValue.get();
        },
        setValue: function (frameComponent, html) {
            if (!isSandbox) {
                sugar_1.Attr.set(frameComponent.element(), 'src', 'javascript:\'\'');
                var doc = frameComponent.element().dom().contentWindow.document;
                doc.open();
                doc.write(html);
                doc.close();
            }
            else {
                sugar_1.Attr.set(frameComponent.element(), 'srcdoc', html);
            }
            cachedValue.set(html);
        }
    };
};
var renderIFrame = function (spec, providersBackstage) {
    var isSandbox = platformNeedsSandboxing && spec.sandboxed;
    var attributes = __assign(__assign({}, spec.label.map(function (title) { return ({ title: title }); }).getOr({})), isSandbox ? { sandbox: 'allow-scripts allow-same-origin' } : {});
    var sourcing = getDynamicSource(isSandbox);
    var pLabel = spec.label.map(function (label) { return (0, FieldLabeller_1.renderLabel)(label, providersBackstage); });
    var factory = function (newSpec) {
        return NavigableObject_1.default.craft({
            uid: newSpec.uid,
            dom: {
                tag: 'iframe',
                attributes: attributes
            },
            behaviours: alloy_1.Behaviour.derive([
                alloy_1.Tabstopping.config({}),
                alloy_1.Focusing.config({}),
                RepresentingConfigs_1.RepresentingConfigs.withComp(katamari_1.Option.none(), sourcing.getValue, sourcing.setValue)
            ])
        });
    };
    var pField = alloy_1.FormField.parts().field({
        factory: { sketch: factory }
    });
    return (0, FieldLabeller_1.renderFormFieldWith)(pLabel, pField, ['tox-form__group--stretched'], []);
};
exports.renderIFrame = renderIFrame;
