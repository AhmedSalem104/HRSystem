"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderStatusbar = void 0;
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var I18n_1 = require("tinymce/core/api/util/I18n");
var Icons_1 = require("../icons/Icons");
var Resize_1 = require("../sizing/Resize");
var ElementPath_1 = require("./ElementPath");
var WordCount_1 = require("./WordCount");
var renderStatusbar = function (editor, providersBackstage) {
    var renderResizeHandlerIcon = function (resizeType) {
        return {
            dom: {
                tag: 'div',
                classes: ['tox-statusbar__resize-handle'],
                attributes: {
                    title: providersBackstage.translate('Resize')
                },
                innerHtml: (0, Icons_1.get)('resize-handle', providersBackstage.icons),
            },
            behaviours: alloy_1.Behaviour.derive([
                alloy_1.Dragging.config({
                    mode: 'mouse',
                    repositionTarget: false,
                    onDrag: function (comp, target, delta) {
                        (0, Resize_1.resize)(editor, delta, resizeType);
                    },
                    blockerClass: 'tox-blocker'
                })
            ])
        };
    };
    var renderBranding = function () {
        var label = I18n_1.default.translate(['Powered by {0}', 'Tiny']);
        var linkHtml = "<a href=\"https://www.tiny.cloud/?utm_campaign=editor_referral&amp;utm_medium=poweredby&amp;utm_source=tinymce&amp;utm_content=v5\" rel=\"noopener\" target=\"_blank\" tabindex=\"-1\" aria-label=\"".concat(label, "\">").concat(label, "</a>");
        return {
            dom: {
                tag: 'span',
                classes: ['tox-statusbar__branding'],
                innerHtml: linkHtml
            }
        };
    };
    var getResizeType = function (editor) {
        var fallback = !katamari_1.Strings.contains(editor.settings.plugins, 'autoresize');
        var resize = editor.getParam('resize', fallback);
        if (resize === false) {
            return Resize_1.ResizeTypes.None;
        }
        else if (resize === 'both') {
            return Resize_1.ResizeTypes.Both;
        }
        else {
            return Resize_1.ResizeTypes.Vertical;
        }
    };
    var getTextComponents = function () {
        var components = [];
        if (editor.getParam('elementpath', true, 'boolean')) {
            components.push(ElementPath_1.default.renderElementPath(editor, {}));
        }
        if (katamari_1.Strings.contains(editor.settings.plugins, 'wordcount')) {
            components.push((0, WordCount_1.renderWordCount)(editor, providersBackstage));
        }
        if (editor.getParam('branding', true, 'boolean')) {
            components.push(renderBranding());
        }
        if (components.length > 0) {
            return [{
                    dom: {
                        tag: 'div',
                        classes: ['tox-statusbar__text-container']
                    },
                    components: components,
                }];
        }
        return [];
    };
    var getComponents = function () {
        var components = getTextComponents();
        var resizeType = getResizeType(editor);
        if (resizeType !== Resize_1.ResizeTypes.None) {
            components.push(renderResizeHandlerIcon(resizeType));
        }
        return components;
    };
    return {
        dom: {
            tag: 'div',
            classes: ['tox-statusbar'],
        },
        components: getComponents(),
    };
};
exports.renderStatusbar = renderStatusbar;
