# 知识点：offset 系列

```html
<div class="father">
    <div class="son"></div>
</div>
<div class="w"></div>
```
```css
* {
    margin: 0;
    padding: 0;
}
.father {
    /* position: relative; */
    width: 200px;
    height: 200px;
    background-color: pink;
    margin-top: 150px;
    margin-left: 100px;
}
.son {
    width: 100px;
    height: 100px;
    background-color: purple;
    margin-left: 45px;
}
.w {
    height: 200px;
    background-color: skyblue;
    margin: 0 auto 200px;
    padding: 10px;
    border: 15px solid red;
}
```
```js
var father = document.querySelector('.father');
var son = document.querySelector('.son');
```

**作用：** 获取 元素偏移量、元素大小 相关信息

**特性：** 获取的数值不带单位

**offset 和 style 的区别：**
1. 可以得到任意样式表中的样式值 / 只能得到行内样式表中的样式值
2. 获得的是 没有单位 的 数值 /  获得的是 带有单位 的 字符串
3. offsetWidth 包含 padding + border + width / style.width 不包含 padding 和 border
4. 属性只可读 / 属性可读写
5. **使用场景**： 获取元素大小位置 / 给元素修改样式

## 一、获取 元素带有定位的父元素

**方法：** `元素.offsetParent`

**特性：** 父元素都没有定位时，返回 body 元素

```js
console.log(son.offsetParent);  // <body>...</body>
```

## 二、获取 元素 相对 定位的父元素 上边的距离

**方法：** `元素.offsetTop`

**特性：** 父元素都没有定位时，返回相对 body 元素上边的距离

```js
console.log(father.offsetTop);  // 150
```

## 三、获取 元素 相对 定位的父元素 左边的距离

**方法：** `元素.offsetLeft`

**特性：** 父元素都没有定位时，返回相对 body 元素上边的距离

```js
console.log(father.offsetLeft);  // 100
```

## 四、获取 元素的 宽/高

**方法：** `元素.offsetWidth / 元素.offsetHeight`

**特性：** 包含 边框、内边距、内容

```js
console.log(son.offsetWidth);
console.log(son.offsetHeight);
```