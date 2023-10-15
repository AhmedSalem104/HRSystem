"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ephox/katamari");
var ThemeManager_1 = require("tinymce/core/api/ThemeManager");
var NotificationManagerImpl_1 = require("./alien/NotificationManagerImpl");
var Autocompleter_1 = require("./Autocompleter");
var Render_1 = require("./Render");
var WindowManager_1 = require("./ui/dialog/WindowManager");
function default_1() {
    ThemeManager_1.default.add('silver', function (editor) {
        var _a = Render_1.default.setup(editor), uiMothership = _a.uiMothership, backstage = _a.backstage, renderUI = _a.renderUI, getUi = _a.getUi;
        Autocompleter_1.Autocompleter.register(editor, backstage.shared);
        var windowMgr = WindowManager_1.default.setup({ editor: editor, backstage: backstage });
        return {
            renderUI: renderUI,
            getWindowManagerImpl: katamari_1.Fun.constant(windowMgr),
            getNotificationManagerImpl: function () {
                return (0, NotificationManagerImpl_1.default)(editor, { backstage: backstage }, uiMothership);
            },
            ui: getUi()
        };
    });
}
exports.default = default_1;
