import { deepEqual } from 'assert'
import { identity } from '../identity'

export class Functor {

  static of(v: any): Functor {
    return new Functor(v)
  }

  constructor(public value: any) { }

  map = <U>(fn: (v: any) => U) => {
    this.value = fn(this.value)
  }
}




// 同一律
; (() => {
  const v1 = Functor.of(1)
  const v2 = Functor.of(1)
  const f = (v: number) => v + 1;

  v1.map(f)
  v2.map(identity(f))

  deepEqual(
    identity(v1).value,
    v2.value
  )
})();

// 交换律
; (() => {
  const v1 = Functor.of(1)
  const v2 = Functor.of(1)
  const f = (v: number) => v + 1;
  const g = (v: number) => v * 10;

  v1.map(g)
  v1.map(f)
  v2.map(x => f(g(x)))

  deepEqual(
    v1.value,
    v2.value
  )
})();