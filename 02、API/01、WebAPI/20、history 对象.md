# 知识点：history 对象

```html
<a href="20-history 对象(下）.html">点击我去往列表页</a>
<button>前进</button>
```
```js
var btn = document.querySelector('button');
```

## 一、允许前进

**方法：** `history.forward()`

```js
btn.addEventListener('click', function() {
    history.forward();
})
```

## 二、历史记录跳转

**方法：** `go(参数)`

**参数：**
1. n：前进n个页面
2. -n：后退n个页面

```js
btn.addEventListener('click', function() {
    go(1);
})
```

## 三、允许后退

```html
<a href="20-history 对象(上）.html">点击我去往首页</a>
<button>后退</button>
```
```js
var btn = document.querySelector('button');
```

**方法：** history.back()

```js
btn.addEventListener('click', function() {
    history.back()
})
```