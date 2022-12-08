# 创建项目
  1、新建 zzrs-webapp-shop-koamysql 文件夹
  2、新建 src 目录
  3、初始化 package.json：npm init

# 配置 tsconfig.json
  -- 项目根目录/新建 tsconfig.json
  ```json
  {
    "compilerOptions": {
      "target": "es5",
      "useDefineForClassFields": true,
      "module": "commonjs",
      "moduleResolution": "node",
      "allowJs": true,
      "declaration": false,
      "strict": true,
      "sourceMap": true,
      "resolveJsonModule": true,
      "isolatedModules": true,
      "esModuleInterop": true,
      "experimentalDecorators": true /* Enables experimental support for ES7 decorators. */,
      "emitDecoratorMetadata": true,
      "lib": ["esnext", "dom"],
      "skipLibCheck": true,
      "baseUrl": ".",
      "paths": {
        "@/*": ["src/*"]
      }
    },
    "include": ["src/**/*.ts", "src/**/*.d.ts"]
  }
  ```

# 安装依赖
  ```ts
  npm install koa@2.13.4 -S
  npm install @types/koa@2.13.4 -S

  // 支持 post 请求依赖
  npm install koa-body@5.0.0 -S

  // 支持响应数据对象转 json 格式的依赖
  npm install koa-json@2.0.2 -S
  npm install @types/koa-json@2.0.20 -S

  // 路由器依赖
  npm install koa-router@10.1.1 -S
  npm install @types/koa-router@7.4.4 -S

  // token 依赖
  npm install jsonwebtoken@8.5.1 -S
  npm install @types/jsonwebtoken@8.5.9 -S

  // javaScript 实用工具库
  npm install @types/lodash@4.14.182 -S

  // 日志依赖
  npm install log4js@6.4.7 -S

  // 支持访问 mysql 数据库依赖
  npm install mysql@2.18.1 -S
  npm i @types/mysql@2.15.21 -S

  // 装饰器元数据
  npm install reflect-metadata@0.1.13 -S

  // ORM 映射工具依赖
  npm install sequelize@6.19.1 -S
  npm install sequelize-typescript@2.1.5 -S

  // typescript + ts-node 依赖
  npm install typescript@4.6.4 -S
  npm install ts-node@10.7.0 -S

  npm install mysql2@2.2.5
  ```

# 配置热部署
  **作用：** 自动检测文件变化后自动重启依赖

  ## 1、安装 nodemon@
  `npm install nodemon@2.0.16 -S`

  ## 2、添加脚本命令
  -- package.json
  ```
  "scripts": {

    -- 增
    "dev": "nodemon --watch src/ -e ts --exec ts-node ./src/app.ts",
    --

  }
  ```

# 配置依赖
  -- src/新建 app.ts
  ```ts
  import Koa from 'koa'
  import body from 'koa-body'
  import json from 'koa-json'
  import Router from 'koa-router'

  const app = new Koa()
  const router = new Router()

  // 为所有的路由访问添加路由前缀 `/dang`，来作为一级路由
  router.prefix('/dang')
  
  router.use(json())
  router.use(body())

  router.get('/test', async (ctx: Koa.Context) => {
    ctx.body = '测试页面'
  })
  
  // 加载路由到全局路由上
  app.use(router.routes())

  app.listen(3002)
  console.log('server running on port 3002')
  ```

# 测试是否配置成功
  1、终端输入 yarn dev
  2、api 调试工具输入 localhost:3002/dang/test
  3、显示 `测试页面` 表示成功

# 图片管理
  ## （一）将图片转换为二进制并存储到数据表中
  **缺点：** 浪费性能。图片转换二进制会消耗性能

  ## （二）将图片路径和图片一起存储到数据表中
  **缺点：** 维护性差。图片路径发送变化会导致图片丢失

  ## （三）动态管理图片
  ### 优点
  1、数据表只需要保存个图片名，存取图片不需要管理图片路径问题
  2、前端从数据表中存取图片，无需考虑图片路径问题
  3、图片路径修改了，无需改代码，可维护性大大提高
  4、组件显示图片更方便
  5、图片可分类管理

  ### 使用步骤
  #### 1、安装 good-storage 本地缓存管理工具
  `npm install good-storage@1.1.1 -S`
  `npm install @types/good-storage@1.1.0 -D`

  #### 2、定义方法
  -- @/utils/imgUtil.ts
  ```ts
  import goodStorage from 'good-storage'
  export class LmgUtil {
    // 存储着图片名称和图片路径
    static imgList: Record<string,string> = {}
    // loadAllLmg 函数只执行一次，后续即使刷新页面也不会执行，这样可节约性能
    static storageImgList() {
      this.imgList = goodStorage.get('imgList') || {}
      if (this.isEmpty()) {
        this.loadAllLmg()
        goodStorage.set('imgList', this.imgList)
      }
    }
    // 判断本地缓存中 imgList 是否有数据
    static isEmpty() {
      return !Object.getOwnPropertyNames(this.imgList).length
    }
    static getImg(imgName: string) {
      return LmgUtil.imgList[imgName]
    }
    // 获取 src/assets/img 的图片名称和绝对路径，并放 imgList 对象中
    static loadAllLmg() {
      // src/assets/img 目录下的所有 相 对路径图片
      const imgMap = import.meta.globEager('../assets/img/**/*.png')
      // src/assets/img 目录下的所有 绝 对路径图片
      let absolutePath: string = ''
      // src/assets/img 目录下的所有图片 名称
      let imgName: string = ''
      // 将图片名称和绝对路径已键值对的形式存储到 imgList 对象中
      for(let relatviePath in imgMap) {
        absolutePath = imgMap[relatviePath].default;
        // 判断绝对路径是否存在
        if (absolutePath) {
          imgName = absolutePath.substring(absolutePath.lastIndexOf('/')+1)
          this.imgList[imgName] = absolutePath
        }
      }
    }
  }
  export default LmgUtil.getImg
  ```

  -- @/main.ts
  ```ts
  -- 增
  import { LmgUtil } from './utils/imgUtil'
  --

  import App from './App.vue'

  -- 增
  LmgUtil.storageImgList()
  --

  createApp(App).mount('#app')
  ```

  #### 3、使用方法
  -- 组件
  ```html
  <img :src="getImg('白夜行.png')" />
  ```

  ```js
  import getImg from '../utils/imgUtil'
  ```

# 配置 ESLint
  ## 1、安装 ESLint 相关依赖
  ```
  npm install eslint@7.2.0 eslint-plugin-vue@7.20.0 vue-eslint-parser@8.3.0 @typescript-eslint/parser@5.22.0 @typescript-eslint/eslint-plugin@5.22.0 -D
  ```

  ## 2、添加脚本命令
  -- package.json
  ```
  "scripts": {

    -- 增
    "eslint": "eslint --init"
    --

  }
  ```

  ## 3、初始化 eslint
  yarn eslint

  - HOW Would you 1ike to use ESLint?（以哪种方式创建 eslint）
  （ ）To check syntax only（仅检查语法）
  （*）To check syntax and  find probTems（检查语法和查找 问题）
  （ ）To check syntax, find prob lems， and enforce code style（检查语法，查找问题，并执行代码样式）

  - what type of modules does your project use?（您的项目使用什么类型的模块?）
  （ ）JavaScript modules (import/export)
  （*）CommonJS (require/exports)
  （ ）None of these

  - WHICH FRAMEWORK DOES your project use?（你的项目使用哪个框架?）
  （*）vue

  - Does your project use Typescript?（你的项目使用 Typescript 吗?）
  y

  - where does your code run?（代码在哪里运行?）
  （*）Browser（浏览器）

  - What format do you want your Config fTle to be in?（您希望您的配置文件是什么格式?）
  （*）Javascript

  - Would you like to install them now with npm? （是否安装依赖插件）
  n（因为这里安装的是最新版本的容易出问题，上面已经安装稳定版本的了，所以这里选 no）

  ## 4、配置 .eslintrc.js 文件
  ```js
  module.exports = {
    // eslintrc.js文件所在的目录为root目录，
    //  eslint规则将对这个目录以及该目录下所有文件起作用。
    root: true,
    // 让vue3.2中的这些全局函数能正常使用。
    globals: {
      defineProps: 'readonly',
      defineEmits: 'readonly',
      defineExpose: 'readonly',
      withDefaults: 'readonly',
    },
    // eslint 继承别人写好的配置规则，这些规则是检测语法时的规则的来源。以下 @typescript 开头的规则都依赖该规则
    extends: ['plugin:@typescript-eslint/recommended'],

    // 插件的作用就是对规则进行补充，
    //如果 typescript-eslint/recommended 里面就没有包含与 vue 相关的规则,
    //那么就让 ESLint 兼容 vue 的语法.
    plugins: ['vue'],
    parser: 'vue-eslint-parser', //  检测 vue 语法规范 的 eslint 解析器。
    parserOptions: {
      // 发现尽管 ecmaVersion设置版本为5, 但 ESLint 依然能识别 ES6 的语法
      // 这是  '@typescript-eslint/parser' 解析器帮着识别了。
      ecmaVersion: 2021,
      parser: '@typescript-eslint/parser', // 检测 ts 语法规范的 eslint 解析器
    },
    rules: {
      //  生产环境不允许控制台输出，开发允许允许控制台输出。
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'space-before-function-paren': 0, // 不允许函数的()前有空格
      'vue/no-multiple-template-root': 0, // 是否允许 template 模板中只有一个根元素
      '@typescript-eslint/no-empty-function': 0, //允许出现空的函数
      '@typescript-eslint/no-explicit-any': [0], // 允许使用any
      '@typescript-eslint/no-var-requires': 0, // 项目中允许使用 require()语法。
      semi: 0, // 关闭语句结尾分号
      quotes: [2, 'single'], //使用单引号
      'prefer-const': 2, // 开启不变的变量一定要使用const
      '@typescript-eslint/no-unused-vars': 0, // 允许出现未使用过的变量
      '@typescript-eslint/no-inferrable-types': 0, //  允许变量后面添加类型
      '@typescript-eslint/no-non-null-assertion': 0,
    },
  }
  ```

# 配置 Prettier
  **说明：** Prettier 是按照 ESLint 规则来格式化代码的，但 Prettier 也有自己的规则，当规则和 ESLint 规则冲突时，Prettier 会优先使用自己的规则

  ## 使用步骤
  ### 1、安装 Prettier 插件
  在 vscode 扩展中搜索并安装

  ### 2、开启 在保存时格式化文件 功能
  设置 → 搜索 Format On Save → 勾选

  ### 3、定义一个默认格式化程序
  设置 → 搜索 formatter → Prettier - Code formatter

  ### 4、自定义已有规则（可选）
  搜索 → prettier

  ### 5、自定义规则（可选）
  -- 项目根目录/新建 .prettierrc
  ```
  {
    "semi": false, // 是否在语句结尾添加分号
    "tabWidth": 2, // tab 宽度
    "singleQuote": true // 是否使用单引号
  }
  ```

# 重构 tsconfig.json
  ```json
  {
    "compilerOptions": {
      "target": "es2021",
      "useDefineForClassFields": true,
      "module": "esnext",
      "moduleResolution": "node",
      "allowJs": true,
      "declaration": false,
      "strict": true,
      "jsx": "preserve",
      "sourceMap": true,
      "resolveJsonModule": true,
      "isolatedModules": true,
      "esModuleInterop": true,
      "lib": ["esnext", "dom"],
      "skipLibCheck": true,
      "baseUrl": ".",
      "paths": {
        "@/*": ["src/*"]
      }
    },
    "include": [
      "src/**/*.ts",
      "src/**/*.d.ts",
      "src/**/*.vue",
      "./vite.config.ts"
    ],
    "exclude": ["node_modules"]
  }
  ```

# 项目初始化（Koa + TS）
  详见【后端/项目初始化（Koa + TS）】笔记

# 创建用户路由
  -- @/router/新建 user.ts
  ```ts
  import { Context } from 'koa'
  import Router from 'koa-router'

  const router = new Router()

  router.prefix('/usermodule')

  // 例子：http://localhost:3002/dang/usermodule/findUserinfo/wangwu
  router.get('/findUserinfo/:username', async (ctx: Context) => {
    console.log('执行路由请求 /findUserinfo 开始...')
    const { username } = ctx.params
    ctx.body = `您好：${username}`
  })

  // 例子：http://localhost:3002/dang/usermodule/addUser
  router.post('/addUser', async (ctx: Context) => {
    console.log('执行路由请求 /addUser 开始...')
    const userinfo: Userinfo = ctx.request.body
    ctx.body = `您好：${user.username}，年龄：${user.age}`
  })

  module.exports = router
  ```

  -- @/app.ts
  ```ts
  import userRouter from './router/user'
  
  // 添加到一级路由中
  router.use(userRouter.routes(), userRouter.allowedMethods())
  ```

# 自动路由加载
  **说明：** 虽然 requireDirectory 自动路由加载工具可以这些这个功能，但对 TS 支持并不友好，因此需要手写自动路由加载工具

  **process.ced：** 执行环境时所在的路径（也就是你输入命令时的所在路径）
  **__dirname：** 被执行的文件所在路径
  
  ## 使用步骤
  ### 1、定义 自动路由加载方法
  -- @/common/新建 AllRouterLoader.ts
  ```ts
  import Koa from 'koa'
  import path from 'path'
  import fs from 'fs'
  import body from 'koa-body'
  import json from 'koa-json'
  import Router from 'koa-router'
  class AllRouterLoader {
    app!: Koa
    static allRouterLoader: AllRouterLoader = new AllRouterLoader()
    init(app: Koa) {
      this.app = app
      const rootRouter = this.loadAllRouterWrapper() 
      this.app.use(rootRouter.routes())
      this.listen()
    }
    // 获取 /src/router 目录下的所有路由文件的 名称
    getFiles(dir:string) {
      return fs.readdirSync(dir)
    }
    // 获取 /src/router 目录下的所有路由文件的 绝对路径
    getAbsoluteFilePaths() {
      const dir = path.join(process.cwd(), '/src/router')
      const allFiles = this.getFiles(dir)
      const allFullFilePaths: string[] = []
      for (let file of allFiles) {
        const fullFilePath = dir + "/" + allFiles;
        allFullFilePaths.push(fullFilePath)
      }
      return allFullFilePaths
    }
    // 获取所有二级路由到一级路由
    loadAllRouterWrapper() {
      const rootRouter = this.getRootRouter()
      const allFullFilePaths = this.getAbsoluteFilePaths()
      this.loadAllRouter(allFullFilePaths, rootRouter)
      return rootRouter
    }
    // 获取一级路由
    getRootRouter() {
      const rootRouter = new Router()
      rootRouter.prefix('/dang')
      this.app.use(json())
      this.app.use(body())
      return rootRouter
    }
    // 自定义守卫
    isRouter(data: any): data is Router {
      return data instanceof Router
    }
    loadAllRouter(allFullFilePaths: string[], rootRouter: Router) {
      for (let fullFilePath of allFullFilePaths) {
        const module = require(fullFilePath)
        if (this.isRouter(module)) {
          rootRouter.use(module.routes(), module.allowedMethods())
        }
      }
    }
    // 监听
    listen() {
      this.app.listen(3003)
      console.log("在 3003 端口监听...")
    }
  }

  export default AllRouterLoader.allRouterLoader
  ```

  ### 2、调用 自动路由加载方法
  -- @/app.ts
  ```ts
  -- 增
  import allRouterLoader from './common/AllRouterLoader'
  --

  const app = new Koa()

  -- 增
  allRouterLoader.init(app)
  --

  -- 注释
  const router = new Router()

  router.prefix('/dang')
  app.use(json())
  app.use(body())

  router.use(userRouter.routes().userRouter.allowedMethods())

  router.get('/test', async (ctx: Koa.Context) => {
    ctx.body = '测试页面'
  })

  app.use(router.routes())
  app.listen(3002)
  console.log('监听 3002 ...')
  --
  ```

  ### 3、测试
  api 调试工具输入 `http://localhost:3003/dang/usermodule/findUserinfo/wangwu`，如果正常显示表示成功

# 定义全局错误处理中间件
  ## 1、定义全局错误处理中间件
  -- @/common/新建 GlobalExce.ts
  ```ts
  import Koa, { Context } from 'koa'

  // 全局错误处理中间件
  const globalException = async (ctx: Context, next: Koa.Next) => {
    try {
      await next()
    } catch (err: any) {
      const errrslt = err as {message: string}
      ctx.body = `服务器错误：${errrslt.message}`
    }
  }

  export default globalException
  ```

  ## 2、使用全局错误处理中间件
  -- @/common/AllRouterLoader.ts 
  ```ts
  -- 增
  import globalException from './GlobalExce'
  --

  class AllRouterLoader {
    ...
    init(app: Koa) {
      this.app = app
      const rootRouter = this.loadAllRouterWrapper()

      -- 增
      this.app.use(globalException)
      --

      this.app.use(rootRouter.routes())
      this.listen()
    }
    ...
  }
  ```

  ## 3、测试
  1、访问 `http://localhost:3003/dang/usermodule/findUserinfo/wangwu`
  2、显示 `服务器错误：result is not a function` 表示配置成功

  -- @/router/user.ts
  ```ts
  router.get('/findUserinfo/:username', async (ctx: Context) => {
    const { username } = ctx.params
    ctx.body = `您好：${username}`
   
    -- 增
    // 测试代码。记得删除
    const userinfo = { username: 'wangwu' }
    const result = (userinfo as any).phone
    console.log(result())
    --

  })
  ```

# 响应处理
  ## 1、定义 响应处理 函数
  -- @/common/新建 ResResult.ts
  ```ts
  enum Code {
    SUCESS = 200,
    SERVERERROR = 500
  }

  // 响应处理
  export class ResRsult {
    static success(data: any = undefined, msg: any = '') {
      const code: Code = Code.SUCESS
      return { data, msg, code }
    }
    static fail(msg: any = '') {
      const code: Code = Code.SERVERERROR
      return { undefined, msg, code }
    }
  }

  export let { success, fail } = ResRsult
  ```

  ## 2、使用 响应处理 函数
  -- @/common/GlobalExce.ts
  ```ts
  -- 增
  import { success, fail } from './ResResult'
  --

  const globalException = async (ctx: Context, next: Koa.Next) => {
    console.log('已进入全局错误处理中间件')
    try {
      await next()
    } catch (err: any) {
      const errrslt = err as {message: string}

      -- 改（旧）
      ctx.body = `服务器错误：${errrslt.message}`
      --
      -- 改（新）
      ctx.body = fail(`服务器错误：${errrslt.message}`)
      --

    }
  }
  ```

  -- @/router/user.ts
  ```ts
  import { success, fail } from '../common/ResResult'

  router.get('/findUserinfo/:username', async (ctx: Context) => {
    const { username } = ctx.params

    -- 改（旧）
    ctx.body = `您好：${username}`
    --
    -- 改（新）
    ctx.body = success(`您好：${username}`)
    --

  })
  ```

# 日志封装（没搞懂，待回顾）
  **作用：** 代替传统 console.log 输出方式

  ## 日志级别
  **说明：** 依照输出信息重要或错误严重程度来确定的级别

  TRACE < DEBUG < INFO < WARN < ERROR < FATAL

  ## 使用步骤
  ### 1、定义方法
  -- @/common/新建 LogUtil.ts
  ```ts
  import log4js from 'log4js'

  enum LevelInfo {
    'trace' = 'trace',
    'debug' = 'debug',
    'info' = 'info',
    'warn' = 'warn',
    'error' = 'error',
    'fatal' = 'fatal'
  }

  class LogUtil {
    static logUtil: LogUtil = new LogUtil()
    logInstance!: log4js.Logger
    private constructor() {
      this.config()
    }
    config() {
      log4js.configure({
        appenders: {
          console: { type: 'console' },
          debug_file: { type: 'dateFile', filename: 'mylog/debug.log', pattern: 'yyyy-MM-dd.log', encoding: 'utf-8', alwaysIncludePattern: true },
          info_file: { type: 'dateFile', filename: 'mylog/info', pattern: 'yyyy-MM-dd.log', encoding: 'utf-8', alwaysIncludePattern: true },
          warn_file: { type: 'dateFile', filename: 'mylog/warn', pattern: 'yyyy-MM-dd.log', encoding: 'utf-8', alwaysIncludePattern: true },
          error_file: { type: 'dateFile', filename: 'mylog/error', pattern: 'yyyy-MM-dd.log', encoding: 'utf-8', alwaysIncludePattern: true },
        },
        categories: {
          default: {
            appenders: ['console', 'debug_file'],
            level: LevelInfo.debug
          },
          info: {
            appenders: ['console'],
            level: LevelInfo.info
          },
          warn: {
            appenders: ['console'],
            level: LevelInfo.warn
          }
        }
      })
    }

    getCategories(level: LevelInfo) {
      this.logInstance = log4js.getLogger(level)
    }

    debug(input: string) {
      this.getCategories(LevelInfo.debug)
      this.logInstance.debug(input)
    }

    info(input: string) {
      this.getCategories(LevelInfo.info)
      this.logInstance.info(input)
    }

    warn(input: string) {
      this.getCategories(LevelInfo.warn)
      this.logInstance.warn(input)
    }
  }

  export default LogUtil.logUtil
  ```

  ### 2、使用方法
  -- @/common/GlobalExce.ts
  ```ts
  -- 增
  import logger from './LogUtil'
  --

  const globalException = async (ctx: Context, next: Koa.Next) => {
    -- 改（旧）
    console.log('已进入全局错误处理中间件')
    --
    -- 改（新）
    logger.info('已进入全局错误处理中间件')
    --
  }
  ```

  -- @/router/user.ts
  ```ts
  -- 增
  import logger from '../common/LogUtil'
  --

  router.get('/findUserinfo/:username', async (ctx: Context) => {

    -- 改（旧）
    console.log('执行路由请求 findUserinfo 开始...')
    --
    -- 改（新）
    logger.debug('执行路由请求 findUserinfo 开始...')
    --

  })

  router.post('/addUser', async (ctx: Context) => {

    -- 改（旧）
    console.log('执行路由请求 /addUser 开始...')
    --
    -- 改（新）
    console.debug('执行路由请求 /addUser 开始...')
    --
  })
  ```

  ### 3、测试
  1、重启服务器项目，生成 mylog 目录表示成功
  2、使用浏览器访问 http://localhost:3003/dang/usermodule/findUserinfo/wangwu，终端显示以下内容表示成功
  ```
  [2022-05-20T11:08:42.250] [INFO] info - 进入到通用异常
  [2022-05-20T11:08:42.398] [DEBUG] debug - 执行路由请求 findUserinfo 开始...
  ``` 

# 数据库配置封装
  **实现原理：** 泛型综合、重载

  ## 1、添加环境模式命令
  -- package.json
  ```json
  "scripts": {

    -- 增
    "dev": "set NODE_ENV=DEV&& nodemon --watch src/ -e ts --exec ts-node ./src/app.ts",
    "prod": "set NODE_ENV=prod&& nodemon --watch src/ -e ts --exec ts-node ./src/app.ts"
    --

  },
  ```

  ## 2、数据库配置封装
  -- @/conf/新建 dbconfig.ts
  ```ts
  // 自定义守卫
  function isString(data: any): data is string {
    return typeof data === 'string'
  }

  interface DbConConf {
    host: string
    user: string
    password: string
    port: number
    database: string
  }

  interface EnvConf {
    dev: DbConConf,
    prod: DbConConf
  }

  class Conf {
    static conf: Conf = new Conf ()
    env!: keyof EnvConf
    envConf!: EnvConf
    constructor() {
      this.env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
      this.initConf()
    }
    initConf () {
      this.envConf = {
        dev: {
          host: 'localhost',
          user: 'root',
          password: 'xxxxxxxxxx.xxx',
          database: 'zzrs-webapp-shop-vue',
          port: 3306
        },
        prod: {
          host: 'localhost',
          user: 'root',
          password: 'xxxxxxxxxx.xxx',
          database: 'zzrs-webapp-shop-vue',
          port: 3306
        }
      }
    }

    getConf(): DbConConf
    getConf(key: string): string
    getConf(key: any = ''): any {
      if (this.isDbConConfKeys(key) && key.length > 0) {
        return this.envConf[this.env][key]
      } else {
        return this.envConf[this.env]
      }
    }

    isDbConConfKeys(key: any): key is keyof DbConConf {
      return key === 'host' || key === 'user' || key === 'password' || key === 'database' || key === 'port'
    }
  }

  export default Conf.conf
  ```

  ## 3、测试
  -- @/app.ts
  ```ts
  // 测试代码。记得删除
  import dbconfig from './conf/DbConfig'
  console.log(dbconfig.getConf('database')) // zzrs-webapp-shop-koamysql
  console.log(dbconfig.getConf('port')) // 3306
  console.log(dbconfig.getConf())
  /*
 {
    host: 'localhost',
    user: 'zzrs',
    password: 'xxxxxxxxxx.xxx',
    database: 'zzrs-webapp-shop-koamysql',
    port: 3306
  }
  */
  ```

# Dao 实现
  -- @/dao/新建 BaseDao.ts
  ```ts
  import mysql, { Connection } from 'mysql'
  import dBConf from '../conf/DbConfig'

  // 所有 Dao 的通用 Dao
  class BaseDao {
    static baseDao: BaseDao = new BaseDao()
    con!: Connection
    constructor() {
      this.connect()
    }

    // 建立连接
    async connect() {
      this.con = await mysql.createConnection(dBConf.getConf())
    }

    // 通用查询
    async query<T>(sql: string) {
      return new Promise<T>((resolve, reject) => {
        this.con.query(sql, (err, result) => {
          if (err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
      })
    }
  }

  export default BaseDao.baseDao
  ```

  -- @/dao/新建 UserDao.ts
  ```ts
  import { isNotEmpty } from '../common/StringUtil'
  import baseDao from './baseDao'
  import Userinfo from '../model/Userinfo'

  class UserDao {
    static userDao: UserDao = new UserDao()
    // 查询用户
    findUserinfo(username: string, psw: string) {
      // 1=1 的作用：解决以下条件不满足，where 后面没有条件，导致报错的问题
      let sql = `select * from userinfo where 1=1`
      if (isNotEmpty(username)) {
        sql += ` and username='${username}'`
      }
      if (isNotEmpty(psw)) {
        sql += ` and psw='${psw}'`
      }
      return baseDao.query<Userinfo[]>(sql)
    }
  }

  export default UserDao.userDao
  ```

  -- @/common/新建 StringUtil.ts
  ```ts
  class StringUtil {
    // 判断字符串是否为空
    static isNotEmpty(str: string) {
      return str !== null && str.length > 0
    }
  }

  export const { isNotEmpty } = StringUtil
  ```

  -- @/router/User.ts
  ```ts
  -- 增
  import userDao from '../dao/UserDao'
  import Userinfo from '../model/Userinfo'
  import userDao from '../dao/UserDao'
  --

  -- 改（旧）
  router.get('/findUserinfo/:username', async (ctx: Context) => {
    const { username } = ctx.params
    logger.debug('执行路由请求 findUserinfo 开始...')
    ctx.body = success(`您好：${username}`)
  })
  --
  -- 改（新）
  router.get('/findUserinfo/:username/:psw', async (ctx: Context) => {
    const { username, psw } = ctx.params
    logger.debug('执行路由请求 findUserinfo 开始...')
    const userinfos: Userinfo[] = await userDao.findUserinfo(username, psw)
    ctx.body = success(`您好：${username}`)
  })
  --
  ```

  -- @/model/新建 Userinfo.ts
  ```ts
  export default class Userinfo {
    userid!: number
    username!: string
    psw!: string
    address!: string
    valid!: number
  }
  ```

  ## 测试
  -- @/router/User.ts
  ```ts
  router.get('/findUserinfo/:username:psw', async (ctx: Context) => {
    const userinfos: Userinfo[] = await userDao.findUserinfo(username, psw)

    -- 增
    // 测试代码。记得删除
    console.log(userinfos)
    /* 返回以下结果表示成功
    result：[object Object]
    [
      RowDataPacket {
        userid: 1,
        username: 'admin',
        psw: '123',
        address: 'beijin',
        volid: 1,
        birth: null
      }
    ]
    */
    --

    ctx.body = success(`您好：${username}`)
  })
  ```

# Sequelize
  **ORM（对象关系映射框架）作用：** 操作 MySQL 数据库
  1、避免直接编写 sql 语句带来的繁琐
  2、把关系型数据表数据转换为 js 对象进行查询
  3、把 js 对象转换为关系型数据表的数据进行增加、修改、删除

  **Sequelize：** 是一个基于 promise 的 Node.js ORM，目前支持 Postgres、MySQL、MariaDB、SQLite、Microsoft SQL Server

  **特性：**
  1、支持事务
  2、支持一对一，一对多，多对一，多对多，关联表的映射

  ## 使用步骤
  ### 1、使用 Sequelize 连接 MySql
  -- @/dao/新建 BaseDaoDefine.ts
  ```ts
  import dbConConf from '../conf/DbConfig'
  import { Dialect } from 'sequelize'
  import { Sequelize } from 'sequelize-typescript'

  class BaseDaoDefine {
    static baseDaoOrm: BaseDaoDefine = new BaseDaoDefine()
    sequelize!: Sequelize
    constructor() {
      this.initSeqConf('mysql')
    }
    initSeqConf(dialect: Dialect) {
      let { host, user, password, database, port } = dbConConf.getConf()
      this.sequelize = new Sequelize(database, user, password, {
        host,
        port,
        dialect,
        define: { timestamps: false, freezeTableName: true }
      })
    }
  }

  export const { sequelize } = BaseDaoDefine.baseDaoOrm
  ```

  ### 2、执行查询（有三种方案，请根据使用场景选择）
  #### （一）使用 sequelize 的 define 方法定义一个模型来实现
  ##### 使用场景
  1、适合对单表进行的各种查询
  2、适合单表添加，更新
  3、适合多表级联添加，更新
  4、不适合多表级联查询和前端取出数据相差甚远

  ##### 1、创建模型
  **模型：** 数据库中表的抽象

  -- @/新建 definemodel/index.ts
  ```ts
  import { DataTypes } from 'sequelize'
  import { sequelize } from '../dao/BaseDaoDefine'

  class Userinfo {
    static createModel() {
      const model = sequelize.define('userinfo',
        {
          userid: {
            type: DataTypes.INTEGER, // 属性的数据类型
            field: 'userid', // 属性对应的列名，若不定义 field 则表中的列名（userid）就是属性名
            primaryKey: true, // 主键
            autoIncrement: true, // 主键自增
          },
          username: {
            type: DataTypes.STRING(30),
            field: 'username',
            allowNull: false, // 当前列是否允许为空
            // unique: true // 该列的值必须唯一
          },
          psw: {
            type: DataTypes.STRING(20),
            field: 'psw',
            allowNull: false,
          },
          address: {
            type: DataTypes.STRING(50),
            field: 'address',
            allowNull: true,
          },
          valid: {
            type: DataTypes.TINYINT,
            field: 'valid',
            allowNull: true,
          },
        },
        {
          // freezeTableName: true, // （true：使用给定的表名）（false：模型名后加 s 作为表名）
          // timestamps: false, // （true：给模型加上时间戳属性）（false：不带时间戳属性）
        }
      )
      // 同步数据表。（force 的值为 true，表若存在则先删除后创建）（force 的值为 false 表不存在才创建）
      // model.sync({ force: false })
      return model
    }
  }

  export const model = Userinfo.createModel()
  ```

  ##### 2、添加用户
  -- @/dao/新建 UserDaoDefine.ts
  ```ts
  import { model } from '../definemodel'

  class UserDaoDefine {
    // 添加用户
    static addUser(userinfo: Userinfo) {
      return model.create(userinfo)
    }
  }

  export const { addUser } = UserDaoDefine

  export type Userinfo = {
    userid: number
    username: string
    psw: string
    address: string
    valid: number
  }

  export {}
  ```

  -- @/router/User.ts
  ```ts
  -- 注释
  import Userinfo from '../model/Userinfo'
  --

  -- 增
  import { Userinfo, addUser } from '../dao/UserDaoDefine'
  --

  router.post('/addUser', async (ctx: Context) => {
    const userinfo: Userinfo = ctx.request.body

    -- 删
    ctx.body = `您好：${user.username}，年龄：${user.age}`
    --

    -- 增
    const dbUserinfo = await addUser(userinfo)
    ctx.body = success(dbUserinfo)
    --

  })
  ```

  ##### 3、查询用户
  -- @/dao/UserDaoDefine.ts
  ```ts
  class UserDaoDefine {
    // 添加用户
    static addUser(userinfo: Userinfo) {
      return model.create(userinfo)
    }

    -- 增
    // 查询用户
    static findAllUser() {
      return model.findAll({
        // 只返回结果，不需要其它多余的信息
        raw: true
      })
    }
    --

  }

  -- 增
  export const { findAllUser } = UserDaoDefine
  --
  ```

  -- @/router/user.ts
  ```ts
  import { findAllUser } from '../dao/UserDaoDefine'

  // 例子：http://localhost:3003/dang/usermodule/findAllUser
  router.get('/findAllUser', async (ctx: Context) => {
    logger.debug('执行路由请求 /findAllUser 开始...')
    ctx.body = await findAllUser()
  })
  ```

  ##### 4、查询 username 和 psw 字段中的数据（投影查询）
  -- @/dao/UserDaoDefine.ts
  ```ts
  class UserDaoDefine {
    
    -- 增
    // 只查询 username 和 psw 字段中的数据
    static findByProps() {
      return model.findAll({
        raw: true,
        // 投影查询：查询指定字段
        attributes: ['username', 'psw']
      })
    }
    --

  }

  -- 增
  export const { findByProps } = UserDaoDefine
  --
  ```

  -- @/router/user.ts
  ```ts
  import { findByProps } from '../dao/UserDaoDefine'

  // 例子：http://localhost:3003/dang/usermodule/findByProps
  router.get('/findByProps', async (ctx: Context) => {
    ctx.body = success(await findByProps())
  })
  ```

  ##### 5、查询满足 username 或 psw 条件的字段所在的数据行（or 查询）
  -- @/dao/UserDaoDefine.ts
  ```ts
  -- 增
  import { Op } from 'sequelize'
  --

  class UserDaoDefine {
    
    -- 增
    // 查询满足 username 或 psw 条件的字段所在的数据行
    static findByUsmAndPsw(username: string, psw: string) {
      return model.findOne({
        raw: true,
        where: {
          // or 查询：满足一个条件即可
          [Op.or]: [
            { username },
            { psw }
          ]
        }
      })
    }
    --

  }

  -- 增
  export const { findByUsmAndPsw } = UserDaoDefine
  --
  ```

  -- @/router/user.ts
  ```ts
  import { findByUsmAndPsw } from '../dao/UserDaoDefine'

  // 例子：http://localhost:3003/dang/usermodule/findOneUser/admin/123
  router.get('/findOneUser/:username/:psw', async (ctx: Context) => {
    const { username, psw } = ctx.params
    ctx.body = success(await findByUsmAndPsw(username, psw))
  })
  ```

  ##### 6、根据用户提供的数据来模糊查询 username 字段所在的数据行（模糊查询）
  -- @/dao/UserDaoDefine.ts
  ```ts
  class UserDaoDefine {
    
    -- 增
    // 根据用户提供的数据来模糊查询 username 字段所在的数据行
    static findByLike(key: string) {
      const searchKey = `%${key}%`
      return model.findAll({
        raw: true,
        where: {
          username: {
            [Op.like]: searchKey
          }
        }
      })
    }
    --

  }

  -- 增
  export const { findByLike } = UserDaoDefine
  --
  ```

  -- @/router/user.ts
  ```ts
  import { findByLike } from '../dao/UserDaoDefine'

  // 例子：http://localhost:3003/dang/usermodule/findByLike/王
  router.get('/findByLike/:key', async (ctx: Context) => {
    const { key } = ctx.params
    ctx.body = success(await findByLike(key))
  })
  ```

  ##### 7、查询 username 字段为王开头的 或 address 字段为 hainan（or and 查询）
  -- @/dao/UserDaoDefine.ts
  ```ts
  class UserDaoDefine {
    
    -- 增
    // 查询 username 字段为王开头的 或 address 字段为 hainan
    static findByUsmAndAddr() {
      return model.findAll({
        raw: true,
        where: {
          [Op.or]: [
            {
              username: {
                [Op.like]: '王%'
              }
            },
            {
              address: 'hainan'
            }
          ]
        }
      })
    }
    --

  }

  -- 增
  export const { findByUsmAndAddr } = UserDaoDefine
  --
  ```

  -- @/router/user.ts
  ```ts
  import { findByUsmAndAddr } from '../dao/UserDaoDefine'

  // 例子：http://localhost:3003/dang/usermodule/findByUsmAndAddr
  router.get('/findByUsmAndAddr', async (ctx: Context) => {
    ctx.body = success(await findByUsmAndAddr())
  })
  ```

  ##### 8、查询 最大值、最小值、总数（聚合查询）
  **查询数据行的总数：** `select count(*) as 总用户数 from userinfo`
  **查询 address 列中数据行的总数，但不包括空行：** `select count(address) as 总用户数 from userinfo`
  **查询 userid 列中的最大值：** `select max(userid) from userinfo`
  **查询 userid 列中的最大小：** `select min(userid) as 最小用户id, max(userid) as 最大用户id from userinfo`
  **查询 address 列中相同值出现的次数，并且 valid 列的值为 1：** `select address, count(valid) as 总人数 from userinfo where valid=1 group by address`

  -- @/dao/UserDaoDefine.ts
  ```ts
  -- 增
  import { Sequelize } from 'sequelize'
  --

  class UserDaoDefine {
    
    -- 增
    // 查询 address 列中相同值出现的次数，并且 valid 列的值为 1
    static countUserinfo() {
      return model.findAll({
        raw: true,
        group: 'address',
        attributes: ['address', [Sequelize.fn('count', Sequelize.col('valid')), 'totalCount']],
        where: {
          valid: 1
        }
      })
    }
    --

  }

  -- 增
  export const { countUserinfo } = UserDaoDefine
  --
  ```

  -- @/router/user.ts
  ```ts
  import { countUserinfo } from '../dao/UserDaoDefine'

  // 例子：http://localhost:3003/dang/usermodule/countTotal
  router.get('/countTotal', async (ctx: Context) => {
    ctx.body = success(await countUserinfo())
  })
  ```

  ##### 解决每定义一个查询，就要导出导入的问题
  -- @/dao/UserDaoDefine.ts
  ```ts
  class UserDaoDefine {

    -- 增
    static userDaoDefine: UserDaoDefine = new UserDaoDefine()
    --

    -- 改（旧）（例：删除所有查询方法中开头的 static 关键字）
    static addUser(userinfo: Userinfo) {
    --
    -- 改（新）（例）
    addUser(userinfo: Userinfo) {
    --

  }

  -- 改（旧）
  export const { addUser, findAllUser, findByProps, findByUsmAndPsw, findByLike, findByUsmAndAddr, countUserinfo } = UserDaoDefine
  --
  -- 改（新）
  export default UserDaoDefine.userDaoDefine
  --
  ```

  -- @/router/user.ts
  ```ts
  -- 改（旧）
  import { Userinfo, addUser, findAllUser, findByProps, findByUsmAndPsw, findByLike, findByUsmAndAddr, countUserinfo } from '../dao/UserDaoDefine'
  --
  -- 改（新）
  import userDao, { Userinfo } from '../dao/UserDaoDefine'
  --
  
  router.post('/addUser', async (ctx: Context) => {

    -- 改（旧）（例：在所有查询方法的开头添加 userDao.）
    const dbUserinfo = await addUser(userinfo)
    --
    -- 改（新）
    const dbUserinfo = await userDao.addUser(userinfo)
    --

  })
  ```

  ##### 9、分页查询
  **查询 userinfo 数据表中从 5 开始，但不包括 5 的 3 条记录：** `select * from userinfo limit 5,3`

  -- @/dao/UserDaoDefine.ts
  ```ts
  class UserDaoDefine {
    
    -- 增
    // 查询 userinfo 的第几页数据，以及每页查询多少条数据
    findUserWithPager(offset: number, pageSize: number) {
      return model.findAll({
        raw: true,
        limit: pageSize,
        offset
      })
    }
    --

  }
  ```

  -- @/router/user.ts
  ```ts
  // 例子：http://localhost:3003/dang/usermodule/findUserWithPager/5/3
  router.get('/findUserWithPager/:pageNo/:pageSize', async (ctx: Context) => {
    const { pageNo, pageSize } = ctx.params
    const offset = (pageNo - 1) * pageSize
    ctx.body = success(await userDao.findUserWithPager(offset, parseInt(pageSize)))
  })
  ```

  #### （二）使用 sequelize 的原生操作（直接写 SQL 语句）
  **使用场景：** 适合增删改查所有场景
  
  #### （三）使用模型类来实现
  **使用场景：** 适合对单表进行的各种查询

  -- @/ormmodel/新建 Userinfo.ts
  ```ts
  import { Column, Model, Table } from 'sequelize-typescript'
  import { DataTypes } from 'sequelize'

  @Table({
    tableName: 'userinfo',
  })
  export default class UserinfoModel extends Model<UserinfoModel> {
    @Column({
      type: DataTypes.INTEGER,
      field: 'userid',
      primaryKey: true,
      autoIncrement: true,
    })
    userid!: number
    @Column({
      type: DataTypes.STRING(30),
      field: 'username',
      allowNull: false
    })
    public username!: string
    @Column({
      type: DataTypes.STRING(20),
      field: 'psw',
      allowNull: false
    })
    psw!: string
    @Column({
      type: DataTypes.STRING(20),
      field: 'address',
      allowNull: false
    })
    address!: string
  }
  ```

  -- @/dao/BaseDaoOrm.ts
  ```ts
  import { Dialect } from 'sequelize'
  import { Sequelize } from 'sequelize-typescript'
  class BaseDaoOrm {
    static baseDaoOrm: BaseDaoOrm = new BaseDaoOrm()
    sequelize!: Sequelize
    constructor() {
      this.initSeqConf('mysql')
    }
    initSeqConf(dialect: Dialect) {
      let { host, user, password, database, port } = dbConConf.getConf()
      this.sequelize = new Sequelize(database, user, password, {
        host,
        port,
        dialect,
        define: { timestamps: false, freezeTableName: false },
      })
      this.addModels()
    }

    addModels() {
      const modelPath = path.join(process.cwd(), '/src/ormmodel')
      this.sequelize.addModels([modelPath])
    }
  }

  export default BaseDaoOrm.baseDaoOrm
  ```

  -- @/dao/UserDaoOrm.ts
  ```ts
  import dbConConf from '../conf/DbConfig'
  import path from 'path'
  import { Op } from 'sequelize'
  import UserinfoModel from '../ormmodel/Userinfo'

  class UserDaoOrm {
    static userDaoOrm: UserDaoOrm = new UserDaoOrm()

    findAllUser() {
      return UserinfoModel.findAll()
    }
    findByLike(key: string) {
      const searchKey = `%${key}%`
      return UserinfoModel.findAll({
        raw: true,
        where: {
          username: {
            [Op.like]: searchKey
          }
        }
      })
    }
  }

  export default UserDaoOrm.userDaoOrm
  ```

  -- @/router/UserRouter.ts
  ```ts
  import userDaoOrm from '../dao/UserDaoOrm'

  // 例子：http://localhost:3003/dang/usermodule/findByLikeWithOrm/李
  router.get('/findByLikeWithOrm/:key', async (ctx: Context) => {
    const { key } = ctx.params
    ctx.body = success(await userDaoOrm.findByLike(key))
  })
  ```

# 构建高可扩展性，高可维护性的项目架构
  详见视频【项目架构升级 --- 构建高可扩展性，高可维护性的项目架构】

# Koa 访问数据库服务器高性能优化 --- sequelize 数据库连接池
  ## 数据库连接池
  **作用：**
  1、创建，分配，释放数据库连接的对象
  2、在项目启动时会创建一定数量的数据库连接放到连接池对象中，并允许应用程序重复使用现有的数据库连接，而不是重新建立一个

  **解决：** 每次访问一次网站，服务器和数据库就要创建和关闭一次连接，网站并发访问量高时，后端服务器和数据库会频繁创建和关闭连接，导致数据库服务器内存溢出、拓机的问题

  **说明：** 在 Sequelize 底层：连接池是一个由 ConnectionManager 类管理的 Pool 类的对象，通过 Pool 类对象来管理和共享多个连接对象
  