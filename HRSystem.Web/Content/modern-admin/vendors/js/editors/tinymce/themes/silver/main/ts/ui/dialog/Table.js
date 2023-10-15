"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTable = void 0;
var alloy_1 = require("@ephox/alloy");
var katamari_1 = require("@ephox/katamari");
var renderTable = function (spec, providersBackstage) {
    var renderTh = function (text) { return ({
        dom: {
            tag: 'th',
            innerHtml: providersBackstage.translate(text)
        }
    }); };
    var renderHeader = function (header) { return ({
        dom: {
            tag: 'thead'
        },
        components: [
            {
                dom: {
                    tag: 'tr'
                },
                components: katamari_1.Arr.map(header, renderTh)
            }
        ]
    }); };
    var renderTd = function (text) { return ({ dom: { tag: 'td', innerHtml: providersBackstage.translate(text) } }); };
    var renderTr = function (row) { return ({ dom: { tag: 'tr' }, components: katamari_1.Arr.map(row, renderTd) }); };
    var renderRows = function (rows) { return ({ dom: { tag: 'tbody' }, components: katamari_1.Arr.map(rows, renderTr) }); };
    return {
        dom: {
            tag: 'table',
            classes: ['tox-dialog__table']
        },
        components: [
            renderHeader(spec.header),
            renderRows(spec.cells)
        ],
        behaviours: alloy_1.Behaviour.derive([
            alloy_1.Tabstopping.config({}),
            alloy_1.Focusing.config({})
        ])
    };
};
exports.renderTable = renderTable;
