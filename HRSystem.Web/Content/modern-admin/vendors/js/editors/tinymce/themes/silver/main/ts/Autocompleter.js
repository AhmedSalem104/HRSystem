"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autocompleter = void 0;
var alloy_1 = require("@ephox/alloy");
var dom_globals_1 = require("@ephox/dom-globals");
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var AutocompleteContext_1 = require("./autocomplete/AutocompleteContext");
var AutocompleteEditorEvents_1 = require("./autocomplete/AutocompleteEditorEvents");
var AutocompleteLookup_1 = require("./autocomplete/AutocompleteLookup");
var AutocompleteTag = require("./autocomplete/AutocompleteTag");
var Autocompleters = require("./autocomplete/Autocompleters");
var SingleMenu_1 = require("./ui/menus/menu/SingleMenu");
var MenuUtils_1 = require("./ui/menus/menu/MenuUtils");
var ItemResponse_1 = require("./ui/menus/item/ItemResponse");
var register = function (editor, sharedBackstage) {
    var activeAutocompleter = (0, katamari_1.Cell)(katamari_1.Option.none());
    var autocompleter = alloy_1.GuiFactory.build(alloy_1.InlineView.sketch({
        dom: {
            tag: 'div',
            classes: ['tox-autocompleter']
        },
        components: [],
        fireDismissalEventInstead: {},
        inlineBehaviours: alloy_1.Behaviour.derive([
            alloy_1.AddEventsBehaviour.config('dismissAutocompleter', [
                alloy_1.AlloyEvents.run(alloy_1.SystemEvents.dismissRequested(), function () { return cancelIfNecessary(); })
            ])
        ]),
        lazySink: sharedBackstage.getSink
    }));
    var isMenuOpen = function () { return alloy_1.InlineView.isOpen(autocompleter); };
    var isActive = function () { return activeAutocompleter.get().isSome(); };
    var hideIfNecessary = function () {
        if (isActive()) {
            alloy_1.InlineView.hide(autocompleter);
        }
    };
    var cancelIfNecessary = function () {
        if (isActive()) {
            var lastElement = activeAutocompleter.get().map(function (ac) { return ac.element; });
            AutocompleteTag.detect(lastElement.getOr(sugar_1.Element.fromDom(editor.selection.getNode()))).each(sugar_1.Remove.unwrap);
            hideIfNecessary();
            activeAutocompleter.set(katamari_1.Option.none());
        }
    };
    var getAutocompleters = katamari_1.Thunk.cached(function () {
        return Autocompleters.register(editor);
    });
    var getCombinedItems = function (triggerChar, matches) {
        var columns = katamari_1.Options.findMap(matches, function (m) { return katamari_1.Option.from(m.columns); }).getOr(1);
        return katamari_1.Arr.bind(matches, function (match) {
            var choices = match.items;
            return (0, SingleMenu_1.createAutocompleteItems)(choices, match.matchText, function (itemValue, itemMeta) {
                var nr = editor.selection.getRng();
                (0, AutocompleteContext_1.getContext)(editor.dom, nr, triggerChar).fold(function () { return dom_globals_1.console.error('Lost context. Cursor probably moved'); }, function (_a) {
                    var range = _a.range;
                    var autocompleterApi = {
                        hide: cancelIfNecessary,
                        reload: function (fetchOptions) {
                            hideIfNecessary();
                            load(fetchOptions);
                        }
                    };
                    match.onAction(autocompleterApi, range, itemValue, itemMeta);
                });
            }, columns, ItemResponse_1.default.BUBBLE_TO_SANDBOX, sharedBackstage);
        });
    };
    var commenceIfNecessary = function (context) {
        if (!isActive()) {
            var wrapper = AutocompleteTag.create(editor, context.range);
            activeAutocompleter.set(katamari_1.Option.some({
                triggerChar: context.triggerChar,
                element: wrapper,
                matchLength: context.text.length
            }));
        }
    };
    var display = function (ac, context, lookupData, items) {
        ac.matchLength = context.text.length;
        var columns = katamari_1.Options.findMap(lookupData, function (ld) { return katamari_1.Option.from(ld.columns); }).getOr(1);
        alloy_1.InlineView.showAt(autocompleter, {
            anchor: 'node',
            root: sugar_1.Element.fromDom(editor.getBody()),
            node: katamari_1.Option.from(ac.element)
        }, alloy_1.Menu.sketch((0, SingleMenu_1.createMenuFrom)((0, MenuUtils_1.createPartialMenuWithAlloyItems)('autocompleter-value', true, items, columns, 'normal'), columns, SingleMenu_1.FocusMode.ContentFocus, 'normal')));
        alloy_1.InlineView.getContent(autocompleter).each(alloy_1.Highlighting.highlightFirst);
    };
    var doLookup = function (fetchOptions) {
        return activeAutocompleter.get().map(function (ac) {
            return (0, AutocompleteContext_1.getContext)(editor.dom, editor.selection.getRng(), ac.triggerChar).bind(function (newContext) { return (0, AutocompleteLookup_1.lookupWithContext)(editor, getAutocompleters, newContext, fetchOptions); });
        }).getOrThunk(function () { return (0, AutocompleteLookup_1.lookup)(editor, getAutocompleters); });
    };
    var load = function (fetchOptions) {
        doLookup(fetchOptions).fold(cancelIfNecessary, function (lookupInfo) {
            commenceIfNecessary(lookupInfo.context);
            lookupInfo.lookupData.then(function (lookupData) {
                activeAutocompleter.get().map(function (ac) {
                    var context = lookupInfo.context;
                    if (ac.triggerChar === context.triggerChar) {
                        var combinedItems = getCombinedItems(context.triggerChar, lookupData);
                        if (combinedItems.length > 0) {
                            display(ac, context, lookupData, combinedItems);
                        }
                        else if (context.text.length - ac.matchLength >= 10) {
                            cancelIfNecessary();
                        }
                        else {
                            hideIfNecessary();
                        }
                    }
                });
            });
        });
    };
    var onKeypress = katamari_1.Throttler.last(function (e) {
        if (e.which === 27) {
            return;
        }
        load();
    }, 50);
    var autocompleterUiApi = {
        onKeypress: onKeypress,
        cancelIfNecessary: cancelIfNecessary,
        isMenuOpen: isMenuOpen,
        isActive: isActive,
        getView: function () { return alloy_1.InlineView.getContent(autocompleter); },
    };
    AutocompleteEditorEvents_1.AutocompleterEditorEvents.setup(autocompleterUiApi, editor);
};
exports.Autocompleter = {
    register: register
};
