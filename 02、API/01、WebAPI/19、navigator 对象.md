# 知识点：navigator 对象

**作用：** 浏览器信息的集合

## 一、判断用户使用哪个终端打开页面

**方法：** `navigator.userAgent`

```js
console.log(navigator.userAgent);
```

**使用场景：** 如果用户使用手机打开页面，跳转到手机页面

```js
if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    window.location.href = "../H5/index.html"; //手机
}
```