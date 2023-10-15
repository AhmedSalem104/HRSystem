"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderDialog = exports.pFooterGroup = exports.pFooter = exports.pBodyMessage = exports.pUntitled = exports.pClose = exports.hiddenHeader = exports.defaultHeader = void 0;
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var FormEvents_1 = require("../general/FormEvents");
var hiddenHeader = {
    dom: {
        tag: 'div',
        styles: { display: 'none' },
        classes: ['tox-dialog__header']
    }
};
exports.hiddenHeader = hiddenHeader;
var defaultHeader = {
    dom: {
        tag: 'div',
        classes: ['tox-dialog__header']
    }
};
exports.defaultHeader = defaultHeader;
var pClose = function (onClose, providersBackstage) { return alloy_1.ModalDialog.parts().close(alloy_1.Button.sketch({
    dom: {
        tag: 'button',
        classes: ['tox-button', 'tox-button--icon', 'tox-button--naked'],
        attributes: {
            'type': 'button',
            'aria-label': providersBackstage.translate('Close')
        }
    },
    action: onClose,
    buttonBehaviours: alloy_1.Behaviour.derive([
        alloy_1.Tabstopping.config({})
    ])
})); };
exports.pClose = pClose;
var pUntitled = function () { return alloy_1.ModalDialog.parts().title({
    dom: {
        tag: 'div',
        classes: ['tox-dialog__title'],
        innerHtml: '',
        styles: {
            display: 'none'
        }
    }
}); };
exports.pUntitled = pUntitled;
var pBodyMessage = function (message, providersBackstage) { return alloy_1.ModalDialog.parts().body({
    dom: {
        tag: 'div',
        classes: ['tox-dialog__body']
    },
    components: [
        {
            dom: {
                tag: 'div',
                classes: ['tox-dialog__body-content']
            },
            components: [
                {
                    dom: alloy_1.DomFactory.fromHtml("<p>".concat(providersBackstage.translate(message), "</p>"))
                }
            ]
        }
    ]
}); };
exports.pBodyMessage = pBodyMessage;
var pFooter = function (buttons) { return alloy_1.ModalDialog.parts().footer({
    dom: {
        tag: 'div',
        classes: ['tox-dialog__footer']
    },
    components: buttons,
}); };
exports.pFooter = pFooter;
var pFooterGroup = function (startButtons, endButtons) {
    return [
        alloy_1.Container.sketch({
            dom: {
                tag: 'div',
                classes: ["tox-dialog__footer-start"]
            },
            components: startButtons
        }),
        alloy_1.Container.sketch({
            dom: {
                tag: 'div',
                classes: ["tox-dialog__footer-end"]
            },
            components: endButtons
        })
    ];
};
exports.pFooterGroup = pFooterGroup;
var renderDialog = function (spec) {
    return alloy_1.ModalDialog.sketch({
        lazySink: spec.lazySink,
        onEscape: function () {
            spec.onCancel();
            return katamari_1.Option.some(true);
        },
        dom: {
            tag: 'div',
            classes: ['tox-dialog'].concat(spec.extraClasses)
        },
        components: [
            katamari_1.Merger.deepMerge(spec.headerOverride.getOr(defaultHeader), {
                components: [
                    spec.partSpecs.title,
                    spec.partSpecs.close
                ]
            }),
            spec.partSpecs.body,
            spec.partSpecs.footer
        ],
        parts: {
            blocker: {
                dom: alloy_1.DomFactory.fromHtml('<div class="tox-dialog-wrap"></div>'),
                components: [
                    {
                        dom: {
                            tag: 'div',
                            classes: ['tox-dialog-wrap__backdrop']
                        }
                    }
                ]
            }
        },
        modalBehaviours: alloy_1.Behaviour.derive([
            alloy_1.AddEventsBehaviour.config('basic-dialog-events', [
                alloy_1.AlloyEvents.run(FormEvents_1.formCancelEvent, function (comp, se) {
                    spec.onCancel();
                }),
                alloy_1.AlloyEvents.run(FormEvents_1.formSubmitEvent, function (comp, se) {
                    spec.onSubmit();
                }),
            ])
        ])
    });
};
exports.renderDialog = renderDialog;
