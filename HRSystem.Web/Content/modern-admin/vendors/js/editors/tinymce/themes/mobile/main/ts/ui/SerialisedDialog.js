"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sketch = void 0;
var alloy_1 = require("@ephox/alloy");
var boulder_1 = require("@ephox/boulder");
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var Receivers_1 = require("../channels/Receivers");
var SwipingModel_1 = require("../model/SwipingModel");
var Styles_1 = require("../style/Styles");
var UiDomFactory = require("../util/UiDomFactory");
var sketch = function (rawSpec) {
    var navigateEvent = 'navigateEvent';
    var wrapperAdhocEvents = 'serializer-wrapper-events';
    var formAdhocEvents = 'form-events';
    var schema = boulder_1.ValueSchema.objOf([
        boulder_1.FieldSchema.strict('fields'),
        boulder_1.FieldSchema.defaulted('maxFieldIndex', rawSpec.fields.length - 1),
        boulder_1.FieldSchema.strict('onExecute'),
        boulder_1.FieldSchema.strict('getInitialValue'),
        boulder_1.FieldSchema.state('state', function () {
            return {
                dialogSwipeState: katamari_1.Singleton.value(),
                currentScreen: (0, katamari_1.Cell)(0)
            };
        })
    ]);
    var spec = boulder_1.ValueSchema.asRawOrDie('SerialisedDialog', schema, rawSpec);
    var navigationButton = function (direction, directionName, enabled) {
        return alloy_1.Button.sketch({
            dom: UiDomFactory.dom('<span class="${prefix}-icon-' + directionName + ' ${prefix}-icon"></span>'),
            action: function (button) {
                alloy_1.AlloyTriggers.emitWith(button, navigateEvent, { direction: direction });
            },
            buttonBehaviours: alloy_1.Behaviour.derive([
                alloy_1.Disabling.config({
                    disableClass: Styles_1.default.resolve('toolbar-navigation-disabled'),
                    disabled: !enabled
                })
            ])
        });
    };
    var reposition = function (dialog, message) {
        sugar_1.SelectorFind.descendant(dialog.element(), '.' + Styles_1.default.resolve('serialised-dialog-chain')).each(function (parent) {
            sugar_1.Css.set(parent, 'left', (-spec.state.currentScreen.get() * message.width) + 'px');
        });
    };
    var navigate = function (dialog, direction) {
        var screens = sugar_1.SelectorFilter.descendants(dialog.element(), '.' + Styles_1.default.resolve('serialised-dialog-screen'));
        sugar_1.SelectorFind.descendant(dialog.element(), '.' + Styles_1.default.resolve('serialised-dialog-chain')).each(function (parent) {
            if ((spec.state.currentScreen.get() + direction) >= 0 && (spec.state.currentScreen.get() + direction) < screens.length) {
                sugar_1.Css.getRaw(parent, 'left').each(function (left) {
                    var currentLeft = parseInt(left, 10);
                    var w = sugar_1.Width.get(screens[0]);
                    sugar_1.Css.set(parent, 'left', (currentLeft - (direction * w)) + 'px');
                });
                spec.state.currentScreen.set(spec.state.currentScreen.get() + direction);
            }
        });
    };
    var focusInput = function (dialog) {
        var inputs = sugar_1.SelectorFilter.descendants(dialog.element(), 'input');
        var optInput = katamari_1.Option.from(inputs[spec.state.currentScreen.get()]);
        optInput.each(function (input) {
            dialog.getSystem().getByDom(input).each(function (inputComp) {
                alloy_1.AlloyTriggers.dispatchFocus(dialog, inputComp.element());
            });
        });
        var dotitems = memDots.get(dialog);
        alloy_1.Highlighting.highlightAt(dotitems, spec.state.currentScreen.get());
    };
    var resetState = function () {
        spec.state.currentScreen.set(0);
        spec.state.dialogSwipeState.clear();
    };
    var memForm = alloy_1.Memento.record(alloy_1.Form.sketch(function (parts) {
        return {
            dom: UiDomFactory.dom('<div class="${prefix}-serialised-dialog"></div>'),
            components: [
                alloy_1.Container.sketch({
                    dom: UiDomFactory.dom('<div class="${prefix}-serialised-dialog-chain" style="left: 0px; position: absolute;"></div>'),
                    components: katamari_1.Arr.map(spec.fields, function (field, i) {
                        return i <= spec.maxFieldIndex ? alloy_1.Container.sketch({
                            dom: UiDomFactory.dom('<div class="${prefix}-serialised-dialog-screen"></div>'),
                            components: [
                                navigationButton(-1, 'previous', (i > 0)),
                                parts.field(field.name, field.spec),
                                navigationButton(+1, 'next', (i < spec.maxFieldIndex))
                            ]
                        }) : parts.field(field.name, field.spec);
                    })
                })
            ],
            formBehaviours: alloy_1.Behaviour.derive([
                Receivers_1.default.orientation(function (dialog, message) {
                    reposition(dialog, message);
                }),
                alloy_1.Keying.config({
                    mode: 'special',
                    focusIn: function (dialog) {
                        focusInput(dialog);
                    },
                    onTab: function (dialog) {
                        navigate(dialog, +1);
                        return katamari_1.Option.some(true);
                    },
                    onShiftTab: function (dialog) {
                        navigate(dialog, -1);
                        return katamari_1.Option.some(true);
                    }
                }),
                alloy_1.AddEventsBehaviour.config(formAdhocEvents, [
                    alloy_1.AlloyEvents.runOnAttached(function (dialog, simulatedEvent) {
                        resetState();
                        var dotitems = memDots.get(dialog);
                        alloy_1.Highlighting.highlightFirst(dotitems);
                        spec.getInitialValue(dialog).each(function (v) {
                            alloy_1.Representing.setValue(dialog, v);
                        });
                    }),
                    alloy_1.AlloyEvents.runOnExecute(spec.onExecute),
                    alloy_1.AlloyEvents.run(alloy_1.NativeEvents.transitionend(), function (dialog, simulatedEvent) {
                        var event = simulatedEvent.event();
                        if (event.raw().propertyName === 'left') {
                            focusInput(dialog);
                        }
                    }),
                    alloy_1.AlloyEvents.run(navigateEvent, function (dialog, simulatedEvent) {
                        var event = simulatedEvent.event();
                        var direction = event.direction();
                        navigate(dialog, direction);
                    })
                ])
            ])
        };
    }));
    var memDots = alloy_1.Memento.record({
        dom: UiDomFactory.dom('<div class="${prefix}-dot-container"></div>'),
        behaviours: alloy_1.Behaviour.derive([
            alloy_1.Highlighting.config({
                highlightClass: Styles_1.default.resolve('dot-active'),
                itemClass: Styles_1.default.resolve('dot-item')
            })
        ]),
        components: katamari_1.Arr.bind(spec.fields, function (_f, i) {
            return i <= spec.maxFieldIndex ? [
                UiDomFactory.spec('<div class="${prefix}-dot-item ${prefix}-icon-full-dot ${prefix}-icon"></div>')
            ] : [];
        })
    });
    return {
        dom: UiDomFactory.dom('<div class="${prefix}-serializer-wrapper"></div>'),
        components: [
            memForm.asSpec(),
            memDots.asSpec()
        ],
        behaviours: alloy_1.Behaviour.derive([
            alloy_1.Keying.config({
                mode: 'special',
                focusIn: function (wrapper) {
                    var form = memForm.get(wrapper);
                    alloy_1.Keying.focusIn(form);
                }
            }),
            alloy_1.AddEventsBehaviour.config(wrapperAdhocEvents, [
                alloy_1.AlloyEvents.run(alloy_1.NativeEvents.touchstart(), function (wrapper, simulatedEvent) {
                    var event = simulatedEvent.event();
                    spec.state.dialogSwipeState.set(SwipingModel_1.default.init(event.raw().touches[0].clientX));
                }),
                alloy_1.AlloyEvents.run(alloy_1.NativeEvents.touchmove(), function (wrapper, simulatedEvent) {
                    var event = simulatedEvent.event();
                    spec.state.dialogSwipeState.on(function (state) {
                        simulatedEvent.event().prevent();
                        spec.state.dialogSwipeState.set(SwipingModel_1.default.move(state, event.raw().touches[0].clientX));
                    });
                }),
                alloy_1.AlloyEvents.run(alloy_1.NativeEvents.touchend(), function (wrapper) {
                    spec.state.dialogSwipeState.on(function (state) {
                        var dialog = memForm.get(wrapper);
                        var direction = -1 * SwipingModel_1.default.complete(state);
                        navigate(dialog, direction);
                    });
                })
            ])
        ])
    };
};
exports.sketch = sketch;
