**表示：** 限制数组的 长度、类型

**特性：**
1、必须初始化
2、可以使用 push 来添加元素，但是只能添加声明好的类型

**解决：** 数组中不推荐写多个类型、无法指定长度的问题

```js
const hello: [number, number, boolean] = [22, 20, true]
hello.push(22)
```