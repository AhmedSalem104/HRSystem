"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDraggableModal = exports.getToolbarDrawer = exports.useFixedContainer = exports.getUiContainer = exports.getMultipleToolbarsSetting = exports.isToolbarEnabled = exports.isMultipleToolbars = exports.isMenubarEnabled = exports.getRemovedMenuItems = exports.isMergeStyleFormats = exports.getUserStyleFormats = exports.getMaxHeightSetting = exports.getMaxWidthSetting = exports.getMinHeightSetting = exports.getMinWidthSetting = exports.getHeightSetting = exports.isSkinDisabled = exports.isReadOnly = exports.getSkinUrl = exports.ToolbarDrawer = void 0;
var katamari_1 = require("@ephox/katamari");
var EditorManager_1 = require("tinymce/core/api/EditorManager");
var sugar_1 = require("@ephox/sugar");
var getSkinUrl = function (editor) {
    var settings = editor.settings;
    var skin = settings.skin;
    var skinUrl = settings.skin_url;
    if (skin !== false) {
        var skinName = skin ? skin : 'oxide';
        if (skinUrl) {
            skinUrl = editor.documentBaseURI.toAbsolute(skinUrl);
        }
        else {
            skinUrl = EditorManager_1.default.baseURL + '/skins/ui/' + skinName;
        }
    }
    return skinUrl;
};
exports.getSkinUrl = getSkinUrl;
var isReadOnly = function (editor) { return editor.getParam('readonly', false, 'boolean'); };
exports.isReadOnly = isReadOnly;
var isSkinDisabled = function (editor) { return editor.getParam('skin') === false; };
exports.isSkinDisabled = isSkinDisabled;
var getHeightSetting = function (editor) { return editor.getParam('height', Math.max(editor.getElement().offsetHeight, 200)); };
exports.getHeightSetting = getHeightSetting;
var getMinWidthSetting = function (editor) { return katamari_1.Option.from(editor.settings.min_width).filter(katamari_1.Type.isNumber); };
exports.getMinWidthSetting = getMinWidthSetting;
var getMinHeightSetting = function (editor) { return katamari_1.Option.from(editor.settings.min_height).filter(katamari_1.Type.isNumber); };
exports.getMinHeightSetting = getMinHeightSetting;
var getMaxWidthSetting = function (editor) { return katamari_1.Option.from(editor.getParam('max_width')).filter(katamari_1.Type.isNumber); };
exports.getMaxWidthSetting = getMaxWidthSetting;
var getMaxHeightSetting = function (editor) { return katamari_1.Option.from(editor.getParam('max_height')).filter(katamari_1.Type.isNumber); };
exports.getMaxHeightSetting = getMaxHeightSetting;
var getUserStyleFormats = function (editor) { return katamari_1.Option.from(editor.getParam('style_formats')).filter(katamari_1.Type.isArray); };
exports.getUserStyleFormats = getUserStyleFormats;
var isMergeStyleFormats = function (editor) { return editor.getParam('style_formats_merge', false, 'boolean'); };
exports.isMergeStyleFormats = isMergeStyleFormats;
var getRemovedMenuItems = function (editor) { return editor.getParam('removed_menuitems', ''); };
exports.getRemovedMenuItems = getRemovedMenuItems;
var isMenubarEnabled = function (editor) { return editor.getParam('menubar', true, 'boolean') !== false; };
exports.isMenubarEnabled = isMenubarEnabled;
var isToolbarEnabled = function (editor) {
    var toolbar = editor.getParam('toolbar', true);
    var isToolbarTrue = toolbar === true;
    var isToolbarString = katamari_1.Type.isString(toolbar);
    var isToolbarObjectArray = katamari_1.Type.isArray(toolbar) && toolbar.length > 0;
    return !isMultipleToolbars(editor) && (isToolbarObjectArray || isToolbarString || isToolbarTrue);
};
exports.isToolbarEnabled = isToolbarEnabled;
var getMultipleToolbarsSetting = function (editor) {
    var keys = katamari_1.Obj.keys(editor.settings);
    var toolbarKeys = katamari_1.Arr.filter(keys, function (key) { return /^toolbar([1-9])$/.test(key); });
    var toolbars = katamari_1.Arr.map(toolbarKeys, function (key) { return editor.getParam(key, false, 'string'); });
    var toolbarArray = katamari_1.Arr.filter(toolbars, function (toolbar) { return typeof toolbar === 'string'; });
    return toolbarArray.length > 0 ? katamari_1.Option.some(toolbarArray) : katamari_1.Option.none();
};
exports.getMultipleToolbarsSetting = getMultipleToolbarsSetting;
var isMultipleToolbars = function (editor) {
    return getMultipleToolbarsSetting(editor).fold(function () {
        var toolbar = editor.getParam('toolbar', [], 'string[]');
        return toolbar.length > 0;
    }, function () { return true; });
};
exports.isMultipleToolbars = isMultipleToolbars;
var ToolbarDrawer;
(function (ToolbarDrawer) {
    ToolbarDrawer["default"] = "";
    ToolbarDrawer["floating"] = "floating";
    ToolbarDrawer["sliding"] = "sliding";
})(ToolbarDrawer = exports.ToolbarDrawer || (exports.ToolbarDrawer = {}));
var getToolbarDrawer = function (editor) { return editor.getParam('toolbar_drawer', '', 'string'); };
exports.getToolbarDrawer = getToolbarDrawer;
var fixedContainerSelector = function (editor) { return editor.getParam('fixed_toolbar_container', '', 'string'); };
var fixedContainerElement = function (editor) {
    var selector = fixedContainerSelector(editor);
    var isInline = editor.getParam('inline', false, 'boolean');
    return selector.length > 0 && isInline ? sugar_1.SelectorFind.descendant(sugar_1.Body.body(), selector) : katamari_1.Option.none();
};
var useFixedContainer = function (editor) { return editor.getParam('inline', false, 'boolean') && fixedContainerElement(editor).isSome(); };
exports.useFixedContainer = useFixedContainer;
var getUiContainer = function (editor) {
    var fixedContainer = fixedContainerElement(editor);
    return fixedContainer.getOr(sugar_1.Body.body());
};
exports.getUiContainer = getUiContainer;
var isDraggableModal = function (editor) { return editor.getParam('draggable_modal', false, 'boolean'); };
exports.isDraggableModal = isDraggableModal;
