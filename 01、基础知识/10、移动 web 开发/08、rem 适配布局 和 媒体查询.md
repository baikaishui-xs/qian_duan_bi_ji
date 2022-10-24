# 知识点：rem 适配布局 和 媒体查询

**作用：** 根据不同的屏幕宽度，来动态变化样式

## 一、rem 适配布局

**作用：** 相对 html元素 的字体大小，来动态改变元素的宽度

**特性：**
1. 是一个相对单位
2. 1rem = html元素 字体大小

**使用场景：** 常配合媒体查询使用

**例：**
```css
html {
  font-size: 20px;
}
.demo1 {
  width: 2rem;
  height: 20px;
  background-color: pink;
}
```

## 二、媒体查询（@media）

**语法：** `@media 媒体类型 关键字 (媒体特性) {}`

**作用：** 针对不同的屏幕尺寸设置不同的样式

**媒体类型：**
1. all（用于所有设备）
2. print（用于打印机和打印预览）
3. scree（用于电脑屏幕，平板电脑，智能手机等）

**关键字（媒体类型和媒体特性的查询条件）：**
1. and：可以将多个媒体特性连接到一起，相当于“且”
2. not：排除某个媒体类型，相当于“非”，可以省略
3. only：指定某个特定的媒体类型，可以省略

**媒体特性：**
1. width：定义输出设备中页面可见区域的宽度
2. min-width：当屏幕 大于等于 某个值时
3. max-width：当屏幕 小于等于 某个值时

**例：**
```html
@media screen and (max-width: 1000px) {
  body {
    background-color: pink;
  }
}
@media screen and (max-width: 800px) {
  body {
    background-color: purple;
  }
}
```

## 三、使用场景

### （一）根据不同的屏幕尺寸，引入不同的样式表

**原理：** 判断媒体特性

**例：**
```html
<link rel="stylesheet" href="sucai/09.css" media="screen and (max-width: 600px)" />
```