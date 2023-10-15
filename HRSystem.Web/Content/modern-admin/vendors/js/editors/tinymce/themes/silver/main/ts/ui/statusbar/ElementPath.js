"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var isHidden = function (elm) {
    if (elm.nodeType === 1) {
        if (elm.nodeName === 'BR' || !!elm.getAttribute('data-mce-bogus')) {
            return true;
        }
        if (elm.getAttribute('data-mce-type') === 'bookmark') {
            return true;
        }
    }
    return false;
};
var renderElementPath = function (editor, settings) {
    if (!settings.delimiter) {
        settings.delimiter = '\u00BB';
    }
    var getDataPath = function (data) {
        var parts = data || [];
        var newPathElements = katamari_1.Arr.map(parts, function (part, index) {
            return alloy_1.Button.sketch({
                dom: {
                    tag: 'div',
                    classes: ['tox-statusbar__path-item'],
                    attributes: {
                        'role': 'button',
                        'data-index': index,
                        'tab-index': -1,
                        'aria-level': index + 1
                    },
                    innerHtml: part.name
                },
                action: function (btn) {
                    editor.focus();
                    editor.selection.select(part.element);
                    editor.nodeChanged();
                }
            });
        });
        var divider = {
            dom: {
                tag: 'div',
                classes: ['tox-statusbar__path-divider'],
                attributes: {
                    'aria-hidden': true
                },
                innerHtml: " ".concat(settings.delimiter, " ")
            }
        };
        return katamari_1.Arr.foldl(newPathElements.slice(1), function (acc, element) {
            var newAcc = acc;
            newAcc.push(divider);
            newAcc.push(element);
            return newAcc;
        }, [newPathElements[0]]);
    };
    var updatePath = function (parents) {
        var newPath = [];
        var i = parents.length;
        while (i-- > 0) {
            var parent_1 = parents[i];
            if (parent_1.nodeType === 1 && !isHidden(parent_1)) {
                var args = editor.fire('ResolveName', {
                    name: parent_1.nodeName.toLowerCase(),
                    target: parent_1
                });
                if (!args.isDefaultPrevented()) {
                    newPath.push({ name: args.name, element: parent_1 });
                }
                if (args.isPropagationStopped()) {
                    break;
                }
            }
        }
        return newPath;
    };
    return {
        dom: {
            tag: 'div',
            classes: ['tox-statusbar__path'],
            attributes: {
                role: 'navigation'
            }
        },
        behaviours: alloy_1.Behaviour.derive([
            alloy_1.Keying.config({
                mode: 'flow',
                selector: 'div[role=button]'
            }),
            alloy_1.Tabstopping.config({}),
            alloy_1.Replacing.config({}),
            alloy_1.AddEventsBehaviour.config('elementPathEvents', [
                alloy_1.AlloyEvents.runOnAttached(function (comp, e) {
                    editor.shortcuts.add('alt+F11', 'focus statusbar elementpath', function () { return alloy_1.Keying.focusIn(comp); });
                    editor.on('NodeChange', function (e) {
                        var newPath = updatePath(e.parents);
                        if (newPath.length > 0) {
                            alloy_1.Replacing.set(comp, getDataPath(newPath));
                        }
                    });
                })
            ])
        ]),
        components: []
    };
};
exports.default = {
    renderElementPath: renderElementPath
};
