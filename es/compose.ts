type fn = (...args: any[]) => any
export const compose = (...fns: fn[]) => fns.reduceRight((f, g) => (...args: any[]) => f(g(...args)))
