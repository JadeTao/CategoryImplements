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

### 交换律

`F` - `functor`
`f` `g` - 函数（态射）

```
F(compose(f, g)) === compose(F(f), F(g))
```

## 定义

范畴学中，`functor` 是从一个范畴到另一个范畴的 `mapping`（语出 wiki）。遵守同一律和交换律。

## Q&A

### `functor`是`mappable` `chainable`吗？
不是。  
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
`mappable`按照字面意思来说即可`map`的、实现`map`方法的一种封装的数据结构，在这称这种数据结构为`F`  
`mappable`并未对`map`方法的返回值进行限制，返回值有三种情况：  

- 无返回值。此时的调用方式：`F.map(x => x + 1); F.map(x => x + 1)`。这样`map`实现了从`F`范畴到空范畴的转换，空范畴没有实际意义。
- 更新后内部值`value`并返回。此时调用方式跟上面相同，实现了从`F`范畴到`T`范畴的转换。这种情况既没有调用上的优化，又没有封装的意义。
- 返回`mappable`。此时的调用方式：`F.map(x => x + 1).map(x => x + 1)`，通过返回`this`或另一个`mappable`示例实现了链式调用，这种情况也叫做`chainable`。实现了从`F`范畴到`F`范畴的转换。这种情况才是比较实用且常见的封装。  

一些函数式编程语言或者工具习惯把实现`chainable`接口的`F`叫做`functor`，实际上这种`map(f).map(g)`链式调用只是语法层面的优化。  
把`F`称为`functor`存在概念上的误差和偏移 - `F`只是对`functor`的应用，它不是`functor`,真正的`functor`是`F`上的`map`方法。如上所述，是`map`在转换范畴。  

