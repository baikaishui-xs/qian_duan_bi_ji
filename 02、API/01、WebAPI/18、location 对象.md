# 知识点：location 对象

```html
<button>跳转</button>
<button>替换</button>
<button>刷新</button>
```
```js
var btn = document.querySelectorAll('button');
```

**作用：** 操作 url

## 一、URL（统一资源定位符）

**作用：** 指出文件的位置，并告诉浏览器如何处理该文件

**语法：** protocol://host[:port]/path/[?query]#fragment

**protocol：** 传输协议
**host：** 主机域名
**port：** 端口号。http 默认端口号为 80
**path：** 路径
**query：** 参数
**fragment：** 片段

**例：** http://www.itcast.cn/index.html?name=andy&age=18#link

## 二、location 属性

### （一）获取/设置 URL

**方法：** `location.href`

```js
console.log(location.href);
```

### （二）获取 主机（域名）

**方法：** `location.host`

```js
console.log(location.host);
```

### （三）获取 端口号

**方法：** `location.port`

**特性：** 未设置端口号，返回空字符串

```js
console.log(location.port);
```

### （四）获取 路径

**方法：** `location.pathname`

```js
console.log(location.pathname);
```

### （五）获取 参数

**方法：** `location.search`

```js
console.log(location.search);
```

### （六）获取 片段（Hash值）

**方法：** `location.hash`

```js
console.log(location.hash);
```

## 三、location 方法

### （一）跳转页面（页面重定向）

**方法：** `location.assign('跳转地址')`

**特性：**
1. 记录浏览历史
2. 允许后退

```js
btn[0].addEventListener('click', function () {
    location.assign('http://www.itcast.cn');
})
```

### （二）替换页面

**方法：** `location.replace('跳转地址')`

**特性：**
1. 不 记录浏览历史
2. 不 允许后退

```js
btn[1].addEventListener('click', function () {
    location.replace('http://www.itcast.cn');
})
```

### （三）刷新页面

**方法：** `location.reload(布尔值)`

**true：** 强制刷新

```js
btn[2].addEventListener('click', function () {
    location.reload(true);
})
```