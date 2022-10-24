**文档：** https://element.eleme.cn/#/zh-CN/component/container#container-bu-ju-rong-qi

# 一、基础用法
  ## 1、引入
  ### 按需引入
  ```js
  import { Container, Header, Aside, Main } from 'element-ui'
  ```

  ### 全局注册
  ```js
  Vue.use(Container)
  Vue.use(Header)
  Vue.use(Aside)
  Vue.use(Main)
  ```

  ## 2、选择合适的常见页面布局，并将结构复制到代码中
  -- 组件.vue
  ```html
  <el-container>
    <!-- 头部 容器 -->
    <el-header>Header</el-header>
    <!-- 外层 容器 -->
    <el-container>
      <!-- 侧边栏 容器 -->
      <el-aside width="200px">Aside</el-aside>
      <!-- 主体 容器 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
  ```