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
`mappable`、`chainable`是对象、容器、数据结构。`functor`是`mapping`，是从一个范畴到另一个范畴的态射，是函数。  
   `mappable`和`chainable`的接口：

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
`mappable`按照字面意思来说是可`map`的、实现`map`方法的一种封装的数据结构，
一些函数式编程语言或者工具习惯把实现`chainable`接口的`F`叫做`functor`，实际上这种`map(f).map(g)`链式调用只是语法层面的优化。  
把`F`称为`functor`存在概念上的误差和偏移 - `F`只是对`functor`的应用，它不是`functor`,真正的`functor`是`F`上的`map`方法。如上所述，是`map`在转换范畴。  

