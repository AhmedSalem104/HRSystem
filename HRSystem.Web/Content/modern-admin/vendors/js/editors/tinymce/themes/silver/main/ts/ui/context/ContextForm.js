"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextForm = void 0;
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var CommonToolbar_1 = require("../toolbar/CommonToolbar");
var ContextFormButtons_1 = require("./ContextFormButtons");
var renderContextForm = function (ctx, backstage) {
    var inputAttributes = ctx.label.fold(function () { return ({}); }, function (label) { return ({ 'aria-label': label }); });
    var memInput = alloy_1.Memento.record(alloy_1.Input.sketch({
        inputClasses: ['tox-toolbar-textfield', 'tox-toolbar-nav-js'],
        data: ctx.initValue(),
        inputAttributes: inputAttributes,
        selectOnFocus: true,
        inputBehaviours: alloy_1.Behaviour.derive([
            alloy_1.Keying.config({
                mode: 'special',
                onEnter: function (input) {
                    return commands.findPrimary(input).map(function (primary) {
                        alloy_1.AlloyTriggers.emitExecute(primary);
                        return true;
                    });
                },
                onLeft: function (comp, se) {
                    se.cut();
                    return katamari_1.Option.none();
                },
                onRight: function (comp, se) {
                    se.cut();
                    return katamari_1.Option.none();
                }
            })
        ])
    }));
    var commands = (0, ContextFormButtons_1.generate)(memInput, ctx.commands, backstage.shared.providers);
    return (0, CommonToolbar_1.renderToolbar)({
        uid: katamari_1.Id.generate('context-toolbar'),
        initGroups: [
            {
                title: katamari_1.Option.none(),
                items: [memInput.asSpec()]
            },
            {
                title: katamari_1.Option.none(),
                items: commands.asSpecs()
            }
        ],
        onEscape: katamari_1.Option.none,
        cyclicKeying: true,
        backstage: backstage,
        getSink: function () { return katamari_1.Result.error(''); }
    });
};
exports.ContextForm = {
    renderContextForm: renderContextForm
};
