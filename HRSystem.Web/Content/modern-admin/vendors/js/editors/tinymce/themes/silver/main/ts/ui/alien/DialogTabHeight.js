"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMode = void 0;
var alloy_1 = require("@ephox/alloy");
var dom_globals_1 = require("@ephox/dom-globals");
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var Delay_1 = require("tinymce/core/api/util/Delay");
var FormEvents_1 = require("../general/FormEvents");
var measureHeights = function (allTabs, tabview, tabviewComp) {
    return katamari_1.Arr.map(allTabs, function (tab, i) {
        alloy_1.Replacing.set(tabviewComp, allTabs[i].view());
        var rect = tabview.dom().getBoundingClientRect();
        alloy_1.Replacing.set(tabviewComp, []);
        return rect.height;
    });
};
var getMaxHeight = function (heights) {
    return katamari_1.Arr.head(katamari_1.Arr.sort(heights, function (a, b) {
        if (a > b) {
            return -1;
        }
        else if (a < b) {
            return +1;
        }
        else {
            return 0;
        }
    }));
};
var getMaxTabviewHeight = function (dialog, dialogBody) {
    var rootElm = sugar_1.SelectorFind.ancestor(dialog, '.tox-dialog-wrap').getOr(dialog);
    var isFixed = sugar_1.Css.get(rootElm, 'position') === 'fixed';
    var maxHeight;
    if (isFixed) {
        maxHeight = Math.max(dom_globals_1.document.documentElement.clientHeight, dom_globals_1.window.innerHeight);
    }
    else {
        maxHeight = Math.max(dom_globals_1.document.documentElement.offsetHeight, dom_globals_1.document.documentElement.scrollHeight);
    }
    var dialogChrome = dialog.dom().getBoundingClientRect().height - dialogBody.dom().getBoundingClientRect().height;
    return maxHeight - dialogChrome;
};
var showTab = function (allTabs, comp) {
    katamari_1.Arr.head(allTabs).each(function (tab) { return alloy_1.TabSection.showTab(comp, tab.value); });
};
var updateTabviewHeight = function (dialogBody, tabview, maxTabHeight) {
    sugar_1.SelectorFind.ancestor(dialogBody, '[role="dialog"]').each(function (dialog) {
        maxTabHeight.get().map(function (height) {
            sugar_1.Css.set(tabview, 'height', '0');
            return Math.min(height, getMaxTabviewHeight(dialog, dialogBody));
        }).each(function (height) {
            sugar_1.Css.set(tabview, 'height', height + 'px');
        });
    });
};
var setMode = function (allTabs) {
    var smartTabHeight = (function () {
        var maxTabHeight = (0, katamari_1.Cell)(katamari_1.Option.none());
        var extraEvents = [
            alloy_1.AlloyEvents.runOnAttached(function (comp) {
                sugar_1.SelectorFind.descendant(comp.element(), '[role="tabpanel"]').each(function (tabview) {
                    sugar_1.Css.set(tabview, 'visibility', 'hidden');
                    comp.getSystem().getByDom(tabview).toOption().each(function (tabviewComp) {
                        var heights = measureHeights(allTabs, tabview, tabviewComp);
                        var maxTabHeightOpt = getMaxHeight(heights);
                        maxTabHeight.set(maxTabHeightOpt);
                    });
                    updateTabviewHeight(comp.element(), tabview, maxTabHeight);
                    sugar_1.Css.remove(tabview, 'visibility');
                    showTab(allTabs, comp);
                    Delay_1.default.requestAnimationFrame(function () {
                        updateTabviewHeight(comp.element(), tabview, maxTabHeight);
                    });
                });
            }),
            alloy_1.AlloyEvents.run(alloy_1.SystemEvents.windowResize(), function (comp) {
                sugar_1.SelectorFind.descendant(comp.element(), '[role="tabpanel"]').each(function (tabview) {
                    updateTabviewHeight(comp.element(), tabview, maxTabHeight);
                });
            }),
            alloy_1.AlloyEvents.run(FormEvents_1.formResizeEvent, function (comp, se) {
                sugar_1.SelectorFind.descendant(comp.element(), '[role="tabpanel"]').each(function (tabview) {
                    var oldFocus = sugar_1.Focus.active();
                    sugar_1.Css.set(tabview, 'visibility', 'hidden');
                    var oldHeight = sugar_1.Css.getRaw(tabview, 'height').map(function (h) { return parseInt(h, 10); });
                    sugar_1.Css.remove(tabview, 'height');
                    var newHeight = tabview.dom().getBoundingClientRect().height;
                    var hasGrown = oldHeight.forall(function (h) { return newHeight > h; });
                    if (hasGrown) {
                        maxTabHeight.set(katamari_1.Option.from(newHeight));
                        updateTabviewHeight(comp.element(), tabview, maxTabHeight);
                    }
                    else {
                        oldHeight.each(function (h) {
                            sugar_1.Css.set(tabview, 'height', "".concat(h, "px"));
                        });
                    }
                    sugar_1.Css.remove(tabview, 'visibility');
                    oldFocus.each(sugar_1.Focus.focus);
                });
            })
        ];
        var selectFirst = false;
        return {
            extraEvents: extraEvents,
            selectFirst: selectFirst
        };
    })();
    var naiveTabHeight = (function () {
        var extraEvents = [];
        var selectFirst = true;
        return {
            extraEvents: extraEvents,
            selectFirst: selectFirst
        };
    })();
    return {
        smartTabHeight: smartTabHeight,
        naiveTabHeight: naiveTabHeight
    };
};
exports.setMode = setMode;
