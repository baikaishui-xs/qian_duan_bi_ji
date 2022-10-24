# 知识点：Emmet 语法

**特性：** Vscode 内部已经集成该语法

**使用方法：** 输入完语法后，要按 tab 才可以生成

## 一、快速生成HTML结构语法

### （1）标签

**如：** div

**生成：** `<div></div>`

### （2）多个相同标签

**如：** div*3

**生成：** `<div></div>`

### （3）父子级关系的标签

**如：** ul > li

**生成：** 
```
<ul>
    <li></li>
</ul>
```

### （4）兄弟关系的标签

**如：** div+p

**生成：** `<div></div><p></p>`

### （5）带有类名的标签

**如：** div.demo

**生成：** `<div class="demo"></div>`

### （6）带有 id 的标签

**如：** div#demo

**生成：** `<div id="demo"></div>`


### （7） 生成带有顺序的

**如：** div.demo$*3

**生成：**
```
<div class="demo1"></div>
<div class="demo2"></div>
<div class="demo3"></div>
```


### （8）在生成的标签内部写内容

**如：** div{哈哈}

**生成：** `<div>哈哈</div>`

## 二、快速生成CSS样式语法

**如：** w200 **生成：** width: 200px

**如：** lh26px **生成：** line-height: 26px;

**如：** alii **生成：** align-items

**如：** bt **生成：** border-top

**如：** bb **生成：** border-bottom

...


## 三、设置保存时格式化代码

1. 文件 ------.>【首选项】---------->【设置】
2. 搜索emmet.include
3. 在 settings.json 下的【工作区设置】中添加以下语句
```
"editor.formatOnType": true, 
"editor.formatOnSave": true
```