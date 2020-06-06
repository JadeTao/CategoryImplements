# Functor 函子

## context

### 范畴

一类值和这些值之间态射的集合

### 纯函数

满足以下要求的函数

1.  幂等的，即输入值相同时，输出值相同
2.  无语义上可观察的副作用，如触发事件、进行 I/O、更改其它值等

### identity

```javascript
const identity = (x) => x;
```

### compose

```javascript
compose(f, g) = (x) => g(f(x));
```

### 同一律

`F` - `functor`
`x` - `object`

```
identity(F(x)) === F(identity(x))
```

### 结合律

`F` - `functor`
`f` `g` - 函数（态射）

```
F(compose(f, g)) === compose(F(f), F(g))
```

## 定义

范畴学中，`functor` 是从一个范畴到另一个范畴的 `mapping`（语出 wiki）。遵守同一律和交换律。

## Q&A

### `mappable` `chainable`是`functor`吗？
是也不是。  

先看一下`mappable`和`chainable`的接口：

```typescript
interface mappable<T> {
  value: T;
  map: (v: T) => any;
}

interface chainable<T> {
  value: T;
  map: (v: T) => chainable<T>;
}
```

一些教程喜欢把`functor`比喻为`mappable`  
`mappable`按照字面意思来说是可`map`的、实现`map`方法的一种封装的数据结构，当一个`mappable`的`map`返回值也是`mappable`时，它就是`chainable`，即支持`map(f).map(g)`。这种链式调用只是语法层面的优化。  
严格来说，`mappable`、`chainable`是对象、容器、数据结构。`functor`是`mapping`，是从一个范畴到另一个范畴的态射，是函数。 因此`mappable`、`chainable`不是`functor`。  
妥协一点，`functor`实现两个范畴之间值和映射的转换，而`mappable`、`chainable`通过构造函数或静态工厂方法实现了值从原来范畴到`mappable`、`chainable`范畴的转换，通过`map`函数实现了映射的范畴转换，所以只要它准守同一律和结合律，也可以被看成另一种形态的`functor`。  
唯一的问题是如果你肤浅地只把这种`mappable`、`chainable`当作`functor`，你会特别难以理解`endofunctor`自函子。


