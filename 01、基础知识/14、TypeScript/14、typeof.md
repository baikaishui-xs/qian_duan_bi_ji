**作用：** 根据一个变量的值来自动生成对应的类型
  1、简化类型的书写
  2、提高代码维护性

**传统 方式：**
```ts
let demo = { a: 1, b: 2, c: 3 }

function formatPoint(point: { a: number; b: number; c: number }) {}
formatPoint(demo)

let demo1: number // number
```

**typeof 方式**
```ts
let demo = { a: 1, b: 2, c: 3 }

function formatPoint(point: typeof demo) {}
formatPoint(demo)

let demo1: typeof demo.a // number
```