# 知识点：Set 数据结构

**概念：** 本质上还是数组。区别就是元素是唯一的

**创建：** `const 常量名 = new Set();`
```js
const s = new Set();
```

**初始化：** `const 常量名 = new Set([set元素, set元素, ...]);`
```js
const set = new Set([1, 2, 3, 4, 4])
```

## 一、常用属性

### （一）获取 成员个数
```js
  s.size;  // 4
```

## 二、常用方法

`const s1 = new Set();`

### （一）添加 set 元素

**方法：** `set数据.add()`

**特性：** 允许链式编程

```js
s.add(1).add(2).add(3);
```

### （二）删除 set 元素

**方法：** `set数据.delete(元素)`

```js
s.delete(2)
```

### （三）查找 set 元素

**方法：** `set数据.has(元素)`

**返回值：** 布尔值（true：存在；false：不存在）

```js
console.log(s.has(1));  // true
```

### （四）删除所有 set 元素

**方法：** `set数据.clear()`

```js
s.clear()
```

### （五）遍历 set 元素

**方法：** `set数据.forEach(当前 set 元素 => 函数体)`

```js
s.forEach(value => console.log(value))
```

## 三、使用场景
```js
let arr = [1, 2, 3, 4, 5, 4, 3, 2, 1];
```

### （一）数组去重
```js
let result = [...new Set(arr)];  // [1, 2, 3, 4, 5]
```

### （二）交集（两个数组中，都存在的成员）
```js
let arr1 = [4, 5, 6, 7];
let result1 = result.filter(item => new Set(arr1).has(item));  // [4, 5]
```

### （三）并集（合并两个数组中的成员，并去重）
```js
let union = [new Set([...arr, ...arr1])]  // [1, 2, 3, 4, 5, 6, 7]
```

### （四）差集（两个数组中，只有一个数组存在这个成员）
```js
let a1 = [1, 2, 3, 4, 5];
let a2 = [3, 4, 5, 6, 7];
// 求 a1 的差集
let diff = [...new Set(a1)].filter(item => !(new Set(a2).has(item)))
console.log(diff);  // [1, 2]
```

# demo
```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>集合</title>
</head>
<body>
    <script>
    // 知识点：Set 数据结构

    // 作用：类似数组，但成员是唯一的
    // 特性：
        // 1、成员有重复的，会被删除
        // 2、本身是一个对象

    // 创建：const 常量名 = new Set();
    const s = new Set();

    // 初始化：const 常量名 = new Set([set元素, set元素, ...]);
    const set = new Set([1, 2, 3, 4, 4])

    // 常用属性：

        // 获取 成员个数
        s.size;  // 4

    // 常用方法：

        const s1 = new Set();

        // （1）添加 set 元素
        // 方法：set数据.add()
        // 特性：允许链式编程
        s.add(1).add(2).add(3);

        // （2）删除 set 元素
        // 方法：set数据.delete(元素)
        s.delete(2)

        // （3）查找 set 元素
        // 方法：set数据.has(元素)
        // 返回值：布尔值（true：存在；false：不存在）
        console.log(s.has(1));  // true

        // （4）删除所有 set 元素
        // 方法：set数据.clear()
        // s.clear()

        // （5）遍历 set 元素
        // 方法：set数据.forEach(当前 set 元素 => 函数体)
        s.forEach(value => console.log(value))

    // --------------------------------------------

        let arr = [1, 2, 3, 4, 5, 4, 3, 2, 1];

        // （1）数组去重
        let result = [...new Set(arr)];  // [1, 2, 3, 4, 5]

        // （2）交集（两个数组中，都存在的成员）
        let arr1 = [4, 5, 6, 7];
        let result1 = result.filter(item => new Set(arr1).has(item));  // [4, 5]
        
        // （3）并集（合并两个数组中的成员，并去重）
        let union = [new Set([...arr, ...arr1])]  // [1, 2, 3, 4, 5, 6, 7]

        // （4）差集（两个数组中，只有一个数组存在这个成员）
        let a1 = [1, 2, 3, 4, 5];
        let a2 = [3, 4, 5, 6, 7];
        // 求 a1 的差集
        let diff = [...new Set(a1)].filter(item => !(new Set(a2).has(item)))
        console.log(diff);  // [1, 2]

    </script>
</body>
</html>
```