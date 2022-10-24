**作用：** 更加方便的控制元素的 位置（垂直居中、水平居中） 和 排列方式

**解决：** 传统布局繁琐的问题

**特性：**
1、子元素的 float、clear、vertical-align 属性将失效
2、子元素默认一行显示
3、当子元素的宽度总和超过父元素时，子元素的宽度会被压缩
**解决方法：** 给一个盒子设置宽度、其它盒子使用 flex: 1
  
**提示：** 在不考虑兼容的情况下，推荐 PC 端使用

**使用步骤：** 定义 display: flex

# 一、父元素属性
  **说明：** 第一个属性都为默认值

  ## （一）主轴子元素 排列方向
  **语法：** `flex-direction`

  **值：** 
  1. row：从左到右
  2. row-reverse：从右到左
  3. column：从上到下
  4. column-reverse：从下到上

  ## （二）主轴子元素 排列方式
  **语法：** `justify-content`

  **值：**
  1. flex-start：从上到下/从左到右
  2. flex-end：从下到上/从右到左
  3. center：垂直居中 水平居中
  4. space-around：平分剩余空间
  5. space-between：先两边贴边 再平分剩余空间

  ## （三）侧轴子元素 排列方式（单行）
  **语法：** `align-items`

  **值：**
  1. stretch：拉伸
  2. flex-start：从上到下/从左到右
  3. flex-end：从下到上/从右到左
  4. center：垂直居中 水平居中
  5. baseline：以第一个元素文字的基线对齐

  ## （四）侧轴子元素 排列方式（多行）
  **语法：** `align-content`

  **值：**
  1. flex-start：从上到下/从左到右
  2. flex-end：从下到上/从右到左
  3. center：垂直居中 水平居中
  4. space-around：平分剩余空间
  5. space-between：先两边贴边 再平分剩余空间
  6. stretch：子元素高度平分父元素高度

  ## （五）子元素是否自动换行
  **语法：** `flex-wrap`

  **值：**
  1. nowrap：不换行
  2. wrap：自动换行
  3. wrap-reverse：自动换行，第一行在最下面，从下往上排列

  ### 【BUG】flex 布局，用了 flex-wrap: wrap; 自动换行属性后，导致两行 div 中间有空行
  **解决方法：** 给外层父元素添加 `align-content: flex-start;`

  ## （六）主轴方向 和 子元素是否换行 的复合写法

  **语法：** `flex-flow`

  **参数一：** 主轴方向
  **参数二：** 子元素是否换行

  ## 效果：
  <!DOCTYPE html>
  <html lang="zh-CN">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width initial-scale=1 maximum-scale=1 minimum-scale=1 user-scalable=no" />
      <title>Document</title>
      <style>
        .span {
          width: 150px;
          height: 100px;
          color: #fff;
          background-color: purple;
        }
        .div {
          display: flex;
          width: 800px;
          height: 300px;
          margin-bottom: 10px;
          background-color: pink;
        }
        .demo1 {
          justify-content: space-between;
          align-items: center;
        }
        .demo2 {
          flex-wrap: wrap;
          justify-content: space-between;
        }
      </style>
    </head>
    <body>
      <div class="div demo1">
        <span class="span">1</span>
        <span class="span">2</span>
        <span class="span">3</span>
        <span class="span">4</span>
      </div>
      <div class="div demo2">
        <span class="span">1</span>
        <span class="span">2</span>
        <span class="span">3</span>
        <span class="span">4</span>
        <span class="span">5</span>
        <span class="span">6</span>
        <span class="span">7</span>
        <span class="span">8</span>
      </div>
    </body>
  </html>