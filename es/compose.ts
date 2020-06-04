type fn<T> = (...args: Array<T>) => T

export const compose = <T>(...fns: Array<fn<T>>) => fns.reduceRight((f, g) => (...args: T[]) => f(g(...args)))
