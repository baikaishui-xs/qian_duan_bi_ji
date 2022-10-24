# 知识点：BigInt（大整数）数据结构

**作用：** 进行大数值的运算，解决 超过最大安全整数结果就会有误差 的问题

**使用步骤：** 在整数的数字后面加上 n

```js
let n = 521n; 
n, typeof(n);  // 521n "bigint"

// BigInt(普通的整数)
// 作用：将普通整数转换为大整数
// 特性：不能转换浮点型的数
let n = 123;
BigInt(n);  // 123n
BigInt(1.2);  // 报错

// Number.MAX_SAFE_INTEGER：最大安全整数
let max = Number.MAX_SAFE_INTEGER;  // 9007199254740991

// 超过最大安全整数结果就会有误差
max + 1;  // 9007199254740992
max + 2;  // 9007199254740992
max + 3;  // 9007199254740994

// 特性：大整数 不能和普通的 整数 做运算
BigInt(max)  + 1  // 报错

// 解决方法：把整数转换为大整数
BigInt(max) + BigInt(1)  // 9007199254740992n
BigInt(max) + BigInt(2)  // 9007199254740993n
```

# demo
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BigInt</title>
</head>
<body>
    <script>
        // 知识点：BigInt（大整数） 数据结构
        // 作用：进行大数值的运算，解决 超过最大安全整数结果就会有误差 的问题
        // 使用步骤：在整数的数字后面加上 n

        let n = 521n; 
        n, typeof(n);  // 521n "bigint"

        // BigInt(普通的整数)
        // 作用：将普通整数转换为大整数
        // 特性：不能转换浮点型的数
        let n = 123;
        BigInt(n);  // 123n
        BigInt(1.2);  // 报错

        // Number.MAX_SAFE_INTEGER：最大安全整数
        let max = Number.MAX_SAFE_INTEGER;  // 9007199254740991

        // 超过最大安全整数结果就会有误差
        max + 1;  // 9007199254740992
        max + 2;  // 9007199254740992
        max + 3;  // 9007199254740994

        // 特性：大整数 不能和普通的 整数 做运算
        BigInt(max)  + 1  // 报错

        // 解决方法：把整数转换为大整数
        BigInt(max) + BigInt(1)  // 9007199254740992n
        BigInt(max) + BigInt(2)  // 9007199254740993n
    </script>
</body>
</html>
```