"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fNothing = void 0;
var assert_1 = require("assert");
var identity_1 = require("../identity");
var compose_1 = require("../compose");
exports.fNothing = function (x) { return x instanceof Function ? (function (v) { return ({ isNothing: true }); }) : ({ isNothing: true }); };
/**
 * 同一律
 */
;
(function () {
    assert_1.deepEqual(identity_1.identity(exports.fNothing(1)), exports.fNothing(identity_1.identity(1)));
})();
/**
 * 结合律
 */
;
(function () {
    var f = function (x) { return x + 1; };
    var g = function (x) { return x * 10; };
    assert_1.deepEqual(exports.fNothing(compose_1.compose(f, g))(exports.fNothing(1)), compose_1.compose(exports.fNothing(f), exports.fNothing(g))(exports.fNothing(1)));
})();
var NothingBox = /** @class */ (function () {
    function NothingBox(value) {
        this.value = value;
    }
    NothingBox.of = function (v) {
        return new NothingBox(v);
    };
    NothingBox.prototype.map = function (fn) {
        return NothingBox.of(fn(this.value));
    };
    return NothingBox;
}());
/*
 * 同一律
 */
;
(function () {
    assert_1.equal(identity_1.identity(NothingBox.of(1)).value, NothingBox.of(identity_1.identity(1)).value);
})();
/*
 * 结合律
 */
;
(function () {
    var f = function (x) { return x + 1; };
    var g = function (x) { return x * 10; };
    assert_1.equal(NothingBox.of(1).map(f).map(g).value, NothingBox.of(1).map(compose_1.compose(f, g)).value);
})();
