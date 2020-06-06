"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("assert");
var identity_1 = require("../identity");
var compose_1 = require("../compose");
var just_functor_1 = require("./just-functor");
var nothing_functor_1 = require("./nothing-functor");
var isNothing = function (x) { return x === undefined || x === null; };
var fMaybe = function (x) { return x instanceof Function ? (function (v) { return v.isJust ? just_functor_1.fJust(v.value) : nothing_functor_1.fNothing(v.value); }) : (isNothing(x) ? nothing_functor_1.fNothing(x) : just_functor_1.fJust(x)); };
/**
 * 同一律
 */
;
(function () {
    assert_1.deepEqual(identity_1.identity(fMaybe(1)), fMaybe(identity_1.identity(1)));
})();
/**
 * 结合律
 */
;
(function () {
    var f = function (x) { return x + 1; };
    var g = function (x) { return x * 10; };
    assert_1.deepEqual(fMaybe(compose_1.compose(f, g))(just_functor_1.fJust(1)), compose_1.compose(fMaybe(f), fMaybe(g))(just_functor_1.fJust(1)));
})();
var MaybeBox = /** @class */ (function () {
    function MaybeBox(value) {
        this.value = value;
        this.isNothing = false;
        this.isNothing = this.shouldBeNothing(value);
    }
    MaybeBox.of = function (v) {
        return new MaybeBox(v);
    };
    MaybeBox.prototype.shouldBeNothing = function (v) {
        return v === undefined || v === null;
    };
    MaybeBox.prototype.map = function (fn) {
        return MaybeBox.of(fn(this.value));
    };
    return MaybeBox;
}());
/*
 * 同一律
 */
;
(function () {
    assert_1.equal(identity_1.identity(MaybeBox.of(1)).value, MaybeBox.of(identity_1.identity(1)).value);
})();
/*
 * 结合律
 */
;
(function () {
    var f = function (x) { return x + 1; };
    var g = function (x) { return x * 10; };
    assert_1.equal(MaybeBox.of(1).map(f).map(g).value, MaybeBox.of(1).map(compose_1.compose(f, g)).value);
})();
