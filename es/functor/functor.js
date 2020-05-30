"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Functor = void 0;
var assert_1 = require("assert");
var identity_1 = require("../identity");
var Functor = /** @class */ (function () {
    function Functor(value) {
        var _this = this;
        this.value = value;
        this.map = function (fn) {
            _this.value = fn(_this.value);
        };
    }
    Functor.of = function (v) {
        return new Functor(v);
    };
    return Functor;
}());
exports.Functor = Functor;
// 同一律
;
(function () {
    var v1 = Functor.of(1);
    var v2 = Functor.of(1);
    var f = function (v) { return v + 1; };
    v1.map(f);
    v2.map(identity_1.identity(f));
    assert_1.deepEqual(identity_1.identity(v1).value, v2.value);
})();
// 交换律
;
(function () {
    var v1 = Functor.of(1);
    var v2 = Functor.of(1);
    var f = function (v) { return v + 1; };
    var g = function (v) { return v * 10; };
    v1.map(g);
    v1.map(f);
    v2.map(function (x) { return f(g(x)); });
    assert_1.deepEqual(v1.value, v2.value);
})();
