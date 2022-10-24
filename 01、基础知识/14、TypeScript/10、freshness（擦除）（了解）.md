**特性：** 当赋值给声明类型注解的变量是一个引用类型地址时，TypeScript 会自动将赋值变量中多余的成员进行擦除，也就是不进行类型检测，当这个多余的成员不存在。但是赋值后再使用这个多余的成员还是会报错

**问题：** 将一个对象赋值给 变量a，在将这个 变量a 赋值给另一个声明类型注解的 变量b，变量a 中成员的长度大于 变量b 的长度，但并没有报错
```ts
interface IPerson {
  name: string
  age: number
}

const a = {
  name: 'why',
  age: 18,
  address: '广州市'
}

const b: IPerson = a // 类型注解的长度不一样，但并没有报错。因为 freshness 的特性导致的

function printInfo(person: IPerson) {
  console.log(person)
  console.log(person.address) // 报错
}

printInfo(b)
```