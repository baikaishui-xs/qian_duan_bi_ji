# 知识点：less（CSS 预处理器）

**官网：** https://less.bootcss.com/

**解决：** CSS 没有以下概念的问题
1. 变量（不方便 维护、扩展、复用）
2. 函数（没有很好的计算能力）
3. 作用域（书写大量看似没有逻辑的代码） 等概念的问题

**编译：** Easy LESS（vscode商店）插件。保存会自动生成 CSS 文件

## 一、变量

**语法：** `@变量名: 值;`

**例：**
```less
div {
  color: @color;
}
```

## 二、嵌套

### （一）子孙关系

**例：**
```less
#header {
  .logo {
    width: 300px;
  }
}
```

### （二）交集|伪类|伪元素选择器

**语法：** `&:hover`

**例：**
```less
a {
  &:hover {
    color: red;
  }
}
```

### （三）运算

**特性：**
1. 有两个以上不同的单位，运算结果取 第一个值 的单位
2. 只有一个单位，则运算结果取该单位

**例：**
```less
@width: 10px + 5;

.demo3 {
  width: (@width + 5) * 2;
}
```

### （四）导入文件

**特性：** 不写后缀，默认为 less

**语法：** `@import '【路径】';`

**例：**
```less'
@import 'sucai/demon';
```

### （五）选择包括该元素之后的所有元素

**语法：** `~ 【元素】`

```less
~ li {
  a {
    border-left: 1px solid #666;
  }
}
```

### （六）只选择子元素

**语法：** `> 【元素】`

**例：**
```less
> li {
  background-color: pink;
}
```

### （七）选择父元素

**语法：** `&【选择器】`

**例：**
```less
a {
  &:hover {
    background-color: pink;
  }
}
```