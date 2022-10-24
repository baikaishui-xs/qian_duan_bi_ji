# 作用
  1、解决自定义组件没有定义 class、style、id，但是又拥有这些属性功能的问题

# 说明
  1、class、style、id 这些都是非 props 属性

# （一）一个根节点
  **作用：** 当组件有一个根节点时，非 props 属性将自动添加到这个组件内的根节点上

  （-- 组件）
  ```js
  <demo class="a"><demo>
  ```

  （-- demo.vue)
  ```html
  <template>
    <!-- 最后非 props 属性会添加到这里  -->
    <div class="a"></div>
  <template>
  ```

  ## 禁用 属性继承
  **作用：** 给组件中除根节点以外的节点设置非 props 属性

  ### 使用步骤
  #### 1、定义非 props 属性
  （-- index.vue）
  ```js
  <demo class="a" id="b"><demo>
  ```

  #### 2、禁用 属性继承
  （-- 同上）
  ```js
  export default {
    inheritAttrs: false,
  }
  ```

  #### 3、绑定非 props 属性
  （-- demo.vue）
  ```html
  <!-- 绑定指定的属性 -->
  <h2 :class="$attrs.class"></h2>
  <!-- 最后转换为：  -->
  <!-- <h2 class="a"></h2> -->

  <!-- 绑定所有属性 -->
  <h2 v-bind="$attrs"></h2>
  <!-- 最后转换为： -->
  <!-- <h2 class="a" id="b"></h2> -->
  ```

# （二）多个根节点
  **说明：** 当组件有多个根节点时，需要指定非 props 绑定到哪个根节点上，否则会报警告

  ### 使用步骤
  #### 1、定义非 props 属性
  （-- index.vue）
  ```js
  <demo class="a" id="b"><demo>
  ```

  #### 2、禁用 属性继承
  （-- 同上）
  ```js
  export default {
    inheritAttrs: false,
  }
  ```

  #### 3、指定哪个根节点需要绑定非 props 属性
  （-- demo.vue）
  ```html
  <h2></h2>
  <h2 :class="$attrs.class"></h2>
  <h2></h2>
  ```

**视频：** 深入Vue3+TypeScript技术栈-coderwhy大神新课 → 06_(掌握)非Prop的Attribute传递