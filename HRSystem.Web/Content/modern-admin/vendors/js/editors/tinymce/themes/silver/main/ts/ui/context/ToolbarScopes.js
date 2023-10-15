"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var bridge_1 = require("@ephox/bridge");
var katamari_1 = require("@ephox/katamari");
var boulder_1 = require("@ephox/boulder");
var categorise = function (contextToolbars, navigate) {
    var forms = {};
    var inNodeScope = [];
    var inEditorScope = [];
    var formNavigators = {};
    var lookupTable = {};
    var registerForm = function (key, toolbarApi) {
        var contextForm = boulder_1.ValueSchema.getOrDie(bridge_1.Toolbar.createContextForm(toolbarApi));
        forms[key] = contextForm;
        contextForm.launch.map(function (launch) {
            formNavigators['form:' + key + ''] = __assign(__assign({}, toolbarApi.launch), { type: (launch.type === 'contextformtogglebutton' ? 'togglebutton' : 'button'), onAction: function () {
                    navigate(contextForm);
                } });
        });
        if (contextForm.scope === 'editor') {
            inEditorScope.push(contextForm);
        }
        else {
            inNodeScope.push(contextForm);
        }
        lookupTable[key] = contextForm;
    };
    var registerToolbar = function (key, toolbarApi) {
        bridge_1.Toolbar.createContextToolbar(toolbarApi).each(function (contextToolbar) {
            if (toolbarApi.scope === 'editor') {
                inEditorScope.push(contextToolbar);
            }
            else {
                inNodeScope.push(contextToolbar);
            }
            lookupTable[key] = contextToolbar;
        });
    };
    var keys = katamari_1.Obj.keys(contextToolbars);
    katamari_1.Arr.each(keys, function (key) {
        var toolbarApi = contextToolbars[key];
        if (toolbarApi.type === 'contextform') {
            registerForm(key, toolbarApi);
        }
        else if (toolbarApi.type === 'contexttoolbar') {
            registerToolbar(key, toolbarApi);
        }
    });
    return {
        forms: forms,
        inNodeScope: inNodeScope,
        inEditorScope: inEditorScope,
        lookupTable: lookupTable,
        formNavigators: formNavigators
    };
};
exports.default = {
    categorise: categorise
};
