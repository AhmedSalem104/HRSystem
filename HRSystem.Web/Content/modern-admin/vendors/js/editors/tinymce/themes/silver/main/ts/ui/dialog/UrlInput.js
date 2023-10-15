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
exports.renderUrlInput = void 0;
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var FieldLabeller_1 = require("../alien/FieldLabeller");
var FormEvents_1 = require("../general/FormEvents");
var Icons = require("../icons/Icons");
var MenuParts = require("../menus/menu/MenuParts");
var NestedMenus = require("../menus/menu/NestedMenus");
var Completions_1 = require("../urlinput/Completions");
var ItemResponse_1 = require("../menus/item/ItemResponse");
var Button_1 = require("../general/Button");
var getItems = function (fileType, input, urlBackstage) {
    var urlInputValue = alloy_1.Representing.getValue(input);
    var term = urlInputValue.meta.text !== undefined ? urlInputValue.meta.text : urlInputValue.value;
    var info = urlBackstage.getLinkInformation();
    return info.fold(function () { return []; }, function (linkInfo) {
        var history = (0, Completions_1.filterByQuery)(term, (0, Completions_1.historyTargets)(urlBackstage.getHistory(fileType)));
        return fileType === 'file' ? (0, Completions_1.joinMenuLists)([
            history,
            (0, Completions_1.filterByQuery)(term, (0, Completions_1.headerTargets)(linkInfo)),
            (0, Completions_1.filterByQuery)(term, katamari_1.Arr.flatten([
                (0, Completions_1.anchorTargetTop)(linkInfo),
                (0, Completions_1.anchorTargets)(linkInfo),
                (0, Completions_1.anchorTargetBottom)(linkInfo)
            ]))
        ])
            : history;
    });
};
var errorId = katamari_1.Id.generate('aria-invalid');
var renderUrlInput = function (spec, backstage, urlBackstage) {
    var _a;
    var providersBackstage = backstage.shared.providers;
    var updateHistory = function (component) {
        var urlEntry = alloy_1.Representing.getValue(component);
        urlBackstage.addToHistory(urlEntry.value, spec.filetype);
    };
    var pField = alloy_1.FormField.parts().field({
        factory: alloy_1.Typeahead,
        dismissOnBlur: true,
        inputClasses: ['tox-textfield'],
        sandboxClasses: ['tox-dialog__popups'],
        inputAttributes: {
            'aria-errormessage': errorId
        },
        minChars: 0,
        responseTime: 0,
        fetch: function (input) {
            var items = getItems(spec.filetype, input, urlBackstage);
            var tdata = NestedMenus.build(items, ItemResponse_1.default.BUBBLE_TO_SANDBOX, backstage);
            return katamari_1.Future.pure(tdata);
        },
        getHotspot: function (comp) { return memUrlBox.getOpt(comp); },
        onSetValue: function (comp, newValue) {
            if (comp.hasConfigured(alloy_1.Invalidating)) {
                alloy_1.Invalidating.run(comp).get(katamari_1.Fun.noop);
            }
        },
        typeaheadBehaviours: alloy_1.Behaviour.derive(katamari_1.Arr.flatten([
            urlBackstage.getValidationHandler().map(function (handler) { return alloy_1.Invalidating.config({
                getRoot: function (comp) { return sugar_1.Traverse.parent(comp.element()); },
                invalidClass: 'tox-control-wrap--status-invalid',
                notify: {
                    onInvalid: function (comp, err) {
                        memInvalidIcon.getOpt(comp).each(function (invalidComp) {
                            sugar_1.Attr.set(invalidComp.element(), 'title', providersBackstage.translate(err));
                        });
                    }
                },
                validator: {
                    validate: function (input) {
                        var urlEntry = alloy_1.Representing.getValue(input);
                        return katamari_1.FutureResult.nu(function (completer) {
                            handler({ type: spec.filetype, url: urlEntry.value }, function (validation) {
                                if (validation.status === 'invalid') {
                                    var err = katamari_1.Result.error(validation.message);
                                    completer(err);
                                }
                                else {
                                    var val = katamari_1.Result.value(validation.message);
                                    completer(val);
                                }
                            });
                        });
                    },
                    validateOnLoad: false
                }
            }); }).toArray(),
            [
                alloy_1.Disabling.config({ disabled: spec.disabled }),
                alloy_1.Tabstopping.config({}),
                alloy_1.AddEventsBehaviour.config('urlinput-events', katamari_1.Arr.flatten([
                    spec.filetype === 'file' ? [
                        alloy_1.AlloyEvents.run(alloy_1.NativeEvents.input(), function (comp) {
                            alloy_1.AlloyTriggers.emitWith(comp, FormEvents_1.formChangeEvent, { name: spec.name });
                        })
                    ] : [],
                    [
                        alloy_1.AlloyEvents.run(alloy_1.NativeEvents.change(), function (comp) {
                            alloy_1.AlloyTriggers.emitWith(comp, FormEvents_1.formChangeEvent, { name: spec.name });
                            updateHistory(comp);
                        }),
                        alloy_1.AlloyEvents.run(alloy_1.SystemEvents.postPaste(), function (comp) {
                            alloy_1.AlloyTriggers.emitWith(comp, FormEvents_1.formChangeEvent, { name: spec.name });
                            updateHistory(comp);
                        })
                    ]
                ]))
            ]
        ])),
        eventOrder: (_a = {},
            _a[alloy_1.NativeEvents.input()] = ['streaming', 'urlinput-events', 'invalidating'],
            _a),
        model: {
            getDisplayText: function (itemData) {
                return itemData.value;
            },
            selectsOver: false,
            populateFromBrowse: false
        },
        markers: {
            openClass: 'dog'
        },
        lazySink: backstage.shared.getSink,
        parts: {
            menu: MenuParts.part(false, 1, 'normal')
        },
        onExecute: function (_menu, component, _entry) {
            alloy_1.AlloyTriggers.emitWith(component, FormEvents_1.formSubmitEvent, {});
        },
        onItemExecute: function (typeahead, _sandbox, _item, _value) {
            updateHistory(typeahead);
            alloy_1.AlloyTriggers.emitWith(typeahead, FormEvents_1.formChangeEvent, { name: spec.name });
        }
    });
    var pLabel = spec.label.map(function (label) { return (0, FieldLabeller_1.renderLabel)(label, providersBackstage); });
    var makeIcon = function (name, errId, icon, label) {
        if (icon === void 0) { icon = name; }
        if (label === void 0) { label = name; }
        return ({
            dom: {
                tag: 'div',
                classes: ['tox-icon', 'tox-control-wrap__status-icon-' + name],
                innerHtml: Icons.get(icon, providersBackstage.icons),
                attributes: __assign({ 'title': providersBackstage.translate(label), 'aria-live': 'polite' }, errId.fold(function () { return ({}); }, function (id) { return ({ id: id }); }))
            }
        });
    };
    var memInvalidIcon = alloy_1.Memento.record(makeIcon('invalid', katamari_1.Option.some(errorId), 'warning'));
    var memStatus = alloy_1.Memento.record({
        dom: {
            tag: 'div',
            classes: ['tox-control-wrap__status-icon-wrap']
        },
        components: [
            memInvalidIcon.asSpec()
        ]
    });
    var optUrlPicker = urlBackstage.getUrlPicker(spec.filetype);
    var browseUrlEvent = katamari_1.Id.generate('browser.url.event');
    var memUrlBox = alloy_1.Memento.record({
        dom: {
            tag: 'div',
            classes: ['tox-control-wrap']
        },
        components: [pField, memStatus.asSpec()],
        behaviours: alloy_1.Behaviour.derive([
            alloy_1.Disabling.config({ disabled: spec.disabled })
        ])
    });
    var memUrlPickerButton = alloy_1.Memento.record((0, Button_1.renderButton)({
        name: spec.name,
        icon: katamari_1.Option.some('browse'),
        text: spec.label.getOr(''),
        disabled: spec.disabled,
        primary: false,
        borderless: true
    }, function (component) { return alloy_1.AlloyTriggers.emit(component, browseUrlEvent); }, providersBackstage, [], ['tox-browse-url']));
    var controlHWrapper = function () {
        return {
            dom: {
                tag: 'div',
                classes: ['tox-form__controls-h-stack']
            },
            components: katamari_1.Arr.flatten([
                [memUrlBox.asSpec()],
                optUrlPicker.map(function () { return memUrlPickerButton.asSpec(); }).toArray()
            ])
        };
    };
    var openUrlPicker = function (comp) {
        alloy_1.Composing.getCurrent(comp).each(function (field) {
            var urlData = alloy_1.Representing.getValue(field);
            optUrlPicker.each(function (picker) {
                picker(urlData).get(function (chosenData) {
                    alloy_1.Representing.setValue(field, chosenData);
                    alloy_1.AlloyTriggers.emitWith(comp, FormEvents_1.formChangeEvent, { name: spec.name });
                });
            });
        });
    };
    return alloy_1.FormField.sketch({
        dom: (0, FieldLabeller_1.renderFormFieldDom)(),
        components: pLabel.toArray().concat([
            controlHWrapper()
        ]),
        fieldBehaviours: alloy_1.Behaviour.derive([
            alloy_1.Disabling.config({
                disabled: spec.disabled,
                onDisabled: function (comp) {
                    alloy_1.FormField.getField(comp).each(alloy_1.Disabling.disable);
                    memUrlPickerButton.getOpt(comp).each(alloy_1.Disabling.disable);
                },
                onEnabled: function (comp) {
                    alloy_1.FormField.getField(comp).each(alloy_1.Disabling.enable);
                    memUrlPickerButton.getOpt(comp).each(alloy_1.Disabling.enable);
                }
            }),
            alloy_1.AddEventsBehaviour.config('url-input-events', [
                alloy_1.AlloyEvents.run(browseUrlEvent, openUrlPicker)
            ])
        ])
    });
};
exports.renderUrlInput = renderUrlInput;
