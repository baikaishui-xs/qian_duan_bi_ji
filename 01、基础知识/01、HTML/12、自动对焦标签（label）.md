# 知识点：自动对焦标签（label）

```html
<label for="sex">男</label> <input type="radio" name="sex" id="sex" />

<br>

<label for="text">文本：</label> <input type="text" id="text">
```

**渲染后：**
<label for="sex">男</label> <input type="radio" name="sex" id="sex" />

<br>

<label for="text">文本：</label> <input type="text" id="text">

**作用：** 当点击该标签内的文本时，浏览器就会自动将焦点转到或选中对应的表单控件上，用来增加用户体验

**使用步骤：**
1. 定义 label 标签
2. 为绑定控件添加对应的 id 名

     
