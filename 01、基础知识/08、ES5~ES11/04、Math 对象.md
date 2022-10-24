# 知识点：Math 对象

- [知识点：Math 对象](#知识点math-对象)
  - [一、解决浮点数运算误差的问题](#一解决浮点数运算误差的问题)
  - [二、检测一个数值是否为有限数](#二检测一个数值是否为有限数)
  - [三、检测一个数值是否为 NaN](#三检测一个数值是否为-nan)
  - [四、字符串转整数 / 字符串转浮点数](#四字符串转整数--字符串转浮点数)
  - [五、判断一个数是否为整数](#五判断一个数是否为整数)
  - [六、将数字的小数部分抹掉](#六将数字的小数部分抹掉)
  - [七、判断一个数到底为正数 负数 还是零](#七判断一个数到底为正数-负数-还是零)
  - [八、向下取整](#八向下取整)
  - [九、向上取整](#九向上取整)
  - [十、四舍五入版 就近取整 注意 -3.5 结果是 -3](#十四舍五入版-就近取整-注意--35-结果是--3)
  - [十一、绝对值](#十一绝对值)
  - [十二、求最大和最小值](#十二求最大和最小值)
  - [十三、随机数](#十三随机数)
  - [十四、保留小数点后几位（四舍五入）](#十四保留小数点后几位四舍五入)
- [demo](#demo)

**进制表达式：**
```js
let b = 0b1010;  0b  二进制：10
let o = 0o777;   0o  八进制：511
let d = 100;     100 十进制：100
let x = 0xff;    0x  十六进制：255
```

## 一、解决浮点数运算误差的问题

`Number.EPSILON`

**作用：** JavaScript 表示最小精度，当两个数进行比较如果精度小于最小精度则这两个数相等，如 50.2元 和 50元 如果小于最小精度，则它们相等

```js
let num = 0.1 + 0.2;
console.log(num);  // 0.30000000000000004

function equal(a, b){
    // 当 a 和 b 两个数的差值小于 最小精度，则这两个数相等
    if(Math.abs(a-b) < Number.EPSILON){
        return true;
    }else{
        return false;
    }
}
console.log(equal(0.1 + 0.2, 0.3))  // true
```

## 二、检测一个数值是否为有限数

`Number.isFinite`

**返回值：** （true：有限数）（false：无限数）

```js
Number.isFinite(100);  // true
Number.isFinite(100/0);  // false
Number.isFinite(Infinity);  // false
```

## 三、检测一个数值是否为 NaN

`Number.isNaN`

**返回值：** （true：是）（false：不是）

```js
Number.isNaN(123);  // false
```

## 四、字符串转整数 / 字符串转浮点数

`Number.parseInt / Number.parseFloat`

```js
Number.parseInt('5211314love');  // 5211314
Number.parseFloat('3.1415926神奇');  // 3.1415926
```

## 五、判断一个数是否为整数

`Number.isInteger`

```js
Number.isInteger(5);  // true
Number.isInteger(2.5);  // false
```

## 六、将数字的小数部分抹掉

`Math.trunc`

```js
Math.trunc(3.5);  // 3
```

## 七、判断一个数到底为正数 负数 还是零

`Math.sign`

**返回值：** （正数：1）（负数：-1）（零：0）

```js
Math.sign(100);  // 1
Math.sign(-20000);  // -1
Math.sign(0);  // 0
```

## 八、向下取整

`Math.floor()`

```js
console.log(Math.floor(1.1));  // 1
console.log(Math.floor(1.9));  // 1
```

## 九、向上取整

`Math.ceil()`

```js
console.log(Math.ceil(1.1));  // 2
console.log(Math.ceil(1.9));  // 2
```

## 十、四舍五入版 就近取整 注意 -3.5 结果是 -3 

`Math.round()`

```js
console.log(Math.round(1.1));  // 1
console.log(Math.round(1.5));  // 2
console.log(Math.round(1.9));  // 2
console.log(Math.round(-1.1));  // -1
console.log(Math.round(-1.5));  // -1
```

## 十一、绝对值

`Math.abs()`

```js
console.log(Math.abs(1));  // 1
console.log(Math.abs(-1));  // 1
console.log(Math.abs('-1'));  // 隐式转换 会把字符串型 -1 转换为数字型
console.log(Math.abs('pink'));  // NaN
```
            
## 十二、求最大和最小值

`Math.max()/Math.min()`

```js
console.log(Math.max(1, 99, 3));  // 99
console.log(Math.min(1, 99, 3));  // 1
```

## 十三、随机数
`random()`

**作用：** 得到一个两数之间的随机整数，包括两个数在内

```js
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

## 十四、保留小数点后几位（四舍五入）
  **方法：** toFixed()

  **参数一：** 保留小数点后几位

  **返回值：** 新字符串（2.45）

  **例：**
  ```js
  let num = 2.446242342;
  num = num.toFixed(2);  // 输出结果为 2.45
  ```

# demo
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>数值扩展</title>
</head>
<body>
    <script>
        // 知识点：Math 方法扩展

        // （1）Number.EPSILON
            // 作用：JavaScript 表示最小精度，当两个数进行比较如果精度小于最小精度则这两个数相等，如 50.2元 和 50元 如果小于最小精度，则它们相等
            // 使用场景：解决浮点数运算误差的问题
            let num = 0.1 + 0.2;
            console.log(num);  // 0.30000000000000004

            function equal(a, b){
                // 当 a 和 b 两个数的差值小于 最小精度，则这两个数相等
                if(Math.abs(a-b) < Number.EPSILON){
                    return true;
                }else{
                    return false;
                }
            }
            console.log(equal(0.1 + 0.2, 0.3))  // true

        // （2）进制表达式
            // let b = 0b1010;  // 0b  二进制：10
            // let o = 0o777;   // 0o  八进制：511
            // let d = 100;     // 100 十进制：100
            // let x = 0xff;    // 0x  十六进制：255

        // 2. Number.isFinite
            // 作用：检测一个数值是否为有限数
            // 返回值：（true：有限数）（false：无限数）
            Number.isFinite(100);  // true
            Number.isFinite(100/0);  // false
            Number.isFinite(Infinity);  // false
        
        // 3. Number.isNaN 
            // 作用：检测一个数值是否为 NaN
            // 返回值：（true：是）（false：不是）
            Number.isNaN(123);  // false

        // 4. Number.parseInt / Number.parseFloat
            // 作用：字符串转整数 / 字符串转浮点数
            Number.parseInt('5211314love');  // 5211314
            Number.parseFloat('3.1415926神奇');  // 3.1415926

        // 5. Number.isInteger 
            // 作用：判断一个数是否为整数
            Number.isInteger(5);  // true
            Number.isInteger(2.5);  // false

        // 6. Math.trunc
            // 作用：将数字的小数部分抹掉  
            Math.trunc(3.5);  // 3

        // 7. Math.sign
            // 作用：判断一个数到底为正数 负数 还是零
            // 返回值：（正数：1）（负数：-1）（零：0）
            Math.sign(100);  // 1
            Math.sign(-20000);  // -1
            Math.sign(0);  // 0

    </script>
</body>
</html>
```