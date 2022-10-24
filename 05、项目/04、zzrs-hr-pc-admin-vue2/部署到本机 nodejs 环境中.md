# 项目部署（由运维完成）
  ## 科普
  运维会将代码部署到 阿里云、腾讯云、等，ngix 的服务器上

  ## 自动化部署（主流）
  只需执行一个命令即可，原理就是将手动的步骤写成一个脚本，执行这个脚本，就会自动执行所有的步骤

  ## 手动部署
  ### （1）部署到本机 nodejs 环境中（该项目使用的）
  #### 1、创建 web 服务目录（-- 桌面/创建 hrServer 目录）

  #### 2、初始化 npm（-- hrServer 目录）
  `npm init -y`

  #### 3、安装服务端框架（-- 同上）
  **服务端框架** （同一团队：koa、express）（阿里：egg）
  **koa-static 作用：** 静态化代码托管

  `npm i koa koa-static@5.0.0`

  #### 4、在将打包好的 dist 目录里的内容拷贝到 hrServer/新建 public 目录下

  #### 5、实例化 web 服务，并配置 koa-static 中间件。导入以下代码（hrServer/新建 app.js）
  ```js
  const Koa = require('koa')
  const serve = require('koa-static');

  // 实例化 web 服务
  const app = new Koa()

  // 将 public 目录下的内容进行静态服务
  app.use(serve(__dirname + "/public"))

  // 监听端口
  app.listen(3333, function() {
    console.log('人资项目启动，访问地址 http://localhost:3333')
  })
  ```

  #### 6、启动 web 服务
  `node app`

  #### 7、检测是否成功
  访问 http://localhost:3333，如果可以正常访问登录页则成功

  ### （2）解决路由模式为 history 模式，导致刷新页面显示 Not Found 的问题
  #### （1）本地 部署
  **说明：** 
  - 地址栏路径不正确导致的。因为在开发环境中 vue-cli 处理了这个问题，但是在生产环境中并没有处理这个问题
  - 需要后端配合解决

  **解决方法：** 无论访问哪个路径，都应该访问 hrServer/public/index.html 这个 index.html 文件，因为这个项目是 SPA（单页面应用程序）项目
  
  ##### 1、安装 koa 中间件
  `npm i koa2-connect-history-api-fallback`

  ##### 2、导入 historyApiFallback 方法
  ```js
  const  { historyApiFallback } = require('koa2-connect-history-api-fallback');
  ```

  ##### 3、配置 historyApiFallback 中间件
  ```js
  -- 增
  app.use(historyApiFallback({
    // 虚拟地址。拦截携带 /api 的接口，并代理到目标地址中（在 .env.production 中的 VUE_APP_BASE_API 变量中可以查看拦截的地址）
    whiteList: ['/prod-api']
  }))
  --

  // 将 public 目录下的内容进行静态服务
  app.use(serve(__dirname + "/public"))
  ```

  ##### 4、重启 web 服务
  `npm app`

  #### （2）云服务器 部署
  ```
  location / {

    -- 改（旧）
    index index.html;
    --
    -- 改（新）
    try_files $uri $uri/ /index.html;
    --

  }
  ```

  ### （3）解决生产环境跨域问题
  **说明：** vue-cli 只存在于开发环境，所以在 vue-cli 中配置的接口代理在生产环境中就不生效了

  **解决方法：** 在生产环境中再次配置接口代理

  #### 1、安装接口代理中间件（-- hrServer 工作目录）
  `npm i koa2-proxy-middleware@0.0.4`

  #### 2、引入（-- hrServer/app.js）
  `const proxy = require('koa2-proxy-middleware')`

  #### 配置 koa2-proxy-middleware 中间件（-- 同上）
  ```js
  -- 增
  app.use(proxy({
    // 代理地址
    targets: {
      // 代理 /prod-api 开头的地址
      '/prod-api/(.*)': {
        // 目标地址（因为在 vue-cli 中的代理配置中拦截的是 /api，所以这里后面要跟 /api）
        target: 'http://ihrm-java.itheima.net/api',
        // 是否开启跨域
        changeOrigin: true,
        // 路径转发规则（正确的地址：http://ihrm-java.itheima.net/api/sys/login）（当前的地址：http://ihrm-java.itheima.net/api/prod-api/sys/login） ，所以需要删除 /prod-api
        pathRewrite: {
          // 删除 /prod-api
         '/prod-api': '',
        },
      }
    }
  }))
  --

  app.use(historyApiFallback(
  ```





  （3）CDN 优化 ElementUI。减少项目的体积
    提示：虽然使用了按需加载，但是 ElementUI 的体积还是很大，需要进一步的优化
    使用步骤：
      （1）在 public/index.html 中导入放在 cdn 中的文件
        <!-- element-ui 的 样式文件 -->
        <link rel="stylesheet" href="https://cdn.staticfile.org/element-ui/2.8.2/theme-chalk/index.css"/>
        <!-- element-ui 的 js 文件 -->
        <script src="https://cdn.staticfile.org/element-ui/2.8.2/index.js"></script>

      （2）删除按需导入（main-prod.js）
        -- 删
          import './plugins/element.js'
        --

  （4）路由懒加载。解决一次性加载所有路由资源，导致页面加载过慢的问题
    文档：https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E8%B7%AF%E7%94%B1%E6%87%92%E5%8A%A0%E8%BD%BD
    使用步骤（-- babel-config.js）：
      （1）改造路由的导入方式（-- router.js）
        语法：const Foo = () => import(/* 路由分组 */ '路由组件存放路劲')
        特性 ：同一个路由分组，会被打包到同一个 js 文件中，也就是请求这个路由时，也会请求同一个分组的路由

        -- 改
          const Login = () => import(/* webpackChunkName: "login_home_welcome" */ '@/components/Login.vue')
          const Home = () => import(/* webpackChunkName: "login_home_welcome" */ '@/components/Home.vue')
          const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ '@/components/Welcome.vue')

          const Users = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '@/components/Users.vue')
          const rights = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '@/components/power/rights.vue')
          const roles = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '@/components/power/Roles.vue')

          const Cate = () => import(/* webpackChunkName: "Cate_Params" */ '@/components/goods/Cate.vue')
          const Params = () => import(/* webpackChunkName: "Cate_Params" */ '@/components/goods/Params.vue')
          const List = () => import(/* webpackChunkName: "Cate_Params" */ '@/components/goods/List.vue')

          const Order = () => import(/* webpackChunkName: "Order_Report" */ '@/components/order/Order.vue')
          const Report = () => import(/* webpackChunkName: "Order_Report" */ '@/components/report/Report.vue')
        --
    
    调试：在脚手架 UI 界面的资源项中，可以看到 js/app.********.js、js/chunk-vendors.********.js 这两个文件的体积明显变小了
    报错：
      1）使用 import 语法报错
        解决方法：
          1、安装 @babel/plugin-syntax-dynamic-import@7.2.0 包
          2、配置 babel.config.js
            module.exports = {
              plugins: [
                [
                  ...
                ],
                ...prodPlugins

                -- 增
                  @babel/plugin-syntax-dynamic-import
                --

              ]
            }

  （5）首页内容按需加载
    1）按需加载自定义首页标题
      说明：根据打包环境的不同，首页内容显示不同的标题
      使用步骤（-- vue.config.js）：
        1、按需加载自定义首页标题
          // 判断当前是否为生产环境（生成环境）
          config.when(process.env.NODE_ENV === 'production', config => {

            -- 增
              // 开启自定义首页标题
              config.plugin('html').tap(args => {
                args[0].isProd = true
                return args
              })
            --

          })

          // 判断当前是否为开发环境（开发环境）
          config.when(process.env.NODE_ENV === 'development', config => {

            -- 增
              // 关闭自定义首页标题
              config.plugin('html').tap(args => {
                args[0].isProd = false
                return args
              })
            --

          })
        
        2、(-- public/index.html)
          -- 改
            <title><%= htmlWebpackPlugin.options.isProd ? '' : 'dev - ' %>电商后台管理系统</title>
          --  

    2）按需加载外部 CDN 资源
      说明：开发环境中使用 import 加载资源、生产环境中使用 CDN 加载资源
      使用步骤：将所有外部 CDN 资源包裹起来

        -- 增
          <% if(htmlWebpackPlugin.options.isProd){ %>
        --

            <link rel="stylesheet" href="https://cdn.staticfile.org/quill/1.3.4/quill.nprogress.min.css" />
            <script src="https://cdn.staticfile.org/vue/2.5.22/vue.min.js"></script>
            <!-- <script src="https://cdn.staticfile.org/vue-router/3.0.1/vue-router.min.js"></script> -->
            ...

        -- 增
          <% } %>
        --

    调试：运行不同打包环境（开发环境：查看标题是否按需加载、查看源代码中是否携带 CDN 资源）（运行环境：查看标题是否按需加载、查看 dist/index.html 中是否携带 CDN 资源）

  （6）gzip 文件传输压缩（该步骤在项目上线阶段才会实现）


项目上线

  （1）通过 node 创建 web 服务器
    1、项目根目录新建 vue_shop_server 目录
    2、在 vue_shop_server 目录下打开终端 → npm init -y（初始化包管理配置文件） → npm i express -S
    3、将 dist 目录放到 vue_shop_server 目录中
    4、在 vue_shop_server 目录下新建 app.js（入口文件），并添加以下代码

      const express = require('express')
      const app = express()

      // 托管静态资源目录
      app.use(express.static('./dist'))

      // 启动服务器
      app.listen(80, () => {
        console.log('server running at http://127.0.0.1')
      })

    5、终端输入 node ./app.js 启动服务器
    6、调试：查看控制台是否报错、查看 Network 中是否有请求失败的文件（！！！发现报错，或调试完成后，一定要强制刷新）

  （2）开启 gzip 文件传输压缩

    1、下载 compression 包（-- vue_shop_server 目录下）
      npm i compression -S

    2、导入（-- vue_shop_server/app.js）
      const compression = require('compression')

    3、配置中间件（-- vue_shop_server/app.js）

      -- 增（注意：这行代码一定要写在 静态资源托管的前面，否则将不会生效）
        // 开启 gzip 文件传输压缩
        app.use(compression())
      --
      
      // 托管静态资源目录
      app.use(express.static('./dist'))
    
    4、调试：控制台 → Network → 设置 → 勾选 Uselarge request rows → 查看 chunk-vendors.********.js 请求文件 → size 列中文件网络传输大小是否比实际大小小（上面为网络传输大小、下面为实际大小），如果网络传输大小小于实际大小代表压缩成功

  （3）配置 https 服务（了解）（提示：该功能并不由前端来完成，而是由后台在部署项目时，开启 https 服务）
    作用：让网络传输更加安全
    原理：传统的 HTTP 协议传输的数据都是明文，很容易被窃取，不安全，而 HTTPS 协议会对传输的数据进行加密，防止数据被窃取，更安全
    使用步骤：

      1、申请 SSL 证书
        个人免费申请网站：https://freessl.cn
        提示：企业级的 SSL 证书是收费的
        使用步骤：输入域名 → 品牌选择（多域名通配符） → 创建免费的 SSL 证书 → 输入邮箱 → 点击创建
        
      
      2、验证 DNS（在域名管理后台添加 TXT 记录）
      
      3、验证通过之后，下载 SSL 证书（full_chain.pen 公钥；private.key 私钥）
      
      4、将公钥、私钥放到 vue_shop_server 目录下

      5、配置 (-- vue_shop_server/app.js)

        -- 增
          const https = require('https')
          const fs = require('fs')
        --

        -- 增
          const options = {
            // 读取公钥
            cert: fs.readFileSync('./full_chain.pen'),
            // 读取私钥
            key: fs.readFileSync('./private.key')
          }
        -- 

        // 开启 gzip 文件传输压缩
        app.use(compression())

        // 托管静态资源目录
        app.use(express.static('./dist'))

        -- 替（旧）
          app.listen(80, () => {
            console.log('server running at https://127.0,0,1')
          })
        --

        -- 替（新）
          // 创建服务器并监听端口
          https.createServer(options, app).listen(443)  -- https 的默认端口为 443
        --

  （4）使用 pm2 管理应用（-- 终端 vue_shop_server 工作目录下）
    作用：关闭通过终端开启的服务器（终端窗口），项目依然可以运行
    使用步骤：
      1、下载：npm i pm2 -g
      2、启动项目：pm2 start app.js --name web_vueshop
    其它命令：
      启动项目：pm2 start 入口文件 --name 自定义名称
      查看项目：pm2 ls
      重启项目：pm2 restart 自定义名称/id
      停止项目：pm2 stop 自定义名称/id
      删除项目：pm2 delete 自定义名称/id



























































