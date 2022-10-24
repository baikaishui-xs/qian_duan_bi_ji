# 知识点：DOM

**作用：** 页面文档对象模型。操作网页的内容、结构和样式

**document（文档）：** 表示 文档。一个页面 就是 一个文档
**element （元素）：** 表示 元素。所有标签 都是 元素
**node    （节点）：** 表示 节点。网页中的所有内容都是节点（标签、属性、文本、注释等）

**说明：** 以上内容都是对象

**查看元素里面的属性和方法：** `console.dir(元素)`
```js
var timer = document.getElementById('time');
console.dir(timer);
```