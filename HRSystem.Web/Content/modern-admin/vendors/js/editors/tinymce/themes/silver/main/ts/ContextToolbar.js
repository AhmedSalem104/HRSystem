"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alloy_1 = require("@ephox/alloy");
var boulder_1 = require("@ephox/boulder");
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var Delay_1 = require("tinymce/core/api/util/Delay");
var ContextEditorEvents_1 = require("./ui/context/ContextEditorEvents");
var ContextForm_1 = require("./ui/context/ContextForm");
var ContextUi_1 = require("./ui/context/ContextUi");
var ToolbarBounds = require("./ui/context/ToolbarBounds");
var ToolbarLookup_1 = require("./ui/context/ToolbarLookup");
var ToolbarScopes_1 = require("./ui/context/ToolbarScopes");
var CommonToolbar_1 = require("./ui/toolbar/CommonToolbar");
var Integration_1 = require("./ui/toolbar/Integration");
var Settings = require("./api/Settings");
var register = function (editor, registryContextToolbars, sink, extras) {
    var contextbar = alloy_1.GuiFactory.build((0, ContextUi_1.renderContextToolbar)({
        sink: sink,
        onEscape: function () {
            editor.focus();
            return katamari_1.Option.some(true);
        }
    }));
    var toolbarOrMenubarEnabled = Settings.isMenubarEnabled(editor) || Settings.isToolbarEnabled(editor) || Settings.isMultipleToolbars(editor);
    var getBounds = function () {
        var scroll = sugar_1.Scroll.get();
        var contentAreaBox = alloy_1.Boxes.box(sugar_1.Element.fromDom(editor.getContentAreaContainer()));
        if (editor.inline && !toolbarOrMenubarEnabled) {
            return katamari_1.Option.some(ToolbarBounds.getDistractionFreeBounds(editor, scroll, contentAreaBox));
        }
        else if (editor.inline) {
            return katamari_1.Option.some(ToolbarBounds.getInlineBounds(editor, scroll, contentAreaBox));
        }
        else {
            return katamari_1.Option.some(ToolbarBounds.getIframeBounds(editor, scroll, contentAreaBox));
        }
    };
    var getViewportTop = function () {
        var isToolbarDocked = sugar_1.Css.get(sugar_1.Element.fromDom(editor.getContainer()), 'position') === 'fixed';
        return editor.inline && toolbarOrMenubarEnabled && isToolbarDocked ? editor.getContainer().getBoundingClientRect().bottom : 0;
    };
    var shouldContextToolbarHide = function () {
        var nodeBounds = lastElement.get().map(function (ele) { return ele.getBoundingClientRect(); }).getOr(editor.selection.getRng().getBoundingClientRect());
        var viewportHeight = sugar_1.Traverse.defaultView(sugar_1.Element.fromDom(editor.getBody())).dom().innerHeight;
        var aboveViewport = nodeBounds.bottom < getViewportTop();
        var belowViewport = nodeBounds.top > viewportHeight;
        return aboveViewport || belowViewport;
    };
    var hideOrRepositionIfNecessary = function () {
        lastAnchor.get().each(function (anchor) {
            var contextBarEle = contextbar.element();
            sugar_1.Css.remove(contextBarEle, 'display');
            if (shouldContextToolbarHide()) {
                sugar_1.Css.set(contextBarEle, 'display', 'none');
            }
            else {
                alloy_1.Positioning.positionWithinBounds(sink, anchor, contextbar, getBounds());
            }
        });
    };
    editor.on('init', function () {
        editor.on('ScrollWindow', hideOrRepositionIfNecessary);
        if (!editor.inline) {
            var scroller = sugar_1.Traverse.defaultView(sugar_1.Element.fromDom(editor.getBody()));
            var onScroll_1 = sugar_1.DomEvent.bind(scroller, 'scroll', hideOrRepositionIfNecessary);
            editor.on('remove', function () {
                onScroll_1.unbind();
            });
        }
    });
    var lastAnchor = (0, katamari_1.Cell)(katamari_1.Option.none());
    var lastElement = (0, katamari_1.Cell)(katamari_1.Option.none());
    var timer = (0, katamari_1.Cell)(null);
    var wrapInPopDialog = function (toolbarSpec) {
        return {
            dom: {
                tag: 'div',
                classes: ['tox-pop__dialog'],
            },
            components: [toolbarSpec],
            behaviours: alloy_1.Behaviour.derive([
                alloy_1.Keying.config({
                    mode: 'acyclic'
                }),
                alloy_1.AddEventsBehaviour.config('pop-dialog-wrap-events', [
                    alloy_1.AlloyEvents.runOnAttached(function (comp) {
                        editor.shortcuts.add('ctrl+F9', 'focus statusbar', function () { return alloy_1.Keying.focusIn(comp); });
                    }),
                    alloy_1.AlloyEvents.runOnDetached(function (comp) {
                        editor.shortcuts.remove('ctrl+F9');
                    })
                ])
            ])
        };
    };
    var getScopes = katamari_1.Thunk.cached(function () {
        return ToolbarScopes_1.default.categorise(registryContextToolbars, function (toolbarApi) {
            var alloySpec = buildToolbar(toolbarApi);
            alloy_1.AlloyTriggers.emitWith(contextbar, ContextUi_1.forwardSlideEvent, {
                forwardContents: wrapInPopDialog(alloySpec)
            });
        });
    });
    var buildToolbar = function (ctx) {
        var buttons = editor.ui.registry.getAll().buttons;
        var scopes = getScopes();
        return ctx.type === 'contexttoolbar' ? (function () {
            var allButtons = katamari_1.Merger.merge(buttons, scopes.formNavigators);
            var initGroups = (0, Integration_1.identifyButtons)(editor, { buttons: allButtons, toolbar: ctx.items }, extras, katamari_1.Option.some(['form:']));
            return (0, CommonToolbar_1.renderToolbar)({
                uid: katamari_1.Id.generate('context-toolbar'),
                initGroups: initGroups,
                onEscape: katamari_1.Option.none,
                cyclicKeying: true,
                backstage: extras.backstage,
                getSink: function () { return katamari_1.Result.error(''); }
            });
        })() : (function () {
            return ContextForm_1.ContextForm.renderContextForm(ctx, extras.backstage);
        })();
    };
    editor.on(ContextEditorEvents_1.showContextToolbarEvent, function (e) {
        var scopes = getScopes();
        boulder_1.Objects.readOptFrom(scopes.lookupTable, e.toolbarKey).each(function (ctx) {
            launchContext(ctx, e.target === editor ? katamari_1.Option.none() : katamari_1.Option.some(e));
            alloy_1.InlineView.getContent(contextbar).each(alloy_1.Keying.focusIn);
        });
    });
    var bubbleSize = 12;
    var bubbleAlignments = {
        valignCentre: [],
        alignCentre: [],
        alignLeft: ['tox-pop--align-left'],
        alignRight: ['tox-pop--align-right'],
        right: ['tox-pop--right'],
        left: ['tox-pop--left'],
        bottom: ['tox-pop--bottom'],
        top: ['tox-pop--top']
    };
    var anchorOverrides = {
        maxHeightFunction: alloy_1.MaxHeight.expandable()
    };
    var lineAnchorSpec = {
        bubble: alloy_1.Bubble.nu(bubbleSize, 0, bubbleAlignments),
        layouts: {
            onLtr: function () { return [alloy_1.Layout.east]; },
            onRtl: function () { return [alloy_1.Layout.west]; }
        },
        overrides: anchorOverrides
    };
    var anchorSpec = {
        bubble: alloy_1.Bubble.nu(0, bubbleSize, bubbleAlignments),
        layouts: {
            onLtr: function () { return [alloy_1.Layout.north, alloy_1.Layout.south, alloy_1.Layout.northeast, alloy_1.Layout.southeast, alloy_1.Layout.northwest, alloy_1.Layout.southwest,
                alloy_1.LayoutInside.north, alloy_1.LayoutInside.south, alloy_1.LayoutInside.northeast, alloy_1.LayoutInside.southeast, alloy_1.LayoutInside.northwest, alloy_1.LayoutInside.southwest]; },
            onRtl: function () { return [alloy_1.Layout.north, alloy_1.Layout.south, alloy_1.Layout.northwest, alloy_1.Layout.southwest, alloy_1.Layout.northeast, alloy_1.Layout.southeast,
                alloy_1.LayoutInside.north, alloy_1.LayoutInside.south, alloy_1.LayoutInside.northwest, alloy_1.LayoutInside.southwest, alloy_1.LayoutInside.northeast, alloy_1.LayoutInside.southeast]; }
        },
        overrides: anchorOverrides
    };
    var getAnchor = function (position, element) {
        var anchorage = position === 'node' ? extras.backstage.shared.anchors.node(element) : extras.backstage.shared.anchors.cursor();
        return katamari_1.Merger.deepMerge(anchorage, position === 'line' ? lineAnchorSpec : anchorSpec);
    };
    var launchContext = function (toolbarApi, elem) {
        clearTimer();
        var toolbarSpec = buildToolbar(toolbarApi);
        var sElem = elem.map(sugar_1.Element.fromDom);
        var anchor = getAnchor(toolbarApi.position, sElem);
        lastAnchor.set(katamari_1.Option.some((anchor)));
        lastElement.set(elem);
        var contextBarEle = contextbar.element();
        sugar_1.Css.remove(contextBarEle, 'display');
        alloy_1.InlineView.showWithinBounds(contextbar, anchor, wrapInPopDialog(toolbarSpec), getBounds());
        if (shouldContextToolbarHide()) {
            sugar_1.Css.set(contextBarEle, 'display', 'none');
        }
    };
    var launchContextToolbar = function () {
        var scopes = getScopes();
        ToolbarLookup_1.default.lookup(scopes, editor).fold(function () {
            lastAnchor.set(katamari_1.Option.none());
            alloy_1.InlineView.hide(contextbar);
        }, function (info) {
            launchContext(info.toolbarApi, katamari_1.Option.some(info.elem.dom()));
        });
    };
    var clearTimer = function () {
        var current = timer.get();
        if (current !== null) {
            Delay_1.default.clearTimeout(current);
            timer.set(null);
        }
    };
    var resetTimer = function (t) {
        clearTimer();
        timer.set(t);
    };
    editor.on('init', function () {
        editor.on('click keyup SetContent ObjectResized ResizeEditor', function (e) {
            resetTimer(Delay_1.default.setEditorTimeout(editor, launchContextToolbar, 0));
        });
        editor.on('focusout', function (e) {
            Delay_1.default.setEditorTimeout(editor, function () {
                if (sugar_1.Focus.search(sink.element()).isNone() && sugar_1.Focus.search(contextbar.element()).isNone()) {
                    lastAnchor.set(katamari_1.Option.none());
                    alloy_1.InlineView.hide(contextbar);
                }
            }, 0);
        });
        editor.on('SwitchMode', function () {
            if (editor.readonly) {
                lastAnchor.set(katamari_1.Option.none());
                alloy_1.InlineView.hide(contextbar);
            }
        });
        editor.on('NodeChange', function (e) {
            sugar_1.Focus.search(contextbar.element()).fold(function () {
                resetTimer(Delay_1.default.setEditorTimeout(editor, launchContextToolbar, 0));
            }, function (_) {
            });
        });
    });
};
exports.default = {
    register: register
};
