# 知识点：client 系列

```html
<div></div>
```
```css
div {
    width: 200px;
    height: 200px;
    background-color: pink;
    border-top: 30px solid red;
    border-left: 20px solid rebeccapurple;
    padding: 10px;
}
```
```js
var div = document.querySelector('div');
```

**作用：** 获取 元素可视区、元素大小 相关信息

**特性：** 获取的数值不带单位

## 一、获取 元素上边框大小

**方法：** `元素.clientTop`

```js
console.log(div.clientTop);
```

## 二、获取 元素左边框大小

**方法：** `元素.clientLeft`

```js
console.log(div.clientLeft);
```

## 三、获取 元素 宽/高

**方法：** `元素.clientWidth / 元素.clientHeight`

**特性：** 包含 内边距、内容

```js
console.log(div.clientWidth);
console.log(div.clientHeight);
```