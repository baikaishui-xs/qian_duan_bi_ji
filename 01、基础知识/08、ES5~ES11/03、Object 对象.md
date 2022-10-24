# 知识点：Object 对象

- [知识点：Object 对象](#知识点object-对象)
  - [ES5](#es5)
    - [（1）将属性名转换为数组](#1将属性名转换为数组)
    - [（2）定义属性特性 & 监听属性变化](#2定义属性特性--监听属性变化)
  - [ES6](#es6)
    - [（1）判断两个值是否完全相等](#1判断两个值是否完全相等)
    - [（2）合并对象](#2合并对象)
    - [（3）设置原型对象 / 获取原型对象](#3设置原型对象--获取原型对象)
  - [ES8](#es8)
    - [（1）获取对象所有的 键](#1获取对象所有的-键)
    - [（2）获取对象所有的 值](#2获取对象所有的-值)
    - [（3）Object.entries(对象)](#3objectentries对象)
      - [1、将对象转换为二维数组，一个属性对应一个数组](#1将对象转换为二维数组一个属性对应一个数组)
      - [2、将对象转换为 Map 数据结构](#2将对象转换为-map-数据结构)
  - [ES10](#es10)
    - [（1）将二维数组转换为对象](#1将二维数组转换为对象)

## ES5

### （1）将属性名转换为数组

**方法：** `Object.keys(对象)`

**特性：** `for...in 增强版`

**返回值：** 新数组

**原数据：**
```js
var obj1 = {
    id: 1,
    pname: '小米',
    price: 1999,
    num: 2000
};
```

**处理后：**
```js
var arr = Object.keys(obj1);
console.log(arr);  // ['id', 'pname', 'price', 'num']
```

### （2）定义属性特性 & 监听属性变化
**方法：** `Object.defineProperty(对象, 属性, {特性})`
**参数一：** 定义特性的对象
**参数二：** 属性名
**参数三：** 特性配置项

**特性配置项：**
1、**value：** 属性值
2、**writable：** 是否允许 修改 当前属性。true（允许）；false（不允许）（默认）
3、**enumerable：** 是否允许 遍历 当前属性。true（允许）；false（不允许）（默认）
4、**configurable：** 是否允许 删除 当前属性 或 再次修改该特性。true（允许）；false（不允许）（默认）

**API：**
get()：访问 当前属性后触发
set()：修改 当前属性后触发

```js
var obj2 = {
    id: 1,
    pname: '小米',
    price: 1999
};
// 所有特性 不允许（默认）
Object.defineProperty(obj2, 'address', {
    value: '中国山东蓝翔技校xx单元',
    // writable: false,
    // enumerable: false,
    // configurable: false
});
console.log(obj2);
console.log(Object.keys(obj2));

delete obj2.address;
console.log(obj2);

delete obj2.pname;
console.log(obj2);

// 所有特性 允许
// Object.defineProperty(obj2, 'address', {
//     value: '中国山东蓝翔技校xx单元',
//     writable: true,
//     enumerable: true,
//     configurable: true
// });
// console.log(obj2);
// console.log(Object.keys(obj2));

// delete obj2.address;
// console.log(obj2);

// delete obj2.pname;
// console.log(obj2);
```

## ES6
### （1）判断两个值是否完全相等

**方法：** `Object.is`

**特性：** 类似于 全等，但全等用于两个 NaN 对比时返回的是 true，而 `Object.is` 返回的是 false

**返回值：** （true：完全 相等）（false：不完全 相等）

```js
Object.is(120, 120);  // true
NaN === NaN;  // true
Object.is(NaN, NaN);  // false
```

### （2）合并对象

**方法：** `Object.assign`

**特性：** 如果两个对象的属性重复了，第二个参数会覆盖第一个参数的属性

**返回值：** 新对象

**原数据：**
```js
const config1 = {
    host: 'localhost',
    port: 3306,
    name: 'root',
    pass: 'root',
    test: 'test'
};
const config2 = {
    host: 'http://atguigu.com',
    port: 33060,
    name: 'atguigu.com',
    pass: 'iloveyou',
    test2: 'test2'
}
```

**处理后：**
```js
Object.assign(config1, config2);
/*
host: "http://atguigu.com"
name: "atguigu.com"
pass: "iloveyou"
port: 33060
test: "test"
test2: "test2"
*/
```

### （3）设置原型对象 / 获取原型对象

**作用：** `Object.setPrototypeOf / Object.getPrototypeof`

**原数据：**
```js
const school = {
    name: '尚硅谷'
}
const cities = {
    xiaoqu: ['北京','上海','深圳']
}
```

**处理后：**
```js
Object.setPrototypeOf(school, cities);
console.log(Object.getPrototypeOf(school));
console.log(school);
```

## ES8

### （1）获取对象所有的 键

**方法：** `Object.keys(对象)`

**原数据：**
```js
const school = {
    name:"尚硅谷",
    cities:['北京','上海','深圳'],
    xueke: ['前端','Java','大数据','运维']
};
```

**处理后：**
```js
Object.keys(school);  //  ["name", "cities", "xueke"]
```

### （2）获取对象所有的 值

**方法：** `Object.values(对象)`

**原数据：**
```js
const school = {
    name:"尚硅谷",
    cities:['北京','上海','深圳'],
    xueke: ['前端','Java','大数据','运维']
};
```

**处理后：**
```js
Object.values(school);  // ["尚硅谷", ['北京','上海','深圳'], ['前端','Java','大数据','运维']]
```

### （3）Object.entries(对象)

#### 1、将对象转换为二维数组，一个属性对应一个数组

**原数据：**
```js
const school = {
    name:"尚硅谷",
    cities:['北京','上海','深圳'],
    xueke: ['前端','Java','大数据','运维']
};
```

**处理后：**
```js
Object.entries(school); // [["name", "尚硅谷"], ["cities", Array(3)], ["xueke", Array(4)]]
```

#### 2、将对象转换为 Map 数据结构

**原数据：**
```js
const school = {
    name:"尚硅谷",
    cities:['北京','上海','深圳'],
    xueke: ['前端','Java','大数据','运维']
};
```

**处理后：**
```js
const m = new Map(Object.entries(school));
console.log(m)
```

## ES10

### （1）将二维数组转换为对象

**方法：** `fromEntries`

**原数据：**
```js
let arr = [
    ['name','尚硅谷'],
    ['xueke', 'Java,大数据,前端,云计算']
]
```

**处理后：**
```js
const result = Object.fromEntries(arr);
console.log(result);  // {name: "尚硅谷", xueke: "Java,大数据,前端,云计算"}
```