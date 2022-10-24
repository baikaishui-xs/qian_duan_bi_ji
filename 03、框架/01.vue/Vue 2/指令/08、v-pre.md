**作用：** 性能优化
  1、跳过不需要编译的元素，加快编译的速度

**例：**
```html
<div v-pre>{{message}}</div>
<!-- 渲染：<div v-pre>{{message}}</div> -->
```