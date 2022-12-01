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