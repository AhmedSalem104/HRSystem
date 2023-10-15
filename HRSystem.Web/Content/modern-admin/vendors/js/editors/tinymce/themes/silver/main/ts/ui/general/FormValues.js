"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toValuesOrDefaults = exports.extract = exports.toValidValues = void 0;
var alloy_1 = require("@ephox/alloy");
var boulder_1 = require("@ephox/boulder");
var katamari_1 = require("@ephox/katamari");
var toValidValues = function (values) {
    var errors = [];
    var result = {};
    katamari_1.Obj.each(values, function (value, name) {
        value.fold(function () {
            errors.push(name);
        }, function (v) {
            result[name] = v;
        });
    });
    return errors.length > 0 ? katamari_1.Result.error(errors) :
        katamari_1.Result.value(result);
};
exports.toValidValues = toValidValues;
var toValuesOrDefaults = function (optionValues, defaults) {
    var r = {};
    katamari_1.Obj.each(optionValues, function (v, k) {
        v.each(function (someValue) {
            r[k] = someValue;
        });
    });
    return katamari_1.Merger.deepMerge(defaults, r);
};
exports.toValuesOrDefaults = toValuesOrDefaults;
var isValueHolder = function (v) { return boulder_1.Objects.hasKey(v, 'value') && boulder_1.Objects.hasKey(v, 'text'); };
var extract = function (form) {
    var rawValues = alloy_1.Representing.getValue(form);
    var values = toValidValues(rawValues);
    return values.fold(function (errs) {
        return katamari_1.Future.pure(katamari_1.Result.error([]));
    }, function (vs) {
        var keys = katamari_1.Obj.keys(vs);
        var validations = katamari_1.Arr.map(keys, function (key) {
            var field = alloy_1.Form.getField(form, key).getOrDie('Could not find field: ' + key);
            return field.hasConfigured(alloy_1.Invalidating) ? alloy_1.Invalidating.run(field).map(katamari_1.Result.value) : katamari_1.Future.pure(katamari_1.Result.value(true));
        });
        return katamari_1.Futures.par(validations).map(function (answers) {
            var partition = katamari_1.Results.partition(answers);
            return partition.errors.length > 0 ? katamari_1.Result.error(partition.errors) : katamari_1.Result.value(katamari_1.Obj.map(vs, function (v) {
                return isValueHolder(v) ? v.value : v;
            }));
        });
    });
};
exports.extract = extract;
