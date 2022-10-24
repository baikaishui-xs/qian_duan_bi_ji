# 知识点：flex 弹性布局（下）

## 二、子元素属性

### （一）一行/一列 占几份

**语法：** `flex`

**值：**
1. 数值
2. 百分比

### （二）设置单个子元素排列方式

**语法：** `align-self`

**值：**
1. flex-start（从上到下/从左到右）
2. flex-end（从下到上/从右到左）
3. center（垂直居中 水平居中）
4. stretch（拉伸）

**特性：** 覆盖 align-items 属性

### （三）子元素 排列顺序

**语法：** `order`

**值：** 数值（正值/负值）（数值越小，排列越靠前，默认为0）

### （四）平均分配剩余空间
**语法：** `flex-grow`

**值：**
1. 数值

### （五）缩小比例，默认为 0
**语法：** `flex-shrink`

**值：**
1. 数值

### （六）元素在主轴上占据的宽
**语法：** `flex-basis`

**值：**
1. px
2. 百分比

### 效果：
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width initial-scale=1 maximum-scale=1 minimum-scale=1 user-scalable=no" />
    <title>Document</title>
    <style>
      section {
        display: flex;
        height: 150px;
        margin-bottom: 10px;
        background-color: pink;
      }
      section div:nth-child(1) {
        flex: 1;
        height: 150px;
        background-color: red;
      }
      section div:nth-child(2) {
        flex: 3;
        background-color: green;
        height: 150px;
      }
      section div:nth-child(3) {
        flex: 1;
        height: 150px;
        background-color: blue;
      }
      .div {
        display: flex;
        height: 300px;
        background-color: pink;
      }
      .div span {
        width: 150px;
        height: 100px;
        background-color: purple;
        margin-right: 5px;
      }
      .div span:nth-child(2) {
        order: -1;
      }
      .div span:nth-child(3) {
        align-self: flex-end;
      }
    </style>
  </head>
  <body>
    <section>
      <div class="div"></div>
      <div class="div"></div>
      <div class="div"></div>
    </section>
    <div class="div">
      <span>1</span>
      <span>2</span>
      <span>3</span>
    </div>
  </body>
</html>
