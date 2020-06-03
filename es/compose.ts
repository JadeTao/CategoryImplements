type fn = (...args: any[]) => any
export const compose = (...fns: fn[]) => fns.reduce((f, g) => (...args: any[]) => f(g(...args)))
