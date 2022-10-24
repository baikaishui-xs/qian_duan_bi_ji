# 知识点：rest 参数

**作用：** 用于获取函数的实参，替代了 ES5 的 arguments

**特性：**
1. arguments 是以 对象 的形式存储，rest 是以 数组 的形式存储
2. 如果有别的参数，rest 参数必须放在最后

**优点：** 允许使用数组方法

**语法：** 在形参里使用 ...标识符

```js
function fn(a, b, ...args){
    console.log(a);
    console.log(b);
    console.log(args);  // [3, 4, 5, 6]
}
fn(1,2,3,4,5,6);
```

# demo
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>rest参数</title>
</head>
<body>
    <script>
        // 知识点：rest 参数
        // 作用：用于获取函数的实参，替代了 ES5 的 arguments
        // 特性：
            // 1、arguments 是以 对象 的形式存储，rest 是以 数组 的形式存储
            // 2、如果有别的参数，rest 参数必须放在最后
        // 优点：允许使用数组方法
        // 语法：在形参里使用 ...标识符

        function fn(a, b, ...args){
            console.log(a);
            console.log(b);
            console.log(args);  // [3, 4, 5, 6]
        }
        fn(1,2,3,4,5,6);

    </script>
</body>
</html>
```