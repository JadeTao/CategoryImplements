import { deepEqual, equal } from "assert"
import { identity } from "../identity"
import { compose } from "../compose";

/**
 * Just Functor
 */

export interface Just<T> {
  value: T;
  isJust: true;
}

export interface JustFunctor {
  <T>(x: (v: T) => T): (v: Just<T>) => Just<T>;
  <T>(x: T): Just<T>;
}


export const fJust: JustFunctor = (x: any): any => x instanceof Function ? ((v: any) => ({ isJust: true, value: x(v.value) })) : ({ isJust: true, value: x });

/**
 * 同一律
 */
; (() => {
  deepEqual(
    identity(fJust(1)),
    fJust(identity(1))
  )
})();
/**
 * 结合律
 */
; (() => {
  const f = (x: number) => x + 1;
  const g = (x: number) => x * 10;

  deepEqual(
    fJust(compose<number>(f, g))(fJust(1)),
    compose(fJust(f), fJust(g))(fJust(1))
  )
})();


class JustBox<T> {
  public static of<P>(v: P): JustBox<P> {
    return new JustBox(v);
  }
  constructor(public value: T) { }

  public map<N>(fn: (v: T) => N): JustBox<N> {
    return JustBox.of(fn(this.value))
  }
}

/*
 * 同一律
 */
; (() => {
  equal(identity(JustBox.of(1)).value, JustBox.of(identity(1)).value)
})();

/*
 * 结合律
 */
; (() => {
  const f = (x: number) => x + 1;
  const g = (x: number) => x * 10;
  equal(
    JustBox.of(1).map(f).map(g).value,
    JustBox.of(1).map(compose(f, g)).value,
  )
})();