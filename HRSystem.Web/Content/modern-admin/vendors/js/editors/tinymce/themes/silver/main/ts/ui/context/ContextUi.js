"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backSlideEvent = exports.forwardSlideEvent = exports.renderContextToolbar = void 0;
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var Delay_1 = require("tinymce/core/api/util/Delay");
var forwardSlideEvent = katamari_1.Id.generate('forward-slide');
exports.forwardSlideEvent = forwardSlideEvent;
var backSlideEvent = katamari_1.Id.generate('backward-slide');
exports.backSlideEvent = backSlideEvent;
var changeSlideEvent = katamari_1.Id.generate('change-slide-event');
var resizingClass = 'tox-pop--resizing';
var renderContextToolbar = function (spec) {
    var stack = (0, katamari_1.Cell)([]);
    return alloy_1.InlineView.sketch({
        dom: {
            tag: 'div',
            classes: ['tox-pop']
        },
        fireDismissalEventInstead: {
            event: 'doNotDismissYet'
        },
        onShow: function (comp) {
            stack.set([]);
            alloy_1.InlineView.getContent(comp).each(function (c) {
                sugar_1.Css.remove(c.element(), 'visibility');
            });
            sugar_1.Class.remove(comp.element(), resizingClass);
            sugar_1.Css.remove(comp.element(), 'width');
        },
        inlineBehaviours: alloy_1.Behaviour.derive([
            alloy_1.AddEventsBehaviour.config('context-toolbar-events', [
                alloy_1.AlloyEvents.runOnSource(alloy_1.NativeEvents.transitionend(), function (comp, se) {
                    alloy_1.InlineView.getContent(comp).each(function (c) {
                    });
                    sugar_1.Class.remove(comp.element(), resizingClass);
                    sugar_1.Css.remove(comp.element(), 'width');
                }),
                alloy_1.AlloyEvents.run(changeSlideEvent, function (comp, se) {
                    sugar_1.Css.remove(comp.element(), 'width');
                    var currentWidth = sugar_1.Width.get(comp.element());
                    alloy_1.InlineView.setContent(comp, se.event().contents());
                    sugar_1.Class.add(comp.element(), resizingClass);
                    var newWidth = sugar_1.Width.get(comp.element());
                    sugar_1.Css.set(comp.element(), 'width', currentWidth + 'px');
                    alloy_1.InlineView.getContent(comp).each(function (newContents) {
                        se.event().focus().bind(function (f) {
                            sugar_1.Focus.focus(f);
                            return sugar_1.Focus.search(comp.element());
                        }).orThunk(function () {
                            alloy_1.Keying.focusIn(newContents);
                            return sugar_1.Focus.active();
                        });
                    });
                    Delay_1.default.setTimeout(function () {
                        sugar_1.Css.set(comp.element(), 'width', newWidth + 'px');
                    }, 0);
                }),
                alloy_1.AlloyEvents.run(forwardSlideEvent, function (comp, se) {
                    alloy_1.InlineView.getContent(comp).each(function (oldContents) {
                        stack.set(stack.get().concat([
                            {
                                bar: oldContents,
                                focus: sugar_1.Focus.active()
                            }
                        ]));
                    });
                    alloy_1.AlloyTriggers.emitWith(comp, changeSlideEvent, {
                        contents: se.event().forwardContents(),
                        focus: katamari_1.Option.none()
                    });
                }),
                alloy_1.AlloyEvents.run(backSlideEvent, function (comp, se) {
                    katamari_1.Arr.last(stack.get()).each(function (last) {
                        stack.set(stack.get().slice(0, stack.get().length - 1));
                        alloy_1.AlloyTriggers.emitWith(comp, changeSlideEvent, {
                            contents: alloy_1.GuiFactory.premade(last.bar),
                            focus: last.focus
                        });
                    });
                }),
            ]),
            alloy_1.Keying.config({
                mode: 'special',
                onEscape: function (comp) {
                    return katamari_1.Arr.last(stack.get()).fold(function () {
                        return spec.onEscape();
                    }, function (_) {
                        alloy_1.AlloyTriggers.emit(comp, backSlideEvent);
                        return katamari_1.Option.some(true);
                    });
                }
            })
        ]),
        lazySink: function () { return katamari_1.Result.value(spec.sink); }
    });
};
exports.renderContextToolbar = renderContextToolbar;
