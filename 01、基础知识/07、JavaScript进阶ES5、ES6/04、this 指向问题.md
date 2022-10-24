# 知识点：this 指向问题

```js
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <button>点击</button>
    <script>
        // （1）让方法里的 this 指向 构造函数里的 this
        // 方法：
        var that;  // 1、在全局声明 that

        class Star {
            constructor(uname, age) {
                that = this;  // 2、在构造函数中把 this 存储到 that 中
                
                this.uname = uname;
                this.age = age;

                // （2）方法被事件调用时，方法里的 this 指向绑定事件的元素
                this.btn = document.querySelector('button');
                this.btn.onclick = this.sing;   // <button>点击</button>
            }
            sing() {
                console.log(this);

                console.log(that.uname);  // 3、使用 that 来访问 构造函数中的属性
            }
        }
        var ldh = new Star('刘德华');
        ldh.sing();
    </script>
</body>
</html>
```