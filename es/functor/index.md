# Functor 函子

## context

### 范畴

一类值和这些值之间转换函数的集合

### 纯函数

满足以下要求的函数

1.  幂等的，即输入值相同时，输出值相同
2.  无语义上可观察的副作用，如触发事件、进行 I/O、更改其它值等

### identity

```javascript
const identity = (v) => v;
```

### 同一律

```
identity(map(f)) === map(identity(f))
```

### 交换律

```
map((x)=>f(g(x))) === map(g).map(f)
```

## 定义

范畴学中，`functor` 是从一个范畴到另一个范畴的 `mapping`。  
函数式编程中， `functor` 是一种方便操作数据的数据结构，是对值的包装，并实现了`map`函数接收纯函数以变更内部值。

无论是`mapping`还是数据结构的`map`函数都要遵守同一律和交换律。

这里给出函数式编程意义上`functor`的实现。
