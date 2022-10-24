**作用：** 样式只在当前组件中生效

**解决：** 样式全局污染的问题

**原理：** 根据组件实例生成一个唯一标识，再通过自定义属性给每一个 DOM 元素绑定唯一标识，如 data-v-标识

# 样式穿透
  **作用：** 修改后代组件 或 第三方组件库 的样式

  **原理：** 使用样式穿透的选择器不会再 DOM 元素上绑定唯一标识

  ## 实现方式
  ### （1）>>> 
  **作用：** 在原生 css 中样式穿透

  ### （2）/deep/
  **作用：** 在预处理器 中样式穿透

  **提示：** 使用样式穿透时，最好把该选择器放到在外面，不要嵌套使用，否则容易不生效

  -- 父组件
  ```html
  <Child></Child>
  ```

  ```scss
  <style lang='scss' scoped>
  /deep/ .box-A {
    background: pink !important;
    // 错误写法。当父组件也使用了样式穿透中，该选择器的样式穿透不生效
    /deep/ .box-B {
      background: #000 !important;
    }
  }

  // 正确写法。写在最外层
  /deep/ .box-B {
    background: #000 !important;
  }
  </style>
  ```

  -- 子组件
  ```html
  <div class="box-A">
    A盒子
    <div class="box-B">B盒子</div>
  </div>
  ```

  ```scss
  <style lang='scss' scoped>
  div {
    width: 100px;
    height: 100px;
  }
  .box-A {
    background: #980616;
    .box-B {
      background: red;
    }
  }
  </style>
  ```

  ## （3）::v-deep
  **作用：** 在 vue-cli3 以上的预处理器 中样式穿透