"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderWordCount = void 0;
var alloy_1 = require("@ephox/alloy");
var renderWordCount = function (editor, providersBackstage) {
    var _a;
    var replaceCountText = function (comp, count, mode) { return alloy_1.Replacing.set(comp, [alloy_1.GuiFactory.text(providersBackstage.translate(['{0} ' + mode, count[mode]]))]); };
    return alloy_1.Button.sketch({
        dom: {
            tag: 'button',
            classes: ['tox-statusbar__wordcount']
        },
        components: [],
        buttonBehaviours: alloy_1.Behaviour.derive([
            alloy_1.Tabstopping.config({}),
            alloy_1.Replacing.config({}),
            alloy_1.Representing.config({
                store: {
                    mode: 'memory',
                    initialValue: {
                        mode: "words",
                        count: { words: 0, characters: 0 }
                    }
                }
            }),
            alloy_1.AddEventsBehaviour.config('wordcount-events', [
                alloy_1.AlloyEvents.run(alloy_1.SystemEvents.tapOrClick(), function (comp) {
                    var currentVal = alloy_1.Representing.getValue(comp);
                    var newMode = currentVal.mode === "words" ? "characters" : "words";
                    alloy_1.Representing.setValue(comp, { mode: newMode, count: currentVal.count });
                    replaceCountText(comp, currentVal.count, newMode);
                }),
                alloy_1.AlloyEvents.runOnAttached(function (comp) {
                    editor.on('wordCountUpdate', function (e) {
                        var mode = alloy_1.Representing.getValue(comp).mode;
                        alloy_1.Representing.setValue(comp, { mode: mode, count: e.wordCount });
                        replaceCountText(comp, e.wordCount, mode);
                    });
                })
            ])
        ]),
        eventOrder: (_a = {},
            _a[alloy_1.SystemEvents.tapOrClick()] = ['wordcount-events', 'alloy.base.behaviour'],
            _a)
    });
};
exports.renderWordCount = renderWordCount;
