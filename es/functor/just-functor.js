"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fJust = void 0;
var assert_1 = require("assert");
var identity_1 = require("../identity");
var compose_1 = require("../compose");
exports.fJust = function (x) { return x instanceof Function ? (function (v) { return ({ isJust: true, value: x(v.value) }); }) : ({ isJust: true, value: x }); };
/**
 * 同一律
 */
;
(function () {
    assert_1.deepEqual(identity_1.identity(exports.fJust(1)), exports.fJust(identity_1.identity(1)));
})();
/**
 * 结合律
 */
;
(function () {
    var f = function (x) { return x + 1; };
    var g = function (x) { return x * 10; };
    assert_1.deepEqual(exports.fJust(compose_1.compose(f, g))(exports.fJust(1)), compose_1.compose(exports.fJust(f), exports.fJust(g))(exports.fJust(1)));
})();
var JustBox = /** @class */ (function () {
    function JustBox(value) {
        this.value = value;
    }
    JustBox.of = function (v) {
        return new JustBox(v);
    };
    JustBox.prototype.map = function (fn) {
        return JustBox.of(fn(this.value));
    };
    return JustBox;
}());
/*
 * 同一律
 */
;
(function () {
    assert_1.equal(identity_1.identity(JustBox.of(1)).value, JustBox.of(identity_1.identity(1)).value);
})();
/*
 * 结合律
 */
;
(function () {
    var f = function (x) { return x + 1; };
    var g = function (x) { return x * 10; };
    assert_1.equal(JustBox.of(1).map(f).map(g).value, JustBox.of(1).map(compose_1.compose(f, g)).value);
})();
