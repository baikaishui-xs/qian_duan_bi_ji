# 使用 vue-cli 脚手架创建项目
  详见【vue-cli/创建 Vue3 项目】笔记

# 配置 远程仓库

# 配置 代码风格规范
  详见【ESLint】【Prettier】【husky】【Commitizen】【commitlint】笔记的使用步骤

# 配置 ESLint
  -- .eslintrc.js
  ```js
  rules: {
    ...

    -- 增
    "prettier/prettier": 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off', // 是否 禁用 any 类型
    '@typescript-eslint/explicit-module-boundary-types': 'off' // 是否 允许函数返回值自动推断
    '@typescript-eslint/no-empty-function': 'off', // 是否禁用空箭头函数
    '@typescript-eslint/no-non-null-assertion': 'off' // 是否禁用非空断言
    --

  }
  ```

# 配置 编辑器风格
  **提示：** VScode 需要安装 【EditorConfig for VS Code】 插件，该文件才会失效

  -- 项目根目录/新建 .editorconfig
  ```
  # http://editorconfig.org

  root = true // 配置文件是否在根目录

  [*] # 表示所有文件适用
  charset = utf-8 # 设置文件字符集为 utf-8
  indent_style = space # 缩进风格（tab | space）
  indent_size = 2 # 缩进大小
  end_of_line = lf # 控制换行类型(lf | cr | crlf)
  trim_trailing_whitespace = true # 去除行首的任意空白字符
  insert_final_newline = true # 始终在文件末尾插入一个新行

  [*.md] # 表示仅 md 文件适用以下规则
  max_line_length = off
  trim_trailing_whitespace = false
  ```

# 删除多余的文件和代码
  - 删除 assets/logo.png
  - 删除 components 目录里的所有文件
  - 删除 router 里的 index.js 里的 routes 数组中的所有路由
  - 删除 views 目录中的所有文件
  - 删除 App.vue 中的示例代码

# 添加目录结构
  ```
  node_modules                         // 存放 第三方包
  public                               // 存放 页面图标、index.html
  src                                  // 存放 项目源代码
    api                     【手动创建】 // 存放 可复用的 api 接口      
    assets                             // 存放 静态资源
      product               【手动创建】 // 存放 商品图片（大图片）
      images                【手动创建】 // 存放 小图标（小图片）（该目录里的图片会被转换为 base64）     
      styles                【手动创建】 // 存放 CSS样式表       
        mixins.scss         【手动创建】 // 样式函数混入
        init.scss           【手动创建】 // 样式初始化
    components                         // 存放 组件
    router                             // 存放 路由模块
    store                              // vuex（状态管理）
      modules               【手动创建】 // 存储数据模块。让 vuex 中的数据持久化    
    utils                   【手动创建】 // 存放 工具性质的函数和模块       
      request.ts            【手动创建】 // 请求相关配置        
    vender                  【手动创建】 // 手动添加的第三方 js 库（npm 下载不到的）     
    views                              // 存放 通过路由动态切换的组件
    storage                 【手动创建】 // 数据存储工具箱
    App.vue                            // 项目 根组件
    main.js                            // 项目 入口文件（主要职责：创建 vue 应用）
    store.js                           // vuex 配置文件
    theme.scss              【手动创建】 // 主题定制                    
  .browserslistrc                      // 将 css 转换为浏览器兼容的版本（在 CSS 前面添加浏览器对应的兼容前缀）
  .editorconfig                        // 编辑器配置文件（配置缩进、空格、字体大小 等）
  .eslintignore             【手动创建】 // ESLint 忽略清单
  .eslintrc.js                         // ESLint 配置文件
  .gitignore                           // 远程仓库忽略清单
  babel.config.js                      // babel 配置文件（ES降级配置文件）
  package.json                         // 包管理配置文件
  vue.config.js             【手动创建】 // 项目配置文件
  ```

# 重构 main.ts
  ```ts
  import { createApp } from 'vue'
  import App from './App.vue'
  import router from './router'
  import store from './store'

  const app = createApp(App)

  app.use(store)
  app.use(router)
  app.mount('#app')
  ```

# 初始化样式
  ## 1、下载 normalize.css 包
  `npm i normalize.css@8.0.1`

  ## 2、导入 规范化 css 代码
  -- main.js
  ```js
  import 'normalize.css'
  ```

  ## 3、定义 初始化样式
  -- @/assets/styles/init.scss
  ```scss
  body {
    padding: 0;
    margin: 0;
  }

  html, body, #app {
    width: 100%;
    height: 100%;
  }

  div {
    box-sizing: border-box;
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .w {
    width: 1300px;
    margin: 0 auto;
  }

  ul {
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0
  }

  li {
    list-style: none
  }
  ```

  ## 4、导入 初始化样式
  -- main.ts
  ```js
  import '@/assets/styles/init.scss'
  ```

# 定义 Demo 路由【可选】（个人喜好，用于测试代码）
  ## 1、新建 demo 页
  -- view/新建 demo/index.vue
  ```
  <template>
    demo
  </template>
  <script lang='ts'>
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'demo',
    setup() {
      return {}
    }
  })
  </script>
  <style lang='scss' scoped></style>
  ```

  ## 2、定义路由
  -- router/index.ts
  ```ts
  -- 增
  import Demo from '@/views/demo/index.vue'
  --

  const routes: Array<RouteRecordRaw> = [

    -- 增
    {
      path: '/demo',
      name: 'Demo',
      component: Demo
    }
    --

  ]
  ```

# 主题配置（-- theme.scss）
  ```scss
  // 主题配置模块

  // 主色
  $color: #E82626;
  ```

# 自动引入公用变量、混入
  **作用：** 解决每次使用公用变量和混入时都要单独引入文件的问题

  **原理：** 使用 vue-cli 中的 `style-resources-loader` 插件

  ## （1）下载 `style-resources-loader` 插件
  `vue add style-resources-loader`
  - 是否继续：y
  - 用哪个预处理器就选哪个，这里选 scss

  ## （2）配置
  -- vue.config.js
  ```js
  -- 增
  const path = require('path')
  --

  module.exports = {
    pluginOptions: {
      'style-resources-loader': {
        preProcessor: 'scss',
        patterns:[ // 需要自动引入的文件

          -- 增
          path.join(__dirname, './src/theme.scss'),
          path.join(__dirname, './src/styles/mixins.scss')
          --

        ]
      }
    }
  }
  ```

# 配置 ElementPlus
  ## 1、下载
  `npm i element-plus@2.2.5`

  ## 2、自动导入
  详见 【03、Element-plus/引入方式 → 自动引入】笔记

  ## 配置 ElementPlus 图标
  ### 1、下载
  `npm i @element-plus/icons-vue@2.0.4`

  ### 2、完整引入（-- main.js）
  ```js
  import * as ElementPlusIconsVue from '@element-plus/icons-vue'

  // 完整引入 element-plus 图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) { // 全局注册
    app.component(key, component)
  }
  ```

# 配置 vuex
  详见【vuex 持久化 → 手动存储和读取本地缓存（vue3）】笔记

# 配置 axios
  ## 1、下载 axios 包
  `npm i axios@0.27.2`

  ## 2、封装 axios
  详见【封装 axios】笔记

  ## 【可选】解决请求参数格式和服务端参数格式不一致的问题（-- main.jx）
  **解决方法：** 将请求参数转换成字符串格式。因为 content-type 会根据请求参数的格式自动变换请求格式
  - application/x-www-form-urlencoded   格式：categoryId=263919
  - application/json                    格式：{"categoryId": 263919}

  ### 1、下载 qs 包
  `npm i qs@6.10.3`

  ### 2、导入 qs 包（-- utils/request.js）
  ```js
  import qs from 'qs'
  ```

  ### 2、将 application/json 格式转换为 application/x-www-form-urlencoded 格式（-- 同上）
  ```js
  // 请求 拦截器
  axios.interceptors.request.use(request => {

    -- 增    
    if (request.data) {
      request.data = qs.stringify(request.data) // 将 application/json 格式转换为 application/x-www-form-urlencoded 格式
    }
    --

    return request
  })
  ```

# 配置 cookie 库
  ## 1、导入以下代码（-- utils/新建 auth.js）
  ```js
  import Cookies from 'js-cookie'

  const TokenKey = 'vue_admin_template_token'

  export function getToken() {
    return Cookies.get(TokenKey)
  }

  export function setToken(token) {
    return Cookies.set(TokenKey, token)
  }

  export function removeToken() {
    return Cookies.remove(TokenKey)
  }
  ```

  ## 2、按需导入（-- store/modules/新建 user.js）
  ```js
  import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
  ```

# 封装缓存方法
  详见【封装工具/cache】笔记

# 搭建导航守卫骨架
  详见【导航守卫 → 搭建骨架】笔记

# 搭建全局对象模块
  详见【搭建全局对象模块】笔记

# 【可选】导航守卫进度条效果
  详见【导航守卫进度条效果】

# 配置 开发 环境下的接口代理
  -- vue.config.js
  ```js
  module.exports = {
    devServer: { // 开发环境下的服务器配置
      host: 'localhost',
      port: 8080, // 端口号
      proxy:{ // 代理配置
        '^/api': { // 拦截携带 /api 的接口
          target: 'https://api.it120.cc/zcr', // 代理到的目标地址
          changeOrigin: true, // 是否开启跨域
          pathRewrite:{ // 路径重写
            '^/api': '' // 将 /api 转换为 空
          }
        }
      }
    },
    configureWebpack: {
      devtool: 'source-map'
    },
  }
  ```


# 【可选】为空目录添加 .gitkeep（解决远程仓库不能上传空目录的问题）

# 【BUG】脚手架默认安装的 vue-router@4.0.0 版本有问题，，使用 push 属性时报错
  **解决方式：** 删除原来的版本，安装 vue-router@4.0.10 的版本