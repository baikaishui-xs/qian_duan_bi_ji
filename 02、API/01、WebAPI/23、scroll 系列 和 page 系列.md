# 知识点：scroll 系列 和 page 系列

```html
<div>
    我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容 我是内容
</div>
```
```js
var div = document.querySelector('div');
```

## 一、scroll 系列

**作用：** 操作 元素滚动距离、获取 元素大小 相关信息

**特性：** 获取的数值不带单位

### （一）操作 元素被卷去的上侧距离

**方法：** `元素.scrolltTop`

```js
div.scrollTop = 50;
div.addEventListener('scroll', function () {
    console.log(div.scrollTop);
})
```

### （二）获取 元素被卷去的左侧距离

**方法：** `元素.scrollLeft`

```js
div.addEventListener('scroll', function () {
    console.log(div.scrollLeft);
})
```

### （三）获取 元素 宽/高

**方法：** `元素.scrollWidth / 元素.scrollHeight`

**特性：** 包含 内边距、实际内容

```js
console.log(div.scrollWidth);
console.log(div.scrollHeight);
```

## 二、page 系列

**作用：** 获取 页面滚动距离

**特性：** 获取的数值不带单位

### （一）获取 页面被卷去的上侧距离

**方法：** `window.pageYOffset`

```js
document.addEventListener('scroll', function () {
    console.log(window.pageYOffset);
})
```

### （二）获取 页面被卷去的左侧距离

**方法：** `window.pageXOffset`

```js
document.addEventListener('scroll', function () {
    console.log(window.pageXOffset);
})
```