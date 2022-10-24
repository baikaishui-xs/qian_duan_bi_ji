# 知识点：Symbol 方法扩展

## 一、description

**作用：** 获取 Symbol 字符串描述

```js
let s = Symbol('尚硅谷');

s.description;  // 尚硅谷
```

# demo
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Symbol.prototype.description</title>
</head>
<body>
    <script>
        // 知识点：Symbol 方法扩展
        
        // （1）description
        // 作用：获取 Symbol 字符串描述
        let s = Symbol('尚硅谷');

        s.description;  // 尚硅谷
    </script>
</body>

</html>
```