# 知识点：CSS的引入方式

## 一、内部样式表

```html
<style>
    .neibu {
        color: red;
    }
</style>
```

**特性：** 写在 html 中的 style 标签里
    
## 二、外部样式表（推荐）

```html
<link rel="stylesheet" href="sucai/index.css">
```

**特性：** 通过 link 引入，写在另一个文件中

**属性：**
1. rel：指定链接类型（stylesheet：链接的文档是一个样式表文件）

## 三、行内样式表

```html
<p style="color: rebeccapurple">行内样式表</p>
```

**特性：** 写在标签的 style 属性中