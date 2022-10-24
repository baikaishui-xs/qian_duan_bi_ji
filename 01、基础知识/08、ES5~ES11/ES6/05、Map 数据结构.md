# 知识点：Map 数据结构

**概念：** 本质上还是对象。区别就是属性名可以是任何数据类型

## 一、创建 Map
```js
let m = new Map();
```

## 二、添加成员
**对象作为属性名**
```js
let key = {
  school : 'ATGUIGU'
};
m.set(key, ['北京','上海','深圳']); // 'ATGUIGU': ['北京','上海','深圳']
```

## 三、方法

### （一）属性个数
```js
m.size;  // 1
```

### （二）删除属性
```js
m.delete('name');
```

### （三）获取属性值
```js
m.get(key);  // ['北京','上海','深圳']
```

### （四）清空属性
```js
m.clear();
```

### （五）遍历
```js
for(let v of m){
  console.log(v);
}
```

# demo
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Map</title>
</head>
<body>
    <script>
        // 知识点：Map 数据结构
        // 特性：
            // 1、类似对象，但属性名不限于字符串，任何类型都可以作为属性
            // 2、本身是一个对象

        // 创建 Map
            let m = new Map();

        // 添加成员

            // 对象作为属性名
            let key = {
                school : 'ATGUIGU'
            };
            m.set(key, ['北京','上海','深圳']); // 'ATGUIGU': ['北京','上海','深圳']

        // 属性个数
            m.size;  // 1

        // 删除属性
            // m.delete('name');

        // 获取属性值
            m.get(key);  // ['北京','上海','深圳']

        // 清空属性
            // m.clear();

        //遍历
            for(let v of m){
                console.log(v);
            }

    </script>
</body>
</html>
```