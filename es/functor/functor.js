"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var identity_1 = require("../identity");
var assert_1 = require("assert");
var compose_1 = require("../compose");
var F = function (x) { return x instanceof Function ? x : "" + x; };
/*
 * 同一律
 */
;
(function () {
    assert_1.equal(identity_1.identity(F(1)), F(identity_1.identity(1)));
})();
/*
 * 结合律
 */
;
(function () {
    var f = function (x) { return x + 1; };
    var g = function (x) { return x * 10; };
    assert_1.equal(F(compose_1.compose(f, g))('1'), compose_1.compose(F(f), F(g))('1'));
})();
var Box = /** @class */ (function () {
    function Box(value) {
        this.value = value;
    }
    Box.of = function (v) {
        return new Box(v);
    };
    Box.prototype.map = function (fn) {
        return Box.of(fn(this.value));
    };
    return Box;
}());
/*
 * 同一律
 */
;
(function () {
    assert_1.equal(identity_1.identity(Box.of(1)).value, Box.of(identity_1.identity(1)).value);
})();
/*
 * 结合律
 */
;
(function () {
    var f = function (x) { return x + 1; };
    var g = function (x) { return x * 10; };
    assert_1.equal(Box.of(1).map(f).map(g).value, Box.of(1).map(compose_1.compose(f, g)).value);
})();
