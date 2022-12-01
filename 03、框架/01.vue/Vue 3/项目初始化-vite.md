# 创建项目
  1、`npm create vite@2 zzrs-webapp-shop-vue3`
  2、`npm install`
  3、`npm run dev`

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
    const { username } = ctx.params
    console.log('执行路由请求 findUserinfo 开始...')
    ctx.body = `您好：${username}`
  })

  // 例子：http://localhost:3002/dang/usermodule/addUser
  router.post('/addUser', async (ctx: Context) => {
    const user = ctx.request.body
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
          user: 'zzrs',
          password: 'xxxxxxxxxx.xxx',
          database: 'zzrs-webapp-shop-koamysql',
          port: 3306
        },
        prod: {
          host: 'www.xxxxxxxxxx.com',
          user: 'zzrs',
          password: 'xxxxxxxxxx.xxx',
          database: 'zzrs-webapp-shop-koamysql',
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
      let sql = `select * from userinfo where 1=1`
      if (isNotEmpty(username)) {
        sql += `and username = ${username}`
      }
      if (isNotEmpty(psw)) {
        sql += `and psw='${psw}'`
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
  router.get('/findUserinfo/:username:psw', async (ctx: Context) => {
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
  ### 1、谅解