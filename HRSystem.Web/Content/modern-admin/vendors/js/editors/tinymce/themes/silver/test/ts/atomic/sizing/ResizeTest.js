"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agar_1 = require("@ephox/agar");
var bedrock_1 = require("@ephox/bedrock");
var katamari_1 = require("@ephox/katamari");
var Resize_1 = require("tinymce/themes/silver/ui/sizing/Resize");
var mockEditor = function (containerHeight, contentAreaHeight) {
    var settings = {
        min_height: 400,
        max_height: 600,
        min_width: 400,
        max_width: 600,
    };
    return {
        settings: settings,
        getParam: function (param, fallback, type) { return settings[param]; },
        getContainer: function () { return ({ offsetHeight: containerHeight }); },
        getContentAreaContainer: function () { return ({ offsetHeight: contentAreaHeight }); }
    };
};
bedrock_1.UnitTest.asynctest('Editor resizing tests', function (success, failure) {
    var makeCappedSizeTest = function (label, originalSize, delta, minSize, maxSize, expected) {
        return agar_1.Logger.t(label, agar_1.Step.sync(function () {
            var actual = (0, Resize_1.calcCappedSize)(originalSize, delta, katamari_1.Option.some(minSize), katamari_1.Option.some(maxSize));
            agar_1.Assertions.assertEq('Editor size should match expected', expected, actual);
        }));
    };
    var makeDimensionsTest = function (label, topDelta, leftDelta, resizeType, width, expected) {
        return agar_1.Logger.t(label, agar_1.Step.sync(function () {
            var containerHeight = 500;
            var chromeHeight = 100;
            var editor = mockEditor(containerHeight, containerHeight - chromeHeight);
            var deltas = { top: function () { return topDelta; }, left: function () { return leftDelta; } };
            var actual = (0, Resize_1.getDimensions)(editor, deltas, resizeType, containerHeight, width);
            agar_1.Assertions.assertEq('Dimensions should match expected', expected, actual);
        }));
    };
    var cappedSizeTests = agar_1.Log.stepsAsStep('TBA', 'Check editor size stays within min and max bounds', [
        makeCappedSizeTest('Within bounds', 500, 50, 250, 600, 550),
        makeCappedSizeTest('Small delta makes editor less than min size', 250, -50, 250, 600, 250),
        makeCappedSizeTest('Large delta makes editor less than min size', 500, -500, 250, 600, 250),
        makeCappedSizeTest('Original is too small for delta to make editor big enough', 50, 50, 250, 600, 250),
        makeCappedSizeTest('Large delta makes editor more than max size', 50, 600, 250, 600, 600),
        makeCappedSizeTest('Small delta makes editor more than max size', 550, 100, 250, 600, 600),
        makeCappedSizeTest('Original is too big', 650, 50, 250, 600, 600)
    ]);
    var getDimensionsTests = agar_1.Log.stepsAsStep('TBA', 'Check the correct dimensions are returned', [
        makeDimensionsTest('No change', 0, 0, Resize_1.ResizeTypes.Both, 500, { height: 500, width: 500 }),
        makeDimensionsTest('Within bounds', 50, 50, Resize_1.ResizeTypes.Both, 500, { height: 550, width: 550 }),
        makeDimensionsTest('Height less than minimum, only vertical resize', -500, 0, Resize_1.ResizeTypes.Vertical, 500, { height: 400 }),
        makeDimensionsTest('Height greater than maximum, only vertical resize', 500, 0, Resize_1.ResizeTypes.Vertical, 500, { height: 600 }),
        makeDimensionsTest('Height less than minimum, both resize, OK width change', -500, 50, Resize_1.ResizeTypes.Both, 500, { height: 400, width: 550 }),
        makeDimensionsTest('Height greater than maximum, both resize, OK width change', 500, 50, Resize_1.ResizeTypes.Both, 500, { height: 600, width: 550 }),
        makeDimensionsTest('Width less than minimum, no height change', 0, -500, Resize_1.ResizeTypes.Both, 500, { height: 500, width: 400 }),
        makeDimensionsTest('Width more than maximum, no height change', 0, 500, Resize_1.ResizeTypes.Both, 500, { height: 500, width: 600 }),
        makeDimensionsTest('Both less than minimum', -500, -500, Resize_1.ResizeTypes.Both, 500, { height: 400, width: 400 }),
        makeDimensionsTest('Both more than maximum', 500, 500, Resize_1.ResizeTypes.Both, 500, { height: 600, width: 600 }),
    ]);
    agar_1.Pipeline.async({}, [
        cappedSizeTests,
        getDimensionsTests
    ], function () {
        success();
    }, failure);
});
