# endofunctor 自函子

## 含义
自函子是将一个范畴映射到相同范畴的函子。

## Q&A

### 非`chainable`的`mappable`是自函子吗？

妥协地说  

`mappable` 是函子，不是自函子  

### `chainable`是自函子吗？

妥协地说  

`chainable` 是函子，是自函子  

### 还有什么自函子？

`const f = x => x`: 是的，我就是。我还是`identity`  
`const f = (x: number) => x + 1`: 是的，我也是。我还是`number`范畴里的一个映射。
