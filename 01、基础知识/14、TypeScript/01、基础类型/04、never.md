**表示：** 函数不会有返回值

**使用场景：** 死循环、抛出异常、防止后期为参数新增类型注解时，没有对该类型进行特殊处理的问题

```ts
function foo(): never { // 死循环
  while(true) {}
}
function bar(): never { // 抛出异常
  throw new Error()
}  
```

```ts
function hello(name: string | number) { // 创建函数
  switch (typeof name) {
    case 'string':
      console.log('string 特殊处理')
      break
    case 'number':
      console.log('number 特殊处理')
      break
  }
}

function hello(name: string | number | boolean) { // 后期因为功能需求新增了一个参数，但是忘记给这个参数进行错误处理了，虽然运行时可能不会报错，但会导致这个代码不健壮
  switch (typeof name) {
    case 'string':
      console.log('string 特殊处理')
      break
    case 'number':
      console.log('number 特殊处理')
      break
  }
}

function hello(name: string | number | boolean) { // 防止后期为参数新增类型注解时，没有对该类型进行特殊处理的问题
  switch (typeof name) {
    case 'string':
      console.log('string 特殊处理')
      break
    case 'number':
      console.log('number 特殊处理')
    default:
      const check: never = name
  }
}
```