"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upConfig = void 0;
var alloy_1 = require("@ephox/alloy");
var upConfig = function (item, sharedBackstage) {
    return alloy_1.Tooltipping.config({
        delay: 200,
        exclusive: true,
        lazySink: sharedBackstage.getSink,
        tooltipDom: {
            tag: 'div',
            classes: ['tox-tooltip', 'tox-tooltip--up']
        },
        tooltipComponents: [
            {
                dom: {
                    tag: 'div',
                    classes: ['tox-tooltip__body'],
                    innerHtml: item.text
                }
            },
            {
                dom: {
                    tag: 'i',
                    classes: ['tox-tooltip__arrow']
                }
            }
        ]
    });
};
exports.upConfig = upConfig;
