当使用 ref 时没有传递参数，最好声明类型，如果不声明则默认推断为 any

```ts
let counter = ref(100)
  // 类型推断为 number。最后会解析成以下形式
let counter = ref<number>(100)

let counter = ref() // 不传递参数时，类型推断为 any

let counter = ref<number>() // 不传递参数时，最好声明类型
```