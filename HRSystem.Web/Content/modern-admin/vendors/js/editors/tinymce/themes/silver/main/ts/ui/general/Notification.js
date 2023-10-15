"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
var alloy_1 = require("@ephox/alloy");
var boulder_1 = require("@ephox/boulder");
var katamari_1 = require("@ephox/katamari");
var Icons_1 = require("../icons/Icons");
var notificationIconMap = {
    success: 'checkmark',
    error: 'warning',
    err: 'error',
    warning: 'warning',
    warn: 'warning',
    info: 'info'
};
var factory = function (detail) {
    var memBannerText = alloy_1.Memento.record({
        dom: {
            tag: 'p',
            innerHtml: detail.translationProvider(detail.text)
        },
        behaviours: alloy_1.Behaviour.derive([
            alloy_1.Replacing.config({})
        ])
    });
    var renderPercentBar = function (percent) { return ({
        dom: {
            tag: 'div',
            classes: ['tox-bar'],
            attributes: {
                style: "width: ".concat(percent, "%")
            }
        }
    }); };
    var renderPercentText = function (percent) { return ({
        dom: {
            tag: 'div',
            classes: ['tox-text'],
            innerHtml: "".concat(percent, "%")
        }
    }); };
    var memBannerProgress = alloy_1.Memento.record({
        dom: {
            tag: 'div',
            classes: detail.progress ? ['tox-progress-bar', 'tox-progress-indicator'] : ['tox-progress-bar']
        },
        components: [
            {
                dom: {
                    tag: 'div',
                    classes: ['tox-bar-container']
                },
                components: [
                    renderPercentBar(0)
                ]
            },
            renderPercentText(0)
        ],
        behaviours: alloy_1.Behaviour.derive([
            alloy_1.Replacing.config({})
        ])
    });
    var updateProgress = function (comp, percent) {
        if (comp.getSystem().isConnected()) {
            memBannerProgress.getOpt(comp).each(function (progress) {
                alloy_1.Replacing.set(progress, [
                    {
                        dom: {
                            tag: 'div',
                            classes: ['tox-bar-container']
                        },
                        components: [
                            renderPercentBar(percent)
                        ]
                    },
                    renderPercentText(percent)
                ]);
            });
        }
    };
    var updateText = function (comp, text) {
        if (comp.getSystem().isConnected()) {
            var banner = memBannerText.get(comp);
            alloy_1.Replacing.set(banner, [
                alloy_1.GuiFactory.text(text)
            ]);
        }
    };
    var apis = {
        updateProgress: updateProgress,
        updateText: updateText
    };
    var iconChoices = katamari_1.Arr.flatten([
        detail.icon.toArray(),
        detail.level.toArray(),
        detail.level.bind(function (level) { return katamari_1.Option.from(notificationIconMap[level]); }).toArray()
    ]);
    return {
        uid: detail.uid,
        dom: {
            tag: 'div',
            attributes: {
                role: 'alert'
            },
            classes: detail.level.map(function (level) { return ['tox-notification', 'tox-notification--in', "tox-notification--".concat(level)]; }).getOr(['tox-notification', 'tox-notification--in'])
        },
        components: [{
                dom: {
                    tag: 'div',
                    classes: ['tox-notification__icon'],
                    innerHtml: (0, Icons_1.getFirst)(iconChoices, detail.iconProvider)
                }
            },
            {
                dom: {
                    tag: 'div',
                    classes: ['tox-notification__body'],
                },
                components: [
                    memBannerText.asSpec()
                ],
                behaviours: alloy_1.Behaviour.derive([
                    alloy_1.Replacing.config({})
                ])
            }
        ]
            .concat(detail.progress ? [memBannerProgress.asSpec()] : [])
            .concat(alloy_1.Button.sketch({
            dom: {
                tag: 'button',
                classes: ['tox-notification__dismiss', 'tox-button', 'tox-button--naked', 'tox-button--icon']
            },
            components: [{
                    dom: {
                        tag: 'div',
                        classes: ['tox-icon'],
                        innerHtml: (0, Icons_1.get)('close', detail.iconProvider),
                        attributes: {
                            'aria-label': detail.translationProvider('Close')
                        }
                    }
                }],
            action: function (comp) {
                detail.onAction(comp);
            }
        })),
        apis: apis
    };
};
exports.Notification = alloy_1.Sketcher.single({
    name: 'Notification',
    factory: factory,
    configFields: [
        boulder_1.FieldSchema.option('level'),
        boulder_1.FieldSchema.strict('progress'),
        boulder_1.FieldSchema.strict('icon'),
        boulder_1.FieldSchema.strict('onAction'),
        boulder_1.FieldSchema.strict('text'),
        boulder_1.FieldSchema.strict('iconProvider'),
        boulder_1.FieldSchema.strict('translationProvider'),
    ],
    apis: {
        updateProgress: function (apis, comp, percent) {
            apis.updateProgress(comp, percent);
        },
        updateText: function (apis, comp, text) {
            apis.updateText(comp, text);
        }
    }
});
