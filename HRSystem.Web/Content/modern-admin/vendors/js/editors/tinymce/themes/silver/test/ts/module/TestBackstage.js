"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katamari_1 = require("@ephox/katamari");
var TestProviders_1 = require("./TestProviders");
function default_1(sink) {
    var anchorFn = function () {
        return {
            anchor: 'hotspot',
            hotspot: sink
        };
    };
    return {
        shared: {
            providers: TestProviders_1.default,
            interpreter: katamari_1.Fun.identity,
            anchors: {
                toolbar: anchorFn,
                toolbarOverflow: anchorFn,
                banner: anchorFn,
                cursor: anchorFn,
                node: anchorFn
            },
            getSink: function () { return katamari_1.Result.value(sink); }
        },
        urlinput: {
            getHistory: function () { return []; },
            addToHistory: function () { },
            getLinkInformation: function () { return katamari_1.Option.none(); },
            getValidationHandler: function () { return katamari_1.Option.none(); },
            getUrlPicker: function (filetype) { return katamari_1.Option.some(function (entry) {
                return katamari_1.Future.pure(entry);
            }); }
        },
        dialog: {
            isDraggableModal: function () { return false; }
        }
    };
}
exports.default = default_1;
