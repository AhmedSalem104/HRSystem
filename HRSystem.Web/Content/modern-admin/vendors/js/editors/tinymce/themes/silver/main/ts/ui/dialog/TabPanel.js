"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTabPanel = void 0;
var alloy_1 = require("@ephox/alloy");
var boulder_1 = require("@ephox/boulder");
var katamari_1 = require("@ephox/katamari");
var FormValues_1 = require("tinymce/themes/silver/ui/general/FormValues");
var UiFactory_1 = require("tinymce/themes/silver/ui/general/UiFactory");
var DialogTabHeight_1 = require("../alien/DialogTabHeight");
var FormEvents_1 = require("../general/FormEvents");
var NavigableObject_1 = require("../general/NavigableObject");
var SendDataToSectionChannel = 'send-data-to-section';
var SendDataToViewChannel = 'send-data-to-view';
var renderTabPanel = function (spec, backstage) {
    var storedValue = (0, katamari_1.Cell)({});
    var updateDataWithForm = function (form) {
        var formData = alloy_1.Representing.getValue(form);
        var validData = (0, FormValues_1.toValidValues)(formData).getOr({});
        var currentData = storedValue.get();
        var newData = katamari_1.Merger.deepMerge(currentData, validData);
        storedValue.set(newData);
    };
    var setDataOnForm = function (form) {
        var tabData = storedValue.get();
        alloy_1.Representing.setValue(form, tabData);
    };
    var oldTab = (0, katamari_1.Cell)(null);
    var allTabs = katamari_1.Arr.map(spec.tabs, function (tab) {
        return {
            value: tab.name,
            dom: {
                tag: 'div',
                classes: ['tox-dialog__body-nav-item'],
                innerHtml: backstage.shared.providers.translate(tab.title)
            },
            view: function () {
                return [
                    alloy_1.Form.sketch(function (parts) {
                        return {
                            dom: {
                                tag: 'div',
                                classes: ['tox-form']
                            },
                            components: katamari_1.Arr.map(tab.items, function (item) { return (0, UiFactory_1.interpretInForm)(parts, item, backstage); }),
                            formBehaviours: alloy_1.Behaviour.derive([
                                alloy_1.Keying.config({
                                    mode: 'acyclic',
                                    useTabstopAt: katamari_1.Fun.not(NavigableObject_1.default.isPseudoStop)
                                }),
                                alloy_1.AddEventsBehaviour.config('TabView.form.events', [
                                    alloy_1.AlloyEvents.runOnAttached(setDataOnForm),
                                    alloy_1.AlloyEvents.runOnDetached(updateDataWithForm)
                                ]),
                                alloy_1.Receiving.config({
                                    channels: boulder_1.Objects.wrapAll([
                                        {
                                            key: SendDataToSectionChannel,
                                            value: {
                                                onReceive: updateDataWithForm
                                            }
                                        },
                                        {
                                            key: SendDataToViewChannel,
                                            value: {
                                                onReceive: setDataOnForm
                                            }
                                        }
                                    ])
                                })
                            ])
                        };
                    })
                ];
            }
        };
    });
    var tabMode = (0, DialogTabHeight_1.setMode)(allTabs).smartTabHeight;
    return alloy_1.TabSection.sketch({
        dom: {
            tag: 'div',
            classes: ['tox-dialog__body']
        },
        onChangeTab: function (section, button, _viewItems) {
            var name = alloy_1.Representing.getValue(button);
            alloy_1.AlloyTriggers.emitWith(section, FormEvents_1.formTabChangeEvent, {
                name: name,
                oldName: oldTab.get()
            });
            oldTab.set(name);
        },
        tabs: allTabs,
        components: [
            alloy_1.TabSection.parts().tabbar({
                dom: {
                    tag: 'div',
                    classes: ['tox-dialog__body-nav']
                },
                components: [
                    alloy_1.Tabbar.parts().tabs({})
                ],
                markers: {
                    tabClass: 'tox-tab',
                    selectedClass: 'tox-dialog__body-nav-item--active'
                },
                tabbarBehaviours: alloy_1.Behaviour.derive([
                    alloy_1.Tabstopping.config({})
                ])
            }),
            alloy_1.TabSection.parts().tabview({
                dom: {
                    tag: 'div',
                    classes: ['tox-dialog__body-content']
                }
            })
        ],
        selectFirst: tabMode.selectFirst,
        tabSectionBehaviours: alloy_1.Behaviour.derive([
            alloy_1.AddEventsBehaviour.config('tabpanel', tabMode.extraEvents),
            alloy_1.Keying.config({
                mode: 'acyclic'
            }),
            alloy_1.Composing.config({
                find: function (comp) { return katamari_1.Arr.head(alloy_1.TabSection.getViewItems(comp)); }
            }),
            alloy_1.Representing.config({
                store: {
                    mode: 'manual',
                    getValue: function (tsection) {
                        tsection.getSystem().broadcastOn([SendDataToSectionChannel], {});
                        return storedValue.get();
                    },
                    setValue: function (tsection, value) {
                        storedValue.set(value);
                        tsection.getSystem().broadcastOn([SendDataToViewChannel], {});
                    }
                }
            })
        ])
    });
};
exports.renderTabPanel = renderTabPanel;
