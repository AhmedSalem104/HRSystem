"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var sand_1 = require("@ephox/sand");
var sugar_1 = require("@ephox/sugar");
var DOMUtils_1 = require("tinymce/core/api/dom/DOMUtils");
var ThemeManager_1 = require("tinymce/core/api/ThemeManager");
var TinyCodeDupe_1 = require("./alien/TinyCodeDupe");
var Settings = require("./api/Settings");
var TinyChannels_1 = require("./channels/TinyChannels");
var Features_1 = require("./features/Features");
var Styles_1 = require("./style/Styles");
var Orientation_1 = require("./touch/view/Orientation");
var AndroidRealm_1 = require("./ui/AndroidRealm");
var Buttons_1 = require("./ui/Buttons");
var IosRealm_1 = require("./ui/IosRealm");
var CssUrls_1 = require("./util/CssUrls");
var FormatChangers_1 = require("./util/FormatChangers");
var SkinLoaded_1 = require("./util/SkinLoaded");
var READING = katamari_1.Fun.constant('toReading');
var EDITING = katamari_1.Fun.constant('toEditing');
var renderMobileTheme = function (editor) {
    var renderUI = function () {
        var targetNode = editor.getElement();
        var cssUrls = CssUrls_1.default.derive(editor);
        if (Settings.isSkinDisabled(editor) === false) {
            editor.contentCSS.push(cssUrls.content);
            DOMUtils_1.default.DOM.styleSheetLoader.load(cssUrls.ui, SkinLoaded_1.default.fireSkinLoaded(editor));
        }
        else {
            SkinLoaded_1.default.fireSkinLoaded(editor)();
        }
        var doScrollIntoView = function () {
            editor.fire('ScrollIntoView');
        };
        var realm = sand_1.PlatformDetection.detect().os.isAndroid() ? (0, AndroidRealm_1.default)(doScrollIntoView) : (0, IosRealm_1.default)(doScrollIntoView);
        var original = sugar_1.Element.fromDom(targetNode);
        alloy_1.Attachment.attachSystemAfter(original, realm.system());
        var findFocusIn = function (elem) {
            return sugar_1.Focus.search(elem).bind(function (focused) {
                return realm.system().getByDom(focused).toOption();
            });
        };
        var outerWindow = targetNode.ownerDocument.defaultView;
        var orientation = Orientation_1.default.onChange(outerWindow, {
            onChange: function () {
                var alloy = realm.system();
                alloy.broadcastOn([TinyChannels_1.default.orientationChanged()], { width: Orientation_1.default.getActualWidth(outerWindow) });
            },
            onReady: katamari_1.Fun.noop
        });
        var setReadOnly = function (dynamicGroup, readOnlyGroups, mainGroups, ro) {
            if (ro === false) {
                editor.selection.collapse();
            }
            var toolbars = configureToolbar(dynamicGroup, readOnlyGroups, mainGroups);
            realm.setToolbarGroups(ro === true ? toolbars.readOnly : toolbars.main);
            editor.setMode(ro === true ? 'readonly' : 'design');
            editor.fire(ro === true ? READING() : EDITING());
            realm.updateMode(ro);
        };
        var configureToolbar = function (dynamicGroup, readOnlyGroups, mainGroups) {
            var dynamic = dynamicGroup.get();
            var toolbars = {
                readOnly: dynamic.backToMask.concat(readOnlyGroups.get()),
                main: dynamic.backToMask.concat(mainGroups.get())
            };
            if (Settings.readOnlyOnInit(editor)) {
                toolbars.readOnly = dynamic.backToMask.concat(readOnlyGroups.get());
                toolbars.main = dynamic.backToReadOnly.concat(mainGroups.get());
            }
            return toolbars;
        };
        var bindHandler = function (label, handler) {
            editor.on(label, handler);
            return {
                unbind: function () {
                    editor.off(label);
                }
            };
        };
        editor.on('init', function () {
            realm.init({
                editor: {
                    getFrame: function () {
                        return sugar_1.Element.fromDom(editor.contentAreaContainer.querySelector('iframe'));
                    },
                    onDomChanged: function () {
                        return {
                            unbind: katamari_1.Fun.noop
                        };
                    },
                    onToReading: function (handler) {
                        return bindHandler(READING(), handler);
                    },
                    onToEditing: function (handler) {
                        return bindHandler(EDITING(), handler);
                    },
                    onScrollToCursor: function (handler) {
                        editor.on('ScrollIntoView', function (tinyEvent) {
                            handler(tinyEvent);
                        });
                        var unbind = function () {
                            editor.off('ScrollIntoView');
                            orientation.destroy();
                        };
                        return {
                            unbind: unbind
                        };
                    },
                    onTouchToolstrip: function () {
                        hideDropup();
                    },
                    onTouchContent: function () {
                        var toolbar = sugar_1.Element.fromDom(editor.editorContainer.querySelector('.' + Styles_1.default.resolve('toolbar')));
                        findFocusIn(toolbar).each(alloy_1.AlloyTriggers.emitExecute);
                        realm.restoreToolbar();
                        hideDropup();
                    },
                    onTapContent: function (evt) {
                        var target = evt.target();
                        if (sugar_1.Node.name(target) === 'img') {
                            editor.selection.select(target.dom());
                            evt.kill();
                        }
                        else if (sugar_1.Node.name(target) === 'a') {
                            var component = realm.system().getByDom(sugar_1.Element.fromDom(editor.editorContainer));
                            component.each(function (container) {
                                if (alloy_1.Swapping.isAlpha(container)) {
                                    TinyCodeDupe_1.default.openLink(target.dom());
                                }
                            });
                        }
                    }
                },
                container: sugar_1.Element.fromDom(editor.editorContainer),
                socket: sugar_1.Element.fromDom(editor.contentAreaContainer),
                toolstrip: sugar_1.Element.fromDom(editor.editorContainer.querySelector('.' + Styles_1.default.resolve('toolstrip'))),
                toolbar: sugar_1.Element.fromDom(editor.editorContainer.querySelector('.' + Styles_1.default.resolve('toolbar'))),
                dropup: realm.dropup(),
                alloy: realm.system(),
                translate: katamari_1.Fun.noop,
                setReadOnly: function (ro) {
                    setReadOnly(dynamicGroup, readOnlyGroups, mainGroups, ro);
                },
                readOnlyOnInit: function () {
                    return Settings.readOnlyOnInit(editor);
                }
            });
            var hideDropup = function () {
                realm.dropup().disappear(function () {
                    realm.system().broadcastOn([TinyChannels_1.default.dropupDismissed()], {});
                });
            };
            var backToMaskGroup = {
                label: 'The first group',
                scrollable: false,
                items: [
                    Buttons_1.default.forToolbar('back', function () {
                        editor.selection.collapse();
                        realm.exit();
                    }, {}, editor)
                ]
            };
            var backToReadOnlyGroup = {
                label: 'Back to read only',
                scrollable: false,
                items: [
                    Buttons_1.default.forToolbar('readonly-back', function () {
                        setReadOnly(dynamicGroup, readOnlyGroups, mainGroups, true);
                    }, {}, editor)
                ]
            };
            var readOnlyGroup = {
                label: 'The read only mode group',
                scrollable: true,
                items: []
            };
            var features = Features_1.default.setup(realm, editor);
            var items = Features_1.default.detect(editor.settings, features);
            var actionGroup = {
                label: 'the action group',
                scrollable: true,
                items: items
            };
            var extraGroup = {
                label: 'The extra group',
                scrollable: false,
                items: []
            };
            var mainGroups = (0, katamari_1.Cell)([actionGroup, extraGroup]);
            var readOnlyGroups = (0, katamari_1.Cell)([readOnlyGroup, extraGroup]);
            var dynamicGroup = (0, katamari_1.Cell)({
                backToMask: [backToMaskGroup],
                backToReadOnly: [backToReadOnlyGroup]
            });
            FormatChangers_1.default.init(realm, editor);
        });
        editor.on('remove', function () {
            realm.exit();
        });
        editor.on('detach', function () {
            alloy_1.Attachment.detachSystem(realm.system());
            realm.system().destroy();
        });
        return {
            iframeContainer: realm.socket().element().dom(),
            editorContainer: realm.element().dom()
        };
    };
    return {
        getNotificationManagerImpl: function () {
            return {
                open: katamari_1.Fun.constant({
                    progressBar: { value: katamari_1.Fun.noop },
                    close: katamari_1.Fun.noop,
                    text: katamari_1.Fun.noop
                }),
                close: katamari_1.Fun.noop,
                reposition: katamari_1.Fun.noop,
                getArgs: katamari_1.Fun.constant({})
            };
        },
        renderUI: renderUI
    };
};
function default_1() {
    ThemeManager_1.default.add('mobile', renderMobileTheme);
}
exports.default = default_1;
