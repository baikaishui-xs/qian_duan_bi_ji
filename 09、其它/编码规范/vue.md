# 一、公共组件目录名称需遵循 大驼峰命名法
  **如：**
  - components/DemoDemo/index.vue
  - components/DemoDemo1/index.vue

# 二、路由组件目录名称需遵循 小驼峰命名法
  **如：**
  - views/demoDemo/index.vue
  - views/demoDemo1/index.vue

# 三、组件名称的 name 配置项需遵循 大驼峰命名法
  ```js
  export default {
    name: 'Demo'
  }
  ```

# 四、组件名更推荐大驼峰
  **特性：**
  1、辨识度高
  2、不容易造成原生标签的命名冲突

  ```html
  <template>
    <div id="app">
      <Header></Header>
    </div>
  </template>
  ```

# 五、导入组件推荐使用相对路径，并且加上扩展名
  **特性：**
  1、组件跳转。按住 command + 组件 可以直接跳转到这个组件中
  2、智能提示。会有组件信息的一些提示

  **错误：**
  ```js
  import Footer from '@/components/Footer'
  ```

  **正确：**
  ```js
  import Footer from '../../components/Footer.vue'
  ```

# 六、自定义属性名推荐使用短横线命名法
  **说明：** 因为 props 大小写不敏感，如果使用小驼峰，最后都会转换成小写的，这样容易出问题【messageInfo 转换 messageinfo】。当然构建工具会对这个问题进行处理，不过还是推荐使用 短横线 命名法

  **错误：**
  ```js
  props: {
    messageInfo: {
      type: Script
    }
  }
  ```
  ```js
  <show-message messageInfo="">
  ```

  **正确：**
  ```js
  props: {
    messageInfo: {
      type: Script
    }
  }
  ```
  ```js
  <show-message message-info="">
  ```