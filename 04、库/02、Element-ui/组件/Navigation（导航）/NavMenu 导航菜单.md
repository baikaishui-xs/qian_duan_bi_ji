**文档：** https://element.eleme.cn/#/zh-CN/component/menu#ce-lan

# 一、 侧栏
  ## （一）基础结构
  ### 1、按需导入
  #### 按需导入
  -- plugins/element.js
  ```js
  import { Menu, Submenu, MenuItem } from 'element-ui'
  ```

  #### 全局注册
  -- plugins/element.js
  ```js
  Vue.use(Menu)
  Vue.use(Submenu)
  Vue.use(MenuItem)
  ```

  （3）导入结构（-- 组件）
  **属性描述：**
  **`<el-menu>：`**
  ```css
  background-color="#333744"：背景颜色
  text-color="#fff"：文本颜色
  active-text-color：当前项文本颜色
  ```
  ```html
  <!-- 侧边栏菜单 区 -->
  <el-menu background-color="#333744" text-color="#fff">
    <!-- 一级菜单 -->
    <el-submenu index="1">
      <!-- 模板区域 -->
      <template slot="title">
        <!-- 图标 -->
        <i class="el-icon-menu"></i>
        <!-- 文本 -->
        <span>一级菜单</span>
      </template>
      <!-- 二级菜单 -->
      <el-menu-item>
        <i class="el-icon-menu"></i>
        <span slot="title">二级菜单</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
  ```

  ### 2、为每个一级菜单指定不同的图标
  #### 1-1、定义一个对象，用于存放图标名，属性名为一级菜单项 id
  ```js
  // 一级菜单图标
  iconsObj: {
    '0': 'el-icon-user-solid',
    '1': 'el-icon-key',
    '2': 'el-icon-s-cooperation',
    '3': 'el-icon-s-claim',
    '4': 'el-icon-s-help',
  },
  ```

  #### 2-2、动态添加类名
  ```html
  <i :class="iconsObj[item.id]"></i>
  ```

  ## （二）点击菜单时显示不同的路由
  **传统方法：** 为每个菜单添加 router-link

  **推荐方法：** 开启 vue-router 路由模式

  **说明：** 启用该模式会在激活导航时以 index（菜单id） 作为 path 进行路由跳转（如：localhost:8080/#/110）

  **提示：** 使用 菜单id 作为 path 进行路由跳转并不合适，推荐使用 path
  
  **例：**
  （1）为 <el-menu> 添加 router 属性
    <el-menu router></el-menu>

  （2）将 <el-menu-item> 中的 index 改为 path
    <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children">

  ## （三）点击菜单时，让菜单高亮显示
  **原理：** default-active="index">

  **语法：** 为 <el-menu> 添加 default-active="index"> 属性

  ### 1、绑定点击事件
  ```html
  <el-menu-item @click="saveNavState('/' + children.path)">
  ```

  ### 2、将当前菜单项的 index 存储起来
  ```js
  // 存储当前菜单项的 index
  saveNavState(activePath) {
    window.sessionStorage.setItem('activePath', activePath)
    this.activePath = activePath
  }
  ```
  
  ### 3、定义数据
  ```js
  // 当前菜单项的 index
  activePath: ''
  ```

  ### 4、动态绑定 default-active 属性
  ```html
  <el-menu :default-active="activePath">
  ```

  ### 5、为 activePath 赋值
  ```js
  created() {
    this.activePath = window.sessionStorage.getItem('activePath')
  }
  ```