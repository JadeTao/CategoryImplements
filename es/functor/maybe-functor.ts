import { deepEqual, equal } from "assert"
import { identity } from "../identity"
import { compose } from "../compose";
import { Just, fJust } from "./just-functor";
import { Nothing, fNothing } from "./nothing-functor";


type Maybe<T> = Just<T> | Nothing<T>
interface MaybeFunctor {
  <T>(x: (v: T) => T): (v: Maybe<T>) => Maybe<T>;
  <T>(x: T): Maybe<T>;
}

const isNothing = (x: any): boolean => x === undefined || x === null

const fMaybe: MaybeFunctor = (x: any): any => x instanceof Function ? ((v: any) => v.isJust ? fJust(v.value) : fNothing(v.value)) : (isNothing(x) ? fNothing(x) : fJust(x));

/**
 * 同一律
 */
; (() => {
  deepEqual(
    identity(fMaybe(1)),
    fMaybe(identity(1))
  )
})();
/**
 * 结合律
 */
; (() => {
  const f = (x: number) => x + 1
  const g = (x: number) => x * 10
  deepEqual(
    fMaybe(compose<number>(f, g))(fJust(1)),
    compose(fMaybe(f), fMaybe(g))(fJust(1))
  )
})();

class MaybeBox<T> {
  public static of<P>(v: P): MaybeBox<P> {
    return new MaybeBox(v)
  }
  public isNothing: boolean = false

  constructor(public value: T) {
    this.isNothing = this.shouldBeNothing(value)
  }

  private shouldBeNothing(v: any): boolean {
    return v === undefined || v === null
  }

  public map<N>(fn: (v: T) => N): MaybeBox<N> {
    return MaybeBox.of(fn(this.value))
  }
}

/*
 * 同一律
 */
; (() => {
  equal(identity(MaybeBox.of(1)).value, MaybeBox.of(identity(1)).value)
})();

/*
 * 结合律
 */
; (() => {
  const f = (x: number) => x + 1;
  const g = (x: number) => x * 10;
  equal(
    MaybeBox.of(1).map(f).map(g).value,
    MaybeBox.of(1).map(compose(f, g)).value,
  )
})();