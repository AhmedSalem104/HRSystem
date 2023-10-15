"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SWIPING_LEFT = 1;
var SWIPING_RIGHT = -1;
var SWIPING_NONE = 0;
var init = function (xValue) {
    return {
        xValue: xValue,
        points: []
    };
};
var move = function (model, xValue) {
    if (xValue === model.xValue) {
        return model;
    }
    var currentDirection = xValue - model.xValue > 0 ? SWIPING_LEFT : SWIPING_RIGHT;
    var newPoint = { direction: currentDirection, xValue: xValue };
    var priorPoints = (function () {
        if (model.points.length === 0) {
            return [];
        }
        else {
            var prev = model.points[model.points.length - 1];
            return prev.direction === currentDirection ? model.points.slice(0, model.points.length - 1) : model.points;
        }
    })();
    return {
        xValue: xValue,
        points: priorPoints.concat([newPoint])
    };
};
var complete = function (model) {
    if (model.points.length === 0) {
        return SWIPING_NONE;
    }
    else {
        var firstDirection = model.points[0].direction;
        var lastDirection = model.points[model.points.length - 1].direction;
        return firstDirection === SWIPING_RIGHT && lastDirection === SWIPING_RIGHT ? SWIPING_RIGHT :
            firstDirection === SWIPING_LEFT && lastDirection === SWIPING_LEFT ? SWIPING_LEFT : SWIPING_NONE;
    }
};
exports.default = {
    init: init,
    move: move,
    complete: complete
};
