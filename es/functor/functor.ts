import { identity } from "../identity";
import { equal } from "assert";
import { compose } from "../compose";

/*
 * F is a functor!
 */
interface functor {
  (x: (v: number) => number): (v: number) => number;
  (x: number): number;
}

const F: functor = (x: any): any => x instanceof Function ? x : `${x}`;

/*
 * 同一律
 */
; (() => {
  equal(identity(F(1)), F(identity(1)))
})();

/*
 * 交换律
 */
; (() => {
  const f = (x: number) => x + 1;
  const g = (x: number) => x * 10;
  equal(
    F(compose(f, g))(1),
    compose(F(f), F(g))(1)
  )
})();


class Box<T> {
  public static of<P>(v: P): Box<P> {
    return new Box(v);
  }
  constructor(public value: T) { }

  public map<N>(fn: (v: T) => N): Box<N> {
    return Box.of(fn(this.value))
  }
}

/*
 * 同一律
 */
; (() => {
  equal(identity(Box.of(1)).value, Box.of(identity(1)).value)
})();

/*
 * 交换律
 */
; (() => {
  const f = (x: number) => x + 1;
  const g = (x: number) => x * 10;
  equal(
    Box.of(1).map(f).map(g).value,
    Box.of(1).map(compose(f, g)).value,
  )
})();