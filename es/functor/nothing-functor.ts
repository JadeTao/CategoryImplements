import { deepEqual, equal } from "assert"
import { identity } from "../identity"
import { compose } from "../compose";

/**
 * Nothing Functor
 */

export interface Nothing<T> {
  isNothing: true;
}

export interface NothingFunctor {
  <T>(x: (v: T) => T): (v: Nothing<T>) => Nothing<T>;
  <T>(x: T): Nothing<T>;
}

export const fNothing: NothingFunctor = (x: any): any => x instanceof Function ? ((v: any) => ({ isNothing: true })) : ({ isNothing: true });

/**
 * 同一律
 */
; (() => {
  deepEqual(
    identity(fNothing(1)),
    fNothing(identity(1))
  )
})();
/**
 * 结合律
 */
; (() => {
  const f = (x: number) => x + 1;
  const g = (x: number) => x * 10;
  deepEqual(
    fNothing(compose<number>(f, g))(fNothing(1)),
    compose(fNothing(f), fNothing(g))(fNothing(1))
  )
})();

class NothingBox<T> {
  public static of<P>(v: P): NothingBox<P> {
    return new NothingBox(v);
  }
  constructor(public value: T) { }

  public map<N>(fn: (v: T) => N): NothingBox<N> {
    return NothingBox.of(fn(this.value))
  }
}

/*
 * 同一律
 */
; (() => {
  equal(identity(NothingBox.of(1)).value, NothingBox.of(identity(1)).value)
})();

/*
 * 结合律
 */
; (() => {
  const f = (x: number) => x + 1;
  const g = (x: number) => x * 10;
  equal(
    NothingBox.of(1).map(f).map(g).value,
    NothingBox.of(1).map(compose(f, g)).value,
  )
})();