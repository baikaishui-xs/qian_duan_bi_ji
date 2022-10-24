# 知识点：事件对象（DOM：文档对象模型）

**作用：** 存放一系列跟事件相关的信息。如 键盘按键的状态、鼠标的位置、鼠标按钮的状态

**方法：** `元素.on事件类型 = function(事件对象) {}`

```html
<ul>
    <li>11111</li>
</ul>
```
```js
var ul = document.querySelector('ul');
ul.onclick = function (e) {}
```

## this

**作用：** 事件的调用者（自己）

**返回值：** 元素节点

```js
console.log(this);  // <ul>...</ul>
```

## 一、常用 属性

### （一）事件触发的元素

`e.target`

**返回值：** 元素节点

```js
console.log(e.target);  // <li>...</li>
```

### （二）事件类型

`e.type`

**返回值：** 事件类型

```js
console.log(e.type);  // click
```

### （三）阻止事件冒泡

`e.cancelBubble = true;`

**返回值：** 布尔值

```js
console.log(e.cancelBubble = true);
```

### （四）返回按键的 ASCII 值

`e.keyCode`

**事件：** ASCII 值

## 二、鼠标事件对象

### （一）获取鼠标相对于浏览器窗口可视区的 X/Y 坐标 

`e.clientX / e.clientY`

```js
console.log(e.clientX);
console.log(e.clientY);
```

### （二）获取鼠标相对于文档页面的 X/Y 坐标

`e.pageX / e.pageY`

```js
console.log(e.pageX);
console.log(e.pageY);
```

### （三）获取鼠标相对于电脑屏幕的 X/Y 坐标

`e.screenX / e.screenY`

```js
console.log(e.screenX);
console.log(e.screenY);
```

## 三、常用 方法

### （一）阻止默认行为

`e.preventDefault`

### （二）禁止鼠标右键菜单

**使用步骤：**
1. 给文档 定义 contextmenu 事件类型
2. 定义 e.preventDefault()

```js
document.addEventListener('contextmenu', function (e) {
    // e.preventDefault();
})
```

### （三）禁止鼠标选中

**使用步骤：**
1. 给文档 定义 selectstart 事件类型
2. 定义 e.preventDefault()

```js
document.addEventListener('selectstart', function (e) {
    // e.preventDefault();
})
```