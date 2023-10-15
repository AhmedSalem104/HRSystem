"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = exports.renderThrobber = void 0;
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var Delay_1 = require("tinymce/core/api/util/Delay");
var renderSpinner = function (providerBackstage) {
    return {
        dom: {
            tag: 'div',
            attributes: {
                'aria-label': providerBackstage.translate('Loading...')
            },
            classes: ['tox-throbber__busy-spinner']
        },
        components: [
            {
                dom: alloy_1.DomFactory.fromHtml("<div class=\"tox-spinner\"><div></div><div></div><div></div></div>")
            }
        ],
        behaviours: alloy_1.Behaviour.derive([
            alloy_1.Keying.config({
                mode: 'special',
                onTab: function () { return katamari_1.Option.some(true); },
                onShiftTab: function () { return katamari_1.Option.some(true); }
            }),
            alloy_1.Focusing.config({})
        ])
    };
};
var toggleThrobber = function (comp, state, providerBackstage) {
    var element = comp.element();
    if (state === true) {
        alloy_1.Replacing.set(comp, [renderSpinner(providerBackstage)]);
        sugar_1.Css.remove(element, 'display');
        sugar_1.Attr.remove(element, 'aria-hidden');
    }
    else {
        alloy_1.Replacing.set(comp, []);
        sugar_1.Css.set(element, 'display', 'none');
        sugar_1.Attr.set(element, 'aria-hidden', 'true');
    }
};
var renderThrobber = function (spec) {
    return {
        uid: spec.uid,
        dom: {
            tag: 'div',
            attributes: {
                'aria-hidden': 'true'
            },
            classes: ['tox-throbber'],
            styles: {
                display: 'none'
            }
        },
        behaviours: alloy_1.Behaviour.derive([
            alloy_1.Replacing.config({})
        ]),
        components: []
    };
};
exports.renderThrobber = renderThrobber;
var setup = function (editor, lazyThrobber, sharedBackstage) {
    var throbberState = (0, katamari_1.Cell)(false);
    var timer = (0, katamari_1.Cell)(katamari_1.Option.none());
    var toggle = function (state) {
        if (state !== throbberState.get()) {
            toggleThrobber(lazyThrobber(), state, sharedBackstage.providers);
            throbberState.set(state);
        }
    };
    editor.on('ProgressState', function (e) {
        timer.get().each(Delay_1.default.clearTimeout);
        if (katamari_1.Type.isNumber(e.time)) {
            var timerId = Delay_1.default.setEditorTimeout(editor, function () { return toggle(e.state); }, e.time);
            timer.set(katamari_1.Option.some(timerId));
        }
        else {
            toggle(e.state);
            timer.set(katamari_1.Option.none());
        }
    });
};
exports.setup = setup;
