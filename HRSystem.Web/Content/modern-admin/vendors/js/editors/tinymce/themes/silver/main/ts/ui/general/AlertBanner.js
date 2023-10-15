"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderAlertBanner = void 0;
var alloy_1 = require("@ephox/alloy");
var FormEvents_1 = require("tinymce/themes/silver/ui/general/FormEvents");
var Icons = require("../icons/Icons");
var renderAlertBanner = function (spec, providersBackstage) {
    return alloy_1.Container.sketch({
        dom: {
            tag: 'div',
            attributes: {
                role: 'alert'
            },
            classes: ['tox-notification', 'tox-notification--in', "tox-notification--".concat(spec.level)]
        },
        components: [
            {
                dom: {
                    tag: 'div',
                    classes: ['tox-notification__icon']
                },
                components: [
                    alloy_1.Button.sketch({
                        dom: {
                            tag: 'button',
                            classes: ['tox-button', 'tox-button--naked', 'tox-button--icon'],
                            innerHtml: Icons.get(spec.icon, providersBackstage.icons),
                            attributes: {
                                title: providersBackstage.translate(spec.iconTooltip)
                            }
                        },
                        action: function (comp) {
                            alloy_1.AlloyTriggers.emitWith(comp, FormEvents_1.formActionEvent, { name: 'alert-banner', value: spec.url });
                        }
                    })
                ]
            },
            {
                dom: {
                    tag: 'div',
                    classes: ['tox-notification__body'],
                    innerHtml: providersBackstage.translate(spec.text)
                }
            }
        ]
    });
};
exports.renderAlertBanner = renderAlertBanner;
