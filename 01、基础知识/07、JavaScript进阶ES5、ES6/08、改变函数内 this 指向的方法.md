# 知识点：改变函数内 this 指向的方法

**作用：** 修改 this 指向

## 一、call()
**特性：** 调用当前函数

**使用场景：** 继承 this 指向对象的属性和方法

**参数一：** this 指向的对象
**参数N：** 调用 this 所在函数的参数（列表）

```js
function fn1 (x, y) {
    console.log(this);  // {name: 'andy'}
    console.log(this.name);  // andy
    console.log(x + y);  // 3
}
var o1 = { name: 'andy' }
fn1.call(o1, 1, 2)
```

## 二、apply()
**特性：** 调用当前函数

**使用场景：** 让数组可以使用数学内置对象里的方法

**参数一：** 数组
**参数N：** 调用 this 所在函数的参数（列表）

```js
var arr = [1, 66, 3, 99, 4];
var max = Math.max.apply(Math, arr);
var min = Math.min.apply(Math, arr);
console.log(max, min);
```

## 三、bind()
**特性：** 不会调用当前函数

**使用场景：** 改变定时器中 this 的指向

**参数一：** this 指向的对象
**参数N：** 调用 this 所在函数的参数（数组）

```js
var btns = document.querySelectorAll('button');
for (var i = 0; i < btns.length; i++) {
    btns[i].onclick = function() {
        this.disabled = true;
        setTimeout(function() {
            this.disabled = false;
        }.bind(this), 2000);
    }
}
```

## 区别
  1、参数。call 和 bind 的第二个参数传递的是列表 / apply 第二个参数传递的是数组
  2、调用。call 和 apply 会调用当前函数 / bind 不会调用调用函数
  3、使用场景。call 是继承 this 指向对象的属性和方法 / apply 是让数组可以使用数学内置对象里的方法 / bind 是改变定时器中 this 的指向

# demo
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <button>点击</button>
    <button>点击</button>
    <button>点击</button>
    <script>
        // （1）call()
        // 方法：函数.call(this 的指向, 参数, 参数, ...)
        // 作用：
            // 1、修改 this 的指向，并调用该函数
            // 2、继承属性和方法
        function fn1 (x, y) {
            console.log(this);  // {name: 'andy'}
            console.log(this.name);  // andy
            console.log(x + y);  // 3
        }
        var o1 = { name: 'andy' }
        fn1.call(o1, 1, 2)

        // （2）apply()
        // 方法：函数.apply(this 的指向, 参数, 参数, ...)
        // 作用：
            // 1、修改 this 的指向，并调用该函数
            // 2、让数组可以使用数学内置对象里的方法
        // 特性：参数必须是数组
        var arr = [1, 66, 3, 99, 4];
        var max = Math.max.apply(Math, arr);
        var min = Math.min.apply(Math, arr);
        console.log(max, min);

        // （3）bind()
        // 方法：函数.bind(this 的指向, 参数, 参数, ...)
        // 作用：
            // 1、修改 this 的指向，不会 调用该函数
            // 2、改变定时器中 this 的指向
        var btns = document.querySelectorAll('button');
        for (var i = 0; i < btns.length; i++) {
            btns[i].onclick = function() {
                this.disabled = true;
                setTimeout(function() {
                    this.disabled = false;
                }.bind(this), 2000);
            }
        }
    </script>
</body>
</html>
```