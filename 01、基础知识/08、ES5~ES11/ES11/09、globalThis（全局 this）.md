# 知识点：globalThis（全局 this）

**作用：** 始终指向 全局 this

**特性：**
1. window 环境中的 this 指向 window 对象
2. node   环境中的 this 指向 global 对象
    
```js
console.log(globalThis);
```

# demo
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>globalThis</title>
</head>
<body>
    <script>
        // 知识点：globalThis（全局 this）
        // 作用：始终指向 全局 this
        // 特性：
            // 1、window 环境中的 this 指向 window 对象
            // 2、node   环境中的 this 指向 global 对象
            
        console.log(globalThis);
    </script>
</body>
</html>
```